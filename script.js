
"use strict";

/* =========================================
   BANCO DE SOLUÇÕES
========================================= */

const solutions = {
    internet: {
        keywords: ["internet", "wifi", "wi-fi", "banda larga", "provedor", "plano de internet"],
        title: "Cancelar ou resolver problema com internet",
        icon: "🌐",
        description: "Você precisa entrar em contato com a sua operadora/provedora, solicitar o cancelamento ou registrar a reclamação e guardar o número do protocolo.",
        steps: [
            { title: "Entre em contato com a operadora", text: "Use o aplicativo, site, telefone ou canal oficial da empresa." },
            { title: "Explique o que deseja", text: "Informe que deseja cancelar o serviço ou resolver o problema." },
            { title: "Solicite o protocolo", text: "Anote ou salve o número do protocolo do atendimento." },
            { title: "Confirme o cancelamento", text: "Peça confirmação e verifique se haverá alguma cobrança final." },
            { title: "Guarde os comprovantes", text: "Salve protocolos, e-mails, mensagens e documentos." }
        ],
        documents: [
            "Documento de identificação",
            "CPF",
            "Número do contrato ou cadastro",
            "Última fatura, se disponível",
            "Número do protocolo do atendimento"
        ],
        message: `Olá,\n\nGostaria de solicitar o cancelamento/resolução do meu serviço de internet.\n\nPeço, por favor, que seja informado o procedimento necessário e que seja gerado um número de protocolo para este atendimento.\n\nTambém solicito a confirmação por escrito da solicitação.\n\nObrigado(a).`
    },

    segundaVia: {
        keywords: ["segunda via", "2 via", "segunda-via", "documento perdido", "documento"],
        title: "Solicitar segunda via de documento",
        icon: "📄",
        description: "A primeira etapa é identificar qual documento você precisa. Depois, procure o órgão ou instituição responsável pela emissão da segunda via.",
        steps: [
            { title: "Identifique o documento", text: "Confira qual documento precisa ser emitido novamente." },
            { title: "Procure o órgão responsável", text: "Utilize o site, aplicativo ou atendimento oficial." },
            { title: "Confira os requisitos", text: "Verifique documentos, taxas e formas de atendimento." },
            { title: "Faça a solicitação", text: "Preencha os dados solicitados e envie o pedido." },
            { title: "Guarde o protocolo", text: "Salve o número da solicitação para acompanhar o pedido." }
        ],
        documents: [
            "Documento de identificação",
            "CPF",
            "Informações do documento original",
            "Comprovante de pagamento, se houver taxa",
            "Número do protocolo, se já tiver solicitado"
        ],
        message: `Olá,\n\nGostaria de solicitar a segunda via do meu documento.\n\nPoderiam me informar quais documentos são necessários, qual o procedimento para solicitar a segunda via e se existe alguma taxa?\n\nTambém gostaria de receber o número de protocolo da solicitação.\n\nObrigado(a).`
    },

    cobranca: {
        keywords: ["cobrança", "cobranca", "cobrado", "cobrança indevida", "valor errado", "fatura errada", "fatura"],
        title: "Contestar uma cobrança",
        icon: "💰",
        description: "Para contestar uma cobrança, reúna os comprovantes, identifique o valor questionado e faça a reclamação pelo canal oficial da empresa.",
        steps: [
            { title: "Identifique a cobrança", text: "Confira o valor, data e serviço/produto relacionado." },
            { title: "Separe os comprovantes", text: "Tenha faturas, recibos, comprovantes e conversas." },
            { title: "Faça a reclamação", text: "Entre em contato com a empresa responsável." },
            { title: "Peça o protocolo", text: "Solicite o número de protocolo do atendimento." },
            { title: "Acompanhe a resposta", text: "Guarde a resposta e o prazo informado pela empresa." }
        ],
        documents: [
            "Documento de identificação",
            "CPF",
            "Fatura ou cobrança questionada",
            "Comprovante de pagamento",
            "Conversas ou comprovantes relacionados"
        ],
        message: `Olá,\n\nGostaria de contestar uma cobrança que considero incorreta.\n\nSolicito a verificação detalhada da cobrança e, caso seja constatado algum erro, a correção do valor.\n\nPeço também que esta solicitação seja registrada e que seja informado o número de protocolo do atendimento.\n\nObrigado(a).`
    },

    compra: {
        keywords: ["cancelar compra", "cancelar pedido", "cancelamento de compra", "produto", "pedido", "compra"],
        title: "Cancelar uma compra ou pedido",
        icon: "🛒",
        description: "Verifique a política de cancelamento da empresa, reúna os dados do pedido e faça a solicitação pelo canal oficial.",
        steps: [
            { title: "Localize o pedido", text: "Tenha em mãos o número do pedido ou comprovante da compra." },
            { title: "Confira as condições", text: "Verifique as regras de cancelamento da empresa." },
            { title: "Solicite o cancelamento", text: "Use o aplicativo, site ou canal oficial de atendimento." },
            { title: "Guarde o protocolo", text: "Salve o protocolo ou comprovante da solicitação." },
            { title: "Acompanhe o estorno", text: "Caso tenha pago, acompanhe a confirmação do cancelamento e eventual estorno." }
        ],
        documents: [
            "Documento de identificação",
            "CPF",
            "Número do pedido",
            "Comprovante de compra",
            "Comprovante de pagamento"
        ],
        message: `Olá,\n\nGostaria de solicitar o cancelamento do meu pedido/compra.\n\nNúmero do pedido: __________________\n\nPeço a confirmação do cancelamento e, caso aplicável, informações sobre o procedimento de estorno.\n\nPor favor, também me informe o número de protocolo deste atendimento.\n\nObrigado(a).`
    },

    governo: {
        keywords: ["governo", "prefeitura", "documentação", "serviço público", "serviço do governo", "órgão público", "inss", "detran"],
        title: "Resolver um serviço público",
        icon: "🏛️",
        description: "Serviços públicos podem exigir documentos, agendamento ou solicitação online. Primeiro identifique o órgão responsável pelo serviço.",
        steps: [
            { title: "Identifique o serviço", text: "Defina exatamente qual serviço público você precisa." },
            { title: "Identifique o órgão", text: "Descubra qual órgão é responsável pela solicitação." },
            { title: "Confira os documentos", text: "Verifique a documentação exigida." },
            { title: "Veja se precisa agendar", text: "Alguns serviços exigem agendamento prévio." },
            { title: "Faça a solicitação", text: "Realize o procedimento e guarde o protocolo." }
        ],
        documents: [
            "Documento de identificação",
            "CPF",
            "Comprovante de endereço, quando solicitado",
            "Documentos relacionados ao serviço",
            "Número de protocolo, após a solicitação"
        ],
        message: `Olá,\n\nGostaria de obter informações sobre como realizar o seguinte serviço:\n\n____________________________________\n\nPoderiam me informar quais documentos são necessários, se é necessário realizar agendamento e qual o procedimento para fazer a solicitação?\n\nObrigado(a).`
    },

    reclamacao: {
        keywords: ["reclamar", "reclamação", "reclamacao", "problema", "atendimento ruim", "não resolveram", "nao resolveram"],
        title: "Registrar uma reclamação",
        icon: "📢",
        description: "Uma reclamação deve explicar claramente o problema, apresentar os dados relevantes e registrar o pedido de solução.",
        steps: [
            { title: "Descreva o problema", text: "Explique o que aconteceu de forma objetiva." },
            { title: "Informe quando aconteceu", text: "Adicione datas, valores, pedidos ou protocolos." },
            { title: "Apresente os comprovantes", text: "Anexe documentos, fotos ou comprovantes quando necessário." },
            { title: "Informe a solução esperada", text: "Diga claramente o que você deseja que seja resolvido." },
            { title: "Guarde o protocolo", text: "Salve o número da reclamação para acompanhamento." }
        ],
        documents: [
            "Documento de identificação",
            "CPF",
            "Comprovantes relacionados ao problema",
            "Faturas ou recibos, se houver",
            "Protocolos de atendimentos anteriores"
        ],
        message: `Olá,\n\nGostaria de registrar uma reclamação referente ao seguinte problema:\n\n____________________________________\n\nData do ocorrido: __________________\n\nDescrição:\n____________________________________\n\nGostaria que o problema fosse analisado e solucionado.\n\nPeço também que seja informado o número de protocolo desta reclamação.\n\nObrigado(a).`
    }
};

