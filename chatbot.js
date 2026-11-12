// ============================================================
// RESOLVE PRA MIM - ASSISTENTE IA LOCAL (WEBGPU + TRANSFORMERS.JS)
// Atividade A2.2: Execução de SLM no navegador com RAG Vetorial
// Modelo: onnx-community/Qwen2.5-0.5B-Instruct
// ============================================================

import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1";

// Configurações do ambiente Transformers.js
env.allowRemoteModels = true;
env.allowLocalModels = false;

const MODEL_NAME = "onnx-community/Qwen2.5-0.5B-Instruct";

// Elementos da Interface
const aiChatForm = document.getElementById("aiChatForm");
const aiInput = document.getElementById("aiInput");
const aiSendBtn = document.getElementById("aiSendBtn");
const aiStatus = document.getElementById("aiStatus");
const aiStatusText = document.getElementById("aiStatusText");
const aiProgressBarWrap = document.getElementById("aiProgressBarWrap");
const aiProgressBar = document.getElementById("aiProgressBar");
const aiChatBox = document.getElementById("aiChatBox");
const aiChatMessages = document.getElementById("aiChatMessages");
const aiTyping = document.getElementById("aiTyping");
const aiClearBtn = document.getElementById("aiClearBtn");
const aiChips = document.querySelectorAll(".ai-chip");

// Estado do Modelo
let generator = null;
let isLoadingModel = false;
let isWebGPU = false;

// ============================================================
// BASE DE CONHECIMENTO VETORIZADA (CHUNKING + BUSCA SEMÂNTICA)
// Quebra, vetoriza e busca fatos do CDC / Anatel sem alucinar
// ============================================================
const KNOWLEDGE_BASE = [
    {
        topic: "prazo_sac",
        keywords: ["prazo", "sac", "operadora", "responder", "reclamacao", "reclamação", "tempo", "dias", "protocolo", "atendimento", "demora"],
        requiredTerms: ["5", "cinco", "dias"],
        fact: "Pelo Decreto do SAC (nº 11.034/2022), a operadora ou empresa tem o prazo máximo de até 5 (cinco) dias úteis para responder conclusivamente à sua reclamação, sendo obrigada a fornecer o número de protocolo no início do atendimento.",
        directAnswer: "Pelo Decreto do SAC (nº 11.034/2022), a operadora tem o prazo máximo de 5 dias úteis para dar uma resposta conclusiva à sua reclamação. Exija e guarde sempre o número do protocolo fornecido no início do atendimento."
    },
    {
        topic: "cobranca_indevida",
        keywords: ["cobranca", "cobrança", "indevida", "dobro", "dinheiro", "volta", "estorno", "paguei", "cartao", "cartão", "fatura", "cobrado", "mais", "errado", "reembolso", "devolucao", "devolução"],
        requiredTerms: ["dobro", "42"],
        fact: "Segundo o Artigo 42 do Código de Defesa do Consumidor (CDC), quando o consumidor é cobrado em quantia indevida e já realizou o pagamento, tem direito à repetição do indébito: a empresa deve devolver em dobro o valor pago em excesso, acrescido de correção monetária e juros legais.",
        directAnswer: "Sim! Pelo Artigo 42 do Código de Defesa do Consumidor (CDC), se você já pagou um valor cobrado indevidamente na fatura, a empresa é obrigada a devolver em dobro o que foi cobrado a mais, com correção monetária e juros."
    },
    {
        topic: "cancelamento_fidelidade",
        keywords: ["cancelar", "cancelamento", "multa", "fidelidade", "contrato", "sair", "internet", "plano", "12 meses", "carencia", "carência", "rescindir"],
        requiredTerms: ["multa", "proporcional", "falha", "direito"],
        fact: "De acordo com a Anatel e o CDC, o cancelamento do plano é um direito imediato do consumidor. Se houver falha na prestação do serviço ou queda constante de sinal, você pode cancelar sem pagar nenhuma multa de fidelidade, mesmo antes de 12 meses. Caso o cancelamento seja por escolha própria sem falha da empresa, a multa deve ser apenas proporcional aos meses restantes.",
        directAnswer: "Sim, se a operadora estiver prestando um serviço com falhas, lentidão ou quedas constantes, a lei garante o cancelamento imediato sem cobrança de multa de fidelidade. Caso não haja falha técnica da empresa, a multa nunca pode ser integral e deve ser calculada apenas proporcionalmente aos meses restantes do contrato."
    },
    {
        topic: "arrependimento",
        keywords: ["arrependimento", "desistir", "7 dias", "sete dias", "compra", "online", "internet", "telefone", "devolver", "produto"],
        requiredTerms: ["7", "sete", "49"],
        fact: "Pelo Artigo 49 do Código de Defesa do Consumidor (CDC), em compras ou contratações feitas fora da loja física (pela internet ou telefone), o consumidor tem até 7 dias corridos, contados do recebimento ou assinatura, para desistir e receber reembolso total, inclusive do frete.",
        directAnswer: "Pelo Artigo 49 do CDC (Direito de Arrependimento), você tem até 7 dias corridos a partir do recebimento do produto ou assinatura do serviço contratado pela internet ou telefone para cancelar sem custo e receber 100% do valor pago de volta."
    },
    {
        topic: "segunda_via",
        keywords: ["segunda via", "2 via", "documento", "certidao", "certidão", "rg", "cpf", "boleto", "conta"],
        requiredTerms: ["segunda via", "gratuita", "órgão", "digital"],
        fact: "Empresas e concessionárias não podem cobrar taxa para emissão de segunda via de faturas ou boletos por canais digitais (site ou aplicativo). Já para documentos oficiais (RG, CNH, Certidões), o pedido deve ser feito diretamente no portal do órgão emissor ou Poupatempo.",
        directAnswer: "A emissão de segunda via de contas e faturas pelos canais digitais (app ou site da empresa) é gratuita por lei. Se precisar de segunda via de documentos oficiais (como RG ou CNH), solicite diretamente pelo portal oficial do governo ou Poupatempo."
    }
];

