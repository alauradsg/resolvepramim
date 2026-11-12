// ============================================================
// RESOLVE PRA MIM - ASSISTENTE IA LOCAL (WEBGPU + TRANSFORMERS.JS)
// Atividade A2.2: Execução de SLM no navegador sem servidor
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
// BASE DE CONHECIMENTO RETROALIMENTADA (RAG ANTI-ALUCINAÇÃO)
// Chunks curtos e verificados de direitos do consumidor no Brasil
// ============================================================
const KNOWLEDGE_BASE = [
    {
        topic: "prazo_sac",
        keywords: ["prazo", "sac", "operadora", "responder", "reclamação", "reclamacao", "tempo", "dias"],
        fact: "De acordo com o Decreto do SAC (nº 11.034/2022), o prazo máximo para a operadora ou empresa responder formalmente a uma reclamação é de até 5 (cinco) dias úteis. A empresa é obrigada a fornecer número de protocolo no início do contato."
    },
    {
        topic: "cobranca_indevida",
        keywords: ["cobrança", "cobranca", "indevida", "dobro", "dinheiro de volta", "estorno", "paguei", "cartão", "fatura"],
        fact: "Conforme o Artigo 42 do Código de Defesa do Consumidor (CDC), o consumidor cobrado indevidamente que tiver pago o valor a mais tem direito à repetição do indébito (devolução em dobro do valor pago em excesso), acrescido de juros e correção monetária, salvo engano justificável."
    },
    {
        topic: "cancelamento_fidelidade",
        keywords: ["cancelar", "cancelamento", "multa", "fidelidade", "contrato", "sair", "internet", "plano"],
        fact: "O cancelamento de planos ou serviços é direito imediato do consumidor. A multa de fidelidade só é legal se a operadora concedeu benefício comprovado na adesão, e o valor da multa DEVE ser estritamente proporcional ao tempo restante. Se o serviço tiver falhas frequentes ou má qualidade comprovada, o cancelamento é isento de multa."
    },
    {
        topic: "arrependimento",
        keywords: ["arrependimento", "desistir", "7 dias", "sete dias", "compra online", "internet", "telefone"],
        fact: "Conforme o Artigo 49 do CDC, em compras ou contratações feitas fora do estabelecimento comercial (pela internet, aplicativo ou telefone), o consumidor tem direito de arrependimento em até 7 dias corridos a partir da assinatura ou recebimento, com direito a reembolso total e imediato de qualquer valor pago."
    },
    {
        topic: "segunda_via",
        keywords: ["segunda via", "2 via", "documento", "certidão", "rg", "cpf", "fatura antiga"],
        fact: "Para solicitar segunda via de fatura ou boleto, as concessionárias e operadoras são obrigadas a fornecer o documento gratuitamente por canal digital. Para documentos civis (RG/CNH/Certidões), a solicitação deve ser feita no órgão estadual (Poupatempo, Detran ou Cartório), podendo haver taxa pública de emissão."
    }
];

// Busca o contexto mais relevante para ancorar o modelo (Grounding / Busca Vetorial Conceitual)
function retrieveKnowledgeContext(userQuery) {
    const q = userQuery.toLowerCase();
    let bestMatch = null;
    let maxHits = 0;

    for (const item of KNOWLEDGE_BASE) {
        let hits = 0;
        for (const kw of item.keywords) {
            if (q.includes(kw)) hits++;
        }
        if (hits > maxHits) {
            maxHits = hits;
            bestMatch = item.fact;
        }
    }

    return bestMatch || "";
}

// Histórico de Conversa com Prompt de Sistema
const BASE_SYSTEM_PROMPT = 
    "Você é o assistente oficial de direitos do consumidor do aplicativo 'Resolve Pra Mim' (Brasil). " +
    "Sua missão é responder dúvidas de forma concisa (máximo 2 a 3 frases curtas), educada e 100% precisa. " +
    "DIRETRIZES ANTI-ALUCINAÇÃO INVIOLÁVEIS: " +
    "1. Baseie-se exclusivamente nas leis brasileiras vigentes (CDC e Decreto do SAC). " +
    "2. Se você receber um 'Fato Verificado', use-o como verdade absoluta. " +
    "3. Jamais invente prazos, leis ou artigos que não existem. Se a pergunta for sobre outro assunto que você não conhece, diga: 'Para este caso específico, recomendo consultar o Procon ou o site oficial do órgão competente.'";

let chatHistory = [
    { role: "system", content: BASE_SYSTEM_PROMPT }
];

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
// GERAÇÃO DE RESPOSTAS (ANTI-ALUCINAÇÃO COM RAG CONTEXT)
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

    // Busca fato verificado no banco de conhecimento local (RAG)
    const verifiedFact = retrieveKnowledgeContext(text);
    
    // Constrói a mensagem instruindo o modelo a usar a verdade do fato verificado
    let promptWithContext = text;
    if (verifiedFact) {
        promptWithContext = `[Fato legal verificado no Brasil]: "${verifiedFact}"\nPergunta do cidadão: "${text}"\nResponda em 1 a 2 frases claras e precisas usando o fato legal acima.`;
    }

    chatHistory.push({ role: "user", content: promptWithContext });

    try {
        const output = await generator(chatHistory, {
            max_new_tokens: 180,
            temperature: 0.5,
            top_p: 0.85,
            repetition_penalty: 1.15,
            do_sample: true
        });

        const generated = output?.[0]?.generated_text;
        let answer = "";

        if (Array.isArray(generated)) {
            const last = generated[generated.length - 1];
            answer = typeof last === "string" ? last : last?.content || "";
        } else {
            answer = String(generated || "");
        }

        answer = answer.trim();
        if (!answer) {
            answer = "Não consegui gerar uma resposta precisa para essa consulta.";
        }

        // Armazena no histórico
        chatHistory.push({ role: "assistant", content: answer });
        appendMessage("assistant", answer);

    } catch (err) {
        console.error("Erro na inferência da IA:", err);
        chatHistory.pop();
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
        chatHistory = [{ role: "system", content: BASE_SYSTEM_PROMPT }];
        if (aiChatMessages) aiChatMessages.innerHTML = "";
        if (aiChatBox) aiChatBox.style.display = "none";
        if (aiInput) {
            aiInput.value = "";
            aiInput.focus();
        }
        setAIStatus(generator ? (isWebGPU ? "IA Pronta · WebGPU ⚡" : "IA Pronta · CPU/WASM") : "Conversa limpa", "ready", false);
    });
}