/* =========================================
   ESTADO DA APLICAÇÃO & STORAGE SEGURO
========================================= */

function getStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
    } catch {
        return [];
    }
}

function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error("Falha ao salvar no localStorage", e);
    }
}

let currentSolution = null;
let tasks = getStorage("resolvePraMimTasks");
let history = getStorage("resolvePraMimHistory");

/* =========================================
   ELEMENTOS DO DOM
========================================= */

const problemInput = document.getElementById("problemInput");
const solveButton = document.getElementById("solveButton");
const screens = document.querySelectorAll(".screen");
const navItems = document.querySelectorAll(".nav-item");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");
const installBtn = document.getElementById("installButton");

/* =========================================
   UTILITÁRIOS
========================================= */

function normalizeText(text) {
    return (text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function identifyProblem(text) {
    const normalized = normalizeText(text);
    let bestSolution = null;
    let highestScore = 0;

    Object.values(solutions).forEach(solution => {
        let score = 0;
        solution.keywords.forEach(keyword => {
            const normalizedKeyword = normalizeText(keyword);
            if (normalized.includes(normalizedKeyword)) {
                score++;
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestSolution = solution;
        }
    });

    return bestSolution || solutions.reclamacao;
}

/* =========================================
   NAVEGAÇÃO
========================================= */

function showScreen(screenId) {
    screens.forEach(screen => screen.classList.remove("active"));
    const selected = document.getElementById(screenId);

    if (selected) {
        selected.classList.add("active");
    }

    navItems.forEach(item => {
        item.classList.toggle("active", item.dataset.screen === screenId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (screenId === "tasksScreen") renderTasks();
    if (screenId === "historyScreen") renderHistory();
}

/* =========================================
   RESOLVER PROBLEMA
========================================= */

async function solveProblem() {
    if (!problemInput) return;

    const text = problemInput.value.trim();

    if (!text) {
        showToast("Conte primeiro qual problema você precisa resolver.");
        problemInput.focus();
        return;
    }

    currentSolution = identifyProblem(text);

    // Skeleton Screen: antecipa a estrutura do resultado enquanto os dados são preparados.
    const resultScreen = document.getElementById("resultScreen");
    resultScreen?.classList.add("resultScreen-loading");
    showScreen("resultScreen");

    await new Promise(resolve => setTimeout(resolve, 420));

    const resultIcon = document.getElementById("resultIcon");
    const resultTitle = document.getElementById("resultTitle");
    const resultDesc = document.getElementById("resultDescription");
    const stepsContainer = document.getElementById("stepsContainer");
    const docsContainer = document.getElementById("documentsContainer");
    const msgContainer = document.getElementById("messageContainer");

    if (resultIcon) resultIcon.textContent = currentSolution.icon;
    if (resultTitle) resultTitle.textContent = currentSolution.title;
    if (resultDesc) resultDesc.textContent = currentSolution.description;

    if (stepsContainer) {
        stepsContainer.innerHTML = "";
        currentSolution.steps.forEach((step, index) => {
            const element = document.createElement("div");
            element.className = "step";
            element.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <strong>${step.title}</strong>
                    <span>${step.text}</span>
                </div>
            `;
            stepsContainer.appendChild(element);
        });
    }

    if (docsContainer) {
        docsContainer.innerHTML = "";
        currentSolution.documents.forEach(docItem => {
            const li = document.createElement("li");
            li.textContent = `✓ ${docItem}`;
            docsContainer.appendChild(li);
        });
    }

    if (msgContainer) {
        msgContainer.value = currentSolution.message;
    }

    resultScreen?.classList.remove("resultScreen-loading");
    document.getElementById("resultHeader")?.classList.add("action-success");
}

/* =========================================
   AÇÕES
========================================= */

async function copyMessage() {
    const msgContainer = document.getElementById("messageContainer");
    if (!msgContainer) return;

    try {
        await navigator.clipboard.writeText(msgContainer.value);
        showToast("Mensagem copiada! 📋");
    } catch {
        msgContainer.select();
        document.execCommand("copy");
        showToast("Mensagem copiada! 📋");
    }
}

function saveTask() {
    if (!currentSolution) return;

    const task = {
        id: Date.now(),
        title: currentSolution.title,
        icon: currentSolution.icon,
        status: "pending",
        date: new Date().toLocaleDateString("pt-BR"),
        message: currentSolution.message
    };

    tasks.unshift(task);
    setStorage("resolvePraMimTasks", tasks);

    history.unshift({ ...task, completedAt: null });
    setStorage("resolvePraMimHistory", history);

    const saveButton = document.getElementById("saveTask");
    saveButton?.classList.add("action-success");
    showToast("Tarefa salva com sucesso! 📌");
    setTimeout(() => {
        saveButton?.classList.remove("action-success");
        showScreen("tasksScreen");
    }, 700);
}

function renderTasks() {
    const container = document.getElementById("tasksContainer");
    const empty = document.getElementById("emptyTasks");
    if (!container) return;

    container.innerHTML = "";

    if (tasks.length === 0) {
        if (empty) empty.style.display = "block";
        return;
    }

    if (empty) empty.style.display = "none";

    tasks.forEach(task => {
        const wrapper = document.createElement("div");
        wrapper.className = "task-swipe";
        wrapper.innerHTML = `<div class="task-swipe-delete" aria-hidden="true"><span class="trash-icon">🗑️</span><span class="trash-label">Excluir</span></div>`;

        const card = document.createElement("div");
        card.className = "task-card swipe-card";
        card.dataset.taskId = task.id;

        const statusMap = {
            pending: { text: "Pendente", class: "pending" },
            progress: { text: "Em andamento", class: "progress" },
            done: { text: "Concluída", class: "done" }
        };

        const currentStatus = statusMap[task.status] || statusMap.pending;

        card.innerHTML = `
            <div class="task-top">
                <div>
                    <h3>${task.icon} ${task.title}</h3>
                    <div class="task-date">Criada em ${task.date}</div>
                </div>
                <span class="status ${currentStatus.class}">${currentStatus.text}</span>
            </div>
            <div class="task-controls">
                ${task.status !== "done" ? `<button onclick="advanceTask(${task.id})">Avançar status</button>` : ""}
            </div>
        `;

        wrapper.appendChild(card);
        container.appendChild(wrapper);
        enableSwipeToDelete(card, task.id);
    });
}

/* =========================================
   GESTO DE CONFIRMAÇÃO — ARRASTAR PARA DELETAR
========================================= */

function enableSwipeToDelete(card, id) {
    let startX = 0;
    let currentX = 0;
    let dragging = false;
    let pointerId = null;
    const threshold = 92;

    card.addEventListener("pointerdown", event => {
        if (event.target.closest("button, a, textarea, input")) return;
        startX = event.clientX;
        currentX = 0;
        dragging = true;
        pointerId = event.pointerId;
        card.setPointerCapture(pointerId);
        card.classList.add("swiping");
    });

    card.addEventListener("pointermove", event => {
        if (!dragging || event.pointerId !== pointerId) return;

        currentX = Math.min(0, event.clientX - startX);
        const limitedX = Math.max(currentX, -120);
        card.style.transform = `translateX(${limitedX}px)`;
        card.style.setProperty("--swipe-progress", Math.min(Math.abs(currentX) / threshold, 1).toFixed(2));
        card.classList.toggle("swipe-ready", Math.abs(currentX) >= threshold);
    });

    const finishSwipe = () => {
        if (!dragging) return;
        dragging = false;
        card.classList.remove("swiping");

        if (Math.abs(currentX) >= threshold) {
            card.style.setProperty("--swipe-progress", "1");
            card.classList.add("swipe-delete");
            setTimeout(() => deleteTask(id, true), 320);
        } else {
            card.style.transform = "";
            card.style.removeProperty("--swipe-progress");
            card.classList.remove("swipe-ready");
        }
    };

    card.addEventListener("pointerup", finishSwipe);
    card.addEventListener("pointercancel", finishSwipe);
}

function advanceTask(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    if (task.status === "pending") task.status = "progress";
    else if (task.status === "progress") task.status = "done";

    setStorage("resolvePraMimTasks", tasks);

    const historyItem = history.find(item => item.id === id);
    if (historyItem) {
        historyItem.status = task.status;
        if (task.status === "done") {
            historyItem.completedAt = new Date().toLocaleDateString("pt-BR");
        }
        setStorage("resolvePraMimHistory", history);
    }

    renderTasks();
    showToast("Status atualizado! ✓");
}

function deleteTask(id, confirmedByGesture = false) {
    if (!confirmedByGesture && !confirm("Para excluir, arraste a tarefa para a esquerda.")) return;

    tasks = tasks.filter(task => task.id !== id);
    setStorage("resolvePraMimTasks", tasks);

    renderTasks();
    showToast("Tarefa excluída. 🗑️");
}

function renderHistory() {
    const container = document.getElementById("historyContainer");
    if (!container) return;

    container.innerHTML = "";

    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div>🕘</div>
                <h3>Seu histórico está vazio</h3>
                <p>As tarefas que você criar aparecerão aqui.</p>
            </div>
        `;
        return;
    }

    history.forEach(item => {
        const card = document.createElement("div");
        card.className = "task-card";
        const isDone = item.status === "done";

        card.innerHTML = `
            <div class="task-top">
                <div>
                    <h3>${item.icon} ${item.title}</h3>
                    <div class="task-date">Criada em ${item.date}</div>
                </div>
                <span class="status ${isDone ? "done" : "progress"}">
                    ${isDone ? "Concluída ✓" : "Em andamento"}
                </span>
            </div>
            ${item.completedAt ? `<div class="task-date">Finalizada em ${item.completedAt}</div>` : ""}
        `;

        container.appendChild(card);
    });
}

/* =========================================
   TOAST
========================================= */

let toastTimer;
function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* =========================================
   EVENT LISTENERS (SAFE REGISTRATION)
========================================= */

solveButton?.addEventListener("click", solveProblem);
document.getElementById("copyMessage")?.addEventListener("click", copyMessage);
document.getElementById("saveTask")?.addEventListener("click", saveTask);
document.getElementById("backHome")?.addEventListener("click", () => showScreen("homeScreen"));
document.getElementById("goSolve")?.addEventListener("click", () => showScreen("homeScreen"));

document.getElementById("navSolve")?.addEventListener("click", () => {
    showScreen("homeScreen");
    setTimeout(() => problemInput?.focus(), 300);
});

navItems.forEach(item => {
    item.addEventListener("click", () => showScreen(item.dataset.screen));
});

document.querySelectorAll(".example-card").forEach(card => {
    card.addEventListener("click", () => {
        if (problemInput) {
            problemInput.value = card.dataset.problem;
            solveProblem();
        }
    });
});

problemInput?.addEventListener("keydown", event => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        solveProblem();
    }
});

document.getElementById("clearData")?.addEventListener("click", () => {
    if (!confirm("Isso apagará todas as suas tarefas. Deseja continuar?")) return;

    localStorage.removeItem("resolvePraMimTasks");
    localStorage.removeItem("resolvePraMimHistory");

    tasks = [];
    history = [];

    renderTasks();
    renderHistory();
    showToast("Dados apagados.");
});

/* =========================================
   PWA & SERVICE WORKER
========================================= */

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    if (installBtn) installBtn.style.display = "block";
});

installBtn?.addEventListener("click", async () => {
    if (!deferredPrompt) {
        showToast("Para instalar, abra o aplicativo pelo navegador compatível.");
        return;
    }

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
        showToast("Aplicativo instalado! 📱");
    }

    deferredPrompt = null;
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("service-worker.js")
            .then(() => console.log("Service Worker registrado com sucesso."))
            .catch(error => console.error("Erro no Service Worker:", error));
    });
}

/* =========================================
   INICIALIZAÇÃO
========================================= */

if (installBtn) installBtn.style.display = "none";
renderTasks();
renderHistory();