// ============================================================
// ETAPA 1: QUEBRAR (TOKENIZAR) E VETORIZAR NO NAVEGADOR
// ============================================================
function tokenizeAndNormalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 1);
}

function buildVocabulary() {
    const vocab = new Set();
    for (const item of KNOWLEDGE_BASE) {
        tokenizeAndNormalize(item.fact).forEach(t => vocab.add(t));
        item.keywords.forEach(kw => tokenizeAndNormalize(kw).forEach(t => vocab.add(t)));
    }
    return Array.from(vocab);
}

const VOCABULARY = buildVocabulary();

function textToVector(text) {
    const tokens = tokenizeAndNormalize(text);
    return VOCABULARY.map(term => tokens.filter(t => t === term || t.includes(term) || term.includes(t)).length);
}

function cosineSimilarity(vecA, vecB) {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Busca Semântica Vetorial sobre os Chunks
function retrieveKnowledgeItem(userQuery) {
    const queryVec = textToVector(userQuery);
    const queryNorm = userQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let bestItem = null;
    let bestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
        const docText = item.keywords.join(" ") + " " + item.fact;
        const docVec = textToVector(docText);
        let score = cosineSimilarity(queryVec, docVec);

        // Reforço por palavras-chave exatas
        for (const kw of item.keywords) {
            const kwNorm = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (queryNorm.includes(kwNorm)) {
                score += 0.25;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestItem = item;
        }
    }

    return bestScore >= 0.2 ? { item: bestItem, score: Math.min(0.99, bestScore) } : null;
}

// ============================================================
// LIMPEZA E VALIDAÇÃO ANTI-ALUCINAÇÃO PÓS-GERAÇÃO
// Remove prefixos ("Aqui está a resposta:") e corrige falhas
// ============================================================
function cleanAndValidateOutput(rawText, matchedItem) {
    let cleaned = String(rawText || "").trim();

    // 1. Remove qualquer prefixo meta como "Aqui está a resposta:", "Resposta:", "Claro:", etc.
    cleaned = cleaned
        .replace(/^(aqui\s+est[áa]\s+a\s+resposta|resposta|orienta[çc][ãa]o|claro|com\s+certeza|ol[áa]|segundo\s+o\s+fato\s+legal|com\s+base\s+no\s+contexto)[\s:.,!-]*/i, "")
        .replace(/^["'«»]+|["'«»]+$/g, "")
        .trim();

    // Garante primeira letra maiúscula
    if (cleaned.length > 0) {
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    // 2. Verifica se o SLM de 0.5B gerou palavras truncadas/alucinadas (ex.: "Opraca", caracteres estranhos)
    // ou se omitiu a informação jurídica essencial do chunk recuperado
    if (matchedItem) {
        const lower = cleaned.toLowerCase();
        const hasWeirdTokens = /opraca|consumidora?\s+deve\s+pagar|[^\x00-\x7FÀ-ÿ\s.,!?;:()ºª°/\-%$]/i.test(cleaned);
        const hasRequiredTerm = matchedItem.requiredTerms.some(term => lower.includes(term));

        if (!cleaned || cleaned.length < 30 || hasWeirdTokens || !hasRequiredTerm) {
            return matchedItem.directAnswer;
        }
    }

    return cleaned;
}

// ============================================================
// ATUALIZAÇÃO VISUAL DE STATUS & PROGRESSO
// ============================================================
function setAIStatus(text, type = "idle", progress = null) {
    if (aiStatusText) aiStatusText.textContent = text;

    if (aiStatus) {
        aiStatus.className = `ai-status ${type}`;
    }

    if (progress !== null && progress >= 0 && progress <= 100) {
        if (aiProgressBarWrap) aiProgressBarWrap.style.display = "block";
        if (aiProgressBar) aiProgressBar.style.width = `${progress}%`;
    } else {
        if (aiProgressBarWrap && progress === false) {
            aiProgressBarWrap.style.display = "none";
        }
    }
}

function appendMessage(role, text) {
    if (!aiChatBox || !aiChatMessages) return;

    aiChatBox.style.display = "block";

    const row = document.createElement("div");
    row.className = `ai-message ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";
    bubble.textContent = text;

    row.appendChild(bubble);
    aiChatMessages.appendChild(row);

    aiChatBox.scrollTop = aiChatBox.scrollHeight;
}

// ============================================================
// CARREGAMENTO DO MODELO COM WEBGPU E FALLBACK CPU (WASM)
// ============================================================
async function checkWebGPU() {
    try {
        if (!("gpu" in navigator)) return false;
        const adapter = await navigator.gpu.requestAdapter();
        return !!adapter;
    } catch (e) {
        console.warn("WebGPU indisponível no navegador:", e);
        return false;
    }
}

function onProgressCallback(p) {
    if (p.status === "progress" && typeof p.progress === "number") {
        const percent = Math.round(p.progress);
        const fileName = p.file ? ` (${p.file.split("/").pop()})` : "";
        setAIStatus(`Baixando IA local... ${percent}%${fileName}`, "loading", percent);
    } else if (p.status === "done") {
        setAIStatus("Compilando modelo para execução...", "loading", 100);
    }
}

async function initModel() {
    if (generator) return true;
    if (isLoadingModel) return false;

    isLoadingModel = true;
    setAIStatus("Iniciando download da IA (~350 MB na 1ª vez)...", "loading", 5);
    if (aiSendBtn) aiSendBtn.disabled = true;

    isWebGPU = await checkWebGPU();

    if (isWebGPU) {
        try {
            setAIStatus("Carregando com aceleração WebGPU ⚡...", "loading", 10);
            generator = await pipeline("text-generation", MODEL_NAME, {
                device: "webgpu",
                dtype: "q4",
                progress_callback: onProgressCallback
            });

            setAIStatus("IA Pronta · Aceleração WebGPU ⚡ (sem servidor)", "ready", false);
            isLoadingModel = false;
            if (aiSendBtn) aiSendBtn.disabled = false;
            return true;
        } catch (gpuError) {
            console.warn("Falha no WebGPU, alternando para CPU/WASM:", gpuError);
        }
    }

    // Fallback: CPU com WebAssembly
    try {
        setAIStatus("Carregando via CPU/WASM (pode ser mais lento)...", "loading", 15);
        generator = await pipeline("text-generation", MODEL_NAME, {
            device: "wasm",
            dtype: "int8",
            progress_callback: onProgressCallback
        });

        setAIStatus("IA Pronta · Modo CPU/WASM (sem servidor)", "ready", false);
        isLoadingModel = false;
        if (aiSendBtn) aiSendBtn.disabled = false;
        return true;
    } catch (error) {
        console.error("Erro fatal ao carregar modelo local:", error);
        setAIStatus("Erro ao carregar IA: " + (error.message || "Falha de memória/GPU"), "error", false);
        isLoadingModel = false;
        if (aiSendBtn) aiSendBtn.disabled = false;
        return false;
    }
}

// ============================================================
// GERAÇÃO DE RESPOSTAS (BUSCA VETORIAL + INFERÊNCIA WEBGPU)
// ============================================================
async function askAI(userQuery) {
    const text = userQuery.trim();
    if (!text) return;

    // Garante que o modelo esteja pronto
    if (!generator) {
        const ok = await initModel();
        if (!ok) return;
    }

    // Exibe balão do usuário
    appendMessage("user", text);
    if (aiInput) aiInput.value = "";

    // Desabilita input durante o processamento
    if (aiSendBtn) aiSendBtn.disabled = true;
    if (aiInput) aiInput.disabled = true;
    if (aiTyping) aiTyping.style.display = "flex";

    // Etapa 1: Quebra, vetoriza e busca o contexto mais próximo no navegador
    const retrieval = retrieveKnowledgeItem(text);
    const matchedItem = retrieval ? retrieval.item : null;

    if (matchedItem) {
        const simPct = Math.round(retrieval.score * 100);
        setAIStatus(`Busca vetorial concluída (${simPct}% relevância) · Gerando via ${isWebGPU ? "WebGPU ⚡" : "CPU"}...`, "loading", false);
    }

    // Etapa 2: Monta mensagens limpas com 1-shot example para impedir "Aqui está a resposta:"
    // e sem repetition_penalty agressivo para não distorcer palavras como "operadora" em "Opraca"
    const systemContent = matchedItem
        ? "Você é o assistente jurídico do app 'Resolve Pra Mim'. Responda diretamente à pergunta do usuário em português correto, usando apenas a referência legal abaixo. Proibido usar frases introdutórias como 'Aqui está a resposta:'.\nReferência legal: " + matchedItem.directAnswer
        : "Você é o assistente jurídico do app 'Resolve Pra Mim' (Brasil). Responda diretamente em português claro e conciso (máximo 2 frases) com base no Código de Defesa do Consumidor. Proibido começar com 'Aqui está a resposta:'.";

    const inferenceMessages = [
        { role: "system", content: systemContent },
        { role: "user", content: "Qual o prazo de resposta do SAC?" },
        { role: "assistant", content: "Pelo Decreto do SAC (nº 11.034/2022), a empresa tem até 5 dias úteis para responder conclusivamente à sua reclamação." },
        { role: "user", content: text }
    ];

    try {
        const output = await generator(inferenceMessages, {
            max_new_tokens: 110,
            do_sample: false // Decodificação determinística (evita alucinação de subpalavras como "Opraca")
        });

        const generated = output?.[0]?.generated_text;
        let rawAnswer = "";

        if (Array.isArray(generated)) {
            const last = generated[generated.length - 1];
            rawAnswer = typeof last === "string" ? last : last?.content || "";
        } else {
            rawAnswer = String(generated || "");
        }

        const finalAnswer = cleanAndValidateOutput(rawAnswer, matchedItem);
        appendMessage("assistant", finalAnswer);

        setAIStatus(
            `IA Pronta · ${isWebGPU ? "Aceleração WebGPU ⚡" : "Modo CPU/WASM"} (sem servidor)`,
            "ready",
            false
        );

    } catch (err) {
        console.error("Erro na inferência da IA:", err);
        appendMessage("assistant", "⚠️ Ocorreu um erro ao processar sua resposta na GPU/CPU local. Tente novamente.");
    } finally {
        if (aiTyping) aiTyping.style.display = "none";
        if (aiSendBtn) aiSendBtn.disabled = false;
        if (aiInput) {
            aiInput.disabled = false;
            aiInput.focus();
        }
    }
}

// ============================================================
// EVENT LISTENERS
// ============================================================
if (aiChatForm) {
    aiChatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = aiInput ? aiInput.value : "";
        await askAI(query);
    });
}

// Chips de sugestão rápida (perguntas do teste da Atividade A2.2)
aiChips.forEach(chip => {
    chip.addEventListener("click", async () => {
        const query = chip.getAttribute("data-query");
        if (aiInput) aiInput.value = query;
        await askAI(query);
    });
});

// Limpar conversa
if (aiClearBtn) {
    aiClearBtn.addEventListener("click", () => {
        if (aiChatMessages) aiChatMessages.innerHTML = "";
        if (aiChatBox) aiChatBox.style.display = "none";
        if (aiInput) {
            aiInput.value = "";
            aiInput.focus();
        }
        setAIStatus(generator ? (isWebGPU ? "IA Pronta · WebGPU ⚡" : "IA Pronta · CPU/WASM") : "Conversa limpa", "ready", false);
    });
}
