/* =========================================
   JavaScript principal
========================================= */

"use strict";


/* =========================================
   BANCO DE SOLUÇÕES
========================================= */

const solutions = {

    internet: {
        keywords: [
            "internet",
            "wifi",
            "wi-fi",
            "banda larga",
            "provedor",
            "plano de internet"
        ],

        title: "Cancelar ou resolver problema com internet",

        icon: "🌐",

        description:
            "Você precisa entrar em contato com a sua operadora/provedora, solicitar o cancelamento ou registrar a reclamação e guardar o número do protocolo.",

        steps: [
            {
                title: "Entre em contato com a operadora",
                text: "Use o aplicativo, site, telefone ou canal oficial da empresa."
            },
            {
                title: "Explique o que deseja",
                text: "Informe que deseja cancelar o serviço ou resolver o problema."
            },
            {
                title: "Solicite o protocolo",
                text: "Anote ou salve o número do protocolo do atendimento."
            },
            {
                title: "Confirme o cancelamento",
                text: "Peça confirmação e verifique se haverá alguma cobrança final."
            },
            {
                title: "Guarde os comprovantes",
                text: "Salve protocolos, e-mails, mensagens e documentos."
            }
        ],

        documents: [
            "Documento de identificação",
            "CPF",
            "Número do contrato ou cadastro",
            "Última fatura, se disponível",
            "Número do protocolo do atendimento"
        ],

        message:
`Olá,

Gostaria de solicitar o cancelamento/resolução do meu serviço de internet.

Peço, por favor, que seja informado o procedimento necessário e que seja gerado um número de protocolo para este atendimento.

Também solicito a confirmação por escrito da solicitação.

Obrigado(a).`
    },


    segundaVia: {

        keywords: [
            "segunda via",
            "2 via",
            "segunda-via",
            "documento perdido",
            "documento"
        ],

        title: "Solicitar segunda via de documento",

        icon: "📄",

        description:
            "A primeira etapa é identificar qual documento você precisa. Depois, procure o órgão ou instituição responsável pela emissão da segunda via.",

        steps: [
            {
                title: "Identifique o documento",
                text: "Confira qual documento precisa ser emitido novamente."
            },
            {
                title: "Procure o órgão responsável",
                text: "Utilize o site, aplicativo ou atendimento oficial."
            },
            {
                title: "Confira os requisitos",
                text: "Verifique documentos, taxas e formas de atendimento."
            },
            {
                title: "Faça a solicitação",
                text: "Preencha os dados solicitados e envie o pedido."
            },
            {
                title: "Guarde o protocolo",
                text: "Salve o número da solicitação para acompanhar o pedido."
            }
        ],

        documents: [
            "Documento de identificação",
            "CPF",
            "Informações do documento original",
            "Comprovante de pagamento, se houver taxa",
            "Número do protocolo, se já tiver solicitado"
        ],

        message:
`Olá,

Gostaria de solicitar a segunda via do meu documento.

Poderiam me informar quais documentos são necessários, qual o procedimento para solicitar a segunda via e se existe alguma taxa?

Também gostaria de receber o número de protocolo da solicitação.

Obrigado(a).`
    },


    cobranca: {

        keywords: [
            "cobrança",
            "cobranca",
            "cobrado",
            "cobrança indevida",
            "valor errado",
            "fatura errada",
            "fatura"
        ],

        title: "Contestar uma cobrança",

        icon: "💰",

        description:
            "Para contestar uma cobrança, reúna os comprovantes, identifique o valor questionado e faça a reclamação pelo canal oficial da empresa.",

        steps: [
            {
                title: "Identifique a cobrança",
                text: "Confira o valor, data e serviço/produto relacionado."
            },
            {
                title: "Separe os comprovantes",
                text: "Tenha faturas, recibos, comprovantes e conversas."
            },
            {
                title: "Faça a reclamação",
                text: "Entre em contato com a empresa responsável."
            },
            {
                title: "Peça o protocolo",
                text: "Solicite o número de protocolo do atendimento."
            },
            {
                title: "Acompanhe a resposta",
                text: "Guarde a resposta e o prazo informado pela empresa."
            }
        ],

        documents: [
            "Documento de identificação",
            "CPF",
            "Fatura ou cobrança questionada",
            "Comprovante de pagamento",
            "Conversas ou comprovantes relacionados"
        ],

        message:
`Olá,

Gostaria de contestar uma cobrança que considero incorreta.

Solicito a verificação detalhada da cobrança e, caso seja constatado algum erro, a correção do valor.

Peço também que esta solicitação seja registrada e que seja informado o número de protocolo do atendimento.

Obrigado(a).`
    },


    compra: {

        keywords: [
            "cancelar compra",
            "cancelar pedido",
            "cancelamento de compra",
            "produto",
            "pedido",
            "compra"
        ],

        title: "Cancelar uma compra ou pedido",

        icon: "🛒",

        description:
            "Verifique a política de cancelamento da empresa, reúna os dados do pedido e faça a solicitação pelo canal oficial.",

        steps: [
            {
                title: "Localize o pedido",
                text: "Tenha em mãos o número do pedido ou comprovante da compra."
            },
            {
                title: "Confira as condições",
                text: "Verifique as regras de cancelamento da empresa."
            },
            {
                title: "Solicite o cancelamento",
                text: "Use o aplicativo, site ou canal oficial de atendimento."
            },
            {
                title: "Guarde o protocolo",
                text: "Salve o protocolo ou comprovante da solicitação."
            },
            {
                title: "Acompanhe o estorno",
                text: "Caso tenha pago, acompanhe a confirmação do cancelamento e eventual estorno."
            }
        ],

        documents: [
            "Documento de identificação",
            "CPF",
            "Número do pedido",
            "Comprovante de compra",
            "Comprovante de pagamento"
        ],

        message:
`Olá,

Gostaria de solicitar o cancelamento do meu pedido/compra.

Número do pedido: __________________

Peço a confirmação do cancelamento e, caso aplicável, informações sobre o procedimento de estorno.

Por favor, também me informe o número de protocolo deste atendimento.

Obrigado(a).`
    },


    governo: {

        keywords: [
            "governo",
            "prefeitura",
            "documentação",
            "serviço público",
            "serviço do governo",
            "órgão público",
            "inss",
            "detran"
        ],

        title: "Resolver um serviço público",

        icon: "🏛️",

        description:
            "Serviços públicos podem exigir documentos, agendamento ou solicitação online. Primeiro identifique o órgão responsável pelo serviço.",

        steps: [
            {
                title: "Identifique o serviço",
                text: "Defina exatamente qual serviço público você precisa."
            },
            {
                title: "Identifique o órgão",
                text: "Descubra qual órgão é responsável pela solicitação."
            },
            {
                title: "Confira os documentos",
                text: "Verifique a documentação exigida."
            },
            {
                title: "Veja se precisa agendar",
                text: "Alguns serviços exigem agendamento prévio."
            },
            {
                title: "Faça a solicitação",
                text: "Realize o procedimento e guarde o protocolo."
            }
        ],

        documents: [
            "Documento de identificação",
            "CPF",
            "Comprovante de endereço, quando solicitado",
            "Documentos relacionados ao serviço",
            "Número de protocolo, após a solicitação"
        ],

        message:
`Olá,

Gostaria de obter informações sobre como realizar o seguinte serviço:

____________________________________

Poderiam me informar quais documentos são necessários, se é necessário realizar agendamento e qual o procedimento para fazer a solicitação?

Obrigado(a).`
    },


    reclamacao: {

        keywords: [
            "reclamar",
            "reclamação",
            "reclamacao",
            "problema",
            "atendimento ruim",
            "não resolveram",
            "nao resolveram"
        ],

        title: "Registrar uma reclamação",

        icon: "📢",

        description:
            "Uma reclamação deve explicar claramente o problema, apresentar os dados relevantes e registrar o pedido de solução.",

        steps: [
            {
                title: "Descreva o problema",
                text: "Explique o que aconteceu de forma objetiva."
            },
            {
                title: "Informe quando aconteceu",
                text: "Adicione datas, valores, pedidos ou protocolos."
            },
            {
                title: "Apresente os comprovantes",
                text: "Anexe documentos, fotos ou comprovantes quando necessário."
            },
            {
                title: "Informe a solução esperada",
                text: "Diga claramente o que você deseja que seja resolvido."
            },
            {
                title: "Guarde o protocolo",
                text: "Salve o número da reclamação para acompanhamento."
            }
        ],

        documents: [
            "Documento de identificação",
            "CPF",
            "Comprovantes relacionados ao problema",
            "Faturas ou recibos, se houver",
            "Protocolos de atendimentos anteriores"
        ],

        message:
`Olá,

Gostaria de registrar uma reclamação referente ao seguinte problema:

____________________________________

Data do ocorrido: __________________

Descrição:
____________________________________

Gostaria que o problema fosse analisado e solucionado.

Peço também que seja informado o número de protocolo desta reclamação.

Obrigado(a).`
    }
};


/* =========================================
   ESTADO DA APLICAÇÃO
========================================= */

let currentSolution = null;

let tasks = JSON.parse(
    localStorage.getItem("resolvePraMimTasks")
) || [];

let history = JSON.parse(
    localStorage.getItem("resolvePraMimHistory")
) || [];


/* =========================================
   ELEMENTOS
========================================= */

const problemInput =
    document.getElementById("problemInput");

const solveButton =
    document.getElementById("solveButton");

const screens =
    document.querySelectorAll(".screen");

const navItems =
    document.querySelectorAll(".nav-item");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================
   NORMALIZAR TEXTO
========================================= */

function normalizeText(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


/* =========================================
   IDENTIFICAR PROBLEMA
========================================= */

function identifyProblem(text) {

    const normalized = normalizeText(text);

    let bestSolution = null;

    let highestScore = 0;

    Object.values(solutions).forEach(solution => {

        let score = 0;

        solution.keywords.forEach(keyword => {

            const normalizedKeyword =
                normalizeText(keyword);

            if (normalized.includes(normalizedKeyword)) {
                score++;
            }
        });

        if (score > highestScore) {

            highestScore = score;

            bestSolution = solution;
        }
    });


    /*
       Caso não encontre uma categoria específica,
       utiliza a solução genérica de reclamação.
    */

    if (!bestSolution) {
        bestSolution = solutions.reclamacao;
    }

    return bestSolution;
}


/* =========================================
   MOSTRAR TELA
========================================= */

function showScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selected =
        document.getElementById(screenId);

    if (selected) {
        selected.classList.add("active");
    }


    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.screen === screenId) {
            item.classList.add("active");
        }
    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (screenId === "tasksScreen") {
        renderTasks();
    }

    if (screenId === "historyScreen") {
        renderHistory();
    }
}


/* =========================================
   RESOLVER PROBLEMA
========================================= */

function solveProblem() {

    const text =
        problemInput.value.trim();

    if (!text) {

        showToast(
            "Conte primeiro qual problema você precisa resolver."
        );

        problemInput.focus();

        return;
    }


    currentSolution =
        identifyProblem(text);


    document.getElementById("resultIcon").textContent =
        currentSolution.icon;

    document.getElementById("resultTitle").textContent =
        currentSolution.title;

    document.getElementById("resultDescription").textContent =
        currentSolution.description;


    /* PASSOS */

    const stepsContainer =
        document.getElementById("stepsContainer");

    stepsContainer.innerHTML = "";


    currentSolution.steps.forEach(
        (step, index) => {

            const element =
                document.createElement("div");

            element.className = "step";

            element.innerHTML = `
                <div class="step-number">
                    ${index + 1}
                </div>

                <div class="step-content">
                    <strong>${step.title}</strong>
                    <span>${step.text}</span>
                </div>
            `;

            stepsContainer.appendChild(element);
        }
    );


    /* DOCUMENTOS */

    const documentsContainer =
        document.getElementById(
            "documentsContainer"
        );

    documentsContainer.innerHTML = "";


    currentSolution.documents.forEach(
        documentItem => {

            const li =
                document.createElement("li");

            li.innerHTML =
                `✓ ${documentItem}`;

            documentsContainer.appendChild(li);
        }
    );


    /* MENSAGEM */

    document.getElementById(
        "messageContainer"
    ).value =
        currentSolution.message;


    showScreen("resultScreen");
}


/* =========================================
   COPIAR MENSAGEM
========================================= */

async function copyMessage() {

    const message =
        document.getElementById(
            "messageContainer"
        ).value;


    try {

        await navigator.clipboard.writeText(message);

        showToast(
            "Mensagem copiada! 📋"
        );

    } catch (error) {

        const textarea =
            document.getElementById(
                "messageContainer"
            );

        textarea.select();

        document.execCommand("copy");

        showToast(
            "Mensagem copiada! 📋"
        );
    }
}


/* =========================================
   SALVAR TAREFA
========================================= */

function saveTask() {

    if (!currentSolution) {
        return;
    }


    const task = {

        id: Date.now(),

        title: currentSolution.title,

        icon: currentSolution.icon,

        status: "pending",

        date: new Date().toLocaleDateString(
            "pt-BR"
        ),

        message: currentSolution.message
    };


    tasks.unshift(task);

    localStorage.setItem(
        "resolvePraMimTasks",
        JSON.stringify(tasks)
    );


    history.unshift({

        ...task,

        completedAt: null

    });

    localStorage.setItem(
        "resolvePraMimHistory",
        JSON.stringify(history)
    );


    showToast(
        "Tarefa salva com sucesso! 📌"
    );


    setTimeout(() => {

        showScreen("tasksScreen");

    }, 700);
}


/* =========================================
   RENDERIZAR TAREFAS
========================================= */

function renderTasks() {

    const container =
        document.getElementById(
            "tasksContainer"
        );

    const empty =
        document.getElementById(
            "emptyTasks"
        );


    container.innerHTML = "";


    if (tasks.length === 0) {

        empty.style.display = "block";

        return;
    }


    empty.style.display = "none";


    tasks.forEach(task => {

        const card =
            document.createElement("div");

        card.className = "task-card";


        let statusText =
            "Pendente";

        let statusClass =
            "pending";


        if (task.status === "progress") {

            statusText =
                "Em andamento";

            statusClass =
                "progress";
        }


        if (task.status === "done") {

            statusText =
                "Concluída";

            statusClass =
                "done";
        }


        card.innerHTML = `

            <div class="task-top">

                <div>
                    <h3>
                        ${task.icon}
                        ${task.title}
                    </h3>

                    <div class="task-date">
                        Criada em ${task.date}
                    </div>
                </div>

                <span class="status ${statusClass}">
                    ${statusText}
                </span>

            </div>


            <div class="task-controls">

                ${
                    task.status !== "done"
                    ?
                    `
                    <button
                        onclick="advanceTask(${task.id})">
                        Avançar status
                    </button>
                    `
                    :
                    ""
                }

                <button
                    onclick="deleteTask(${task.id})">
                    Excluir
                </button>

            </div>
        `;


        container.appendChild(card);
    });
}


/* =========================================
   AVANÇAR STATUS
========================================= */

function advanceTask(id) {

    const task =
        tasks.find(item => item.id === id);


    if (!task) {
        return;
    }


    if (task.status === "pending") {

        task.status = "progress";

    } else if (task.status === "progress") {

        task.status = "done";
    }


    localStorage.setItem(
        "resolvePraMimTasks",
        JSON.stringify(tasks)
    );


    /*
       Atualiza também o histórico.
    */

    const historyItem =
        history.find(item => item.id === id);

    if (historyItem) {

        historyItem.status =
            task.status;

        if (task.status === "done") {

            historyItem.completedAt =
                new Date().toLocaleDateString(
                    "pt-BR"
                );
        }

        localStorage.setItem(
            "resolvePraMimHistory",
            JSON.stringify(history)
        );
    }


    renderTasks();

    showToast(
        "Status atualizado! ✓"
    );
}


/* =========================================
   EXCLUIR TAREFA
========================================= */

function deleteTask(id) {

    const confirmed =
        confirm(
            "Tem certeza que deseja excluir esta tarefa?"
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(
            task => task.id !== id
        );


    localStorage.setItem(
        "resolvePraMimTasks",
        JSON.stringify(tasks)
    );


    renderTasks();

    showToast(
        "Tarefa excluída."
    );
}


/* =========================================
   HISTÓRICO
========================================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyContainer"
        );


    container.innerHTML = "";


    if (history.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div>🕘</div>

                <h3>
                    Seu histórico está vazio
                </h3>

                <p>
                    As tarefas que você criar
                    aparecerão aqui.
                </p>

            </div>
        `;

        return;
    }


    history.forEach(item => {

        const card =
            document.createElement("div");

        card.className = "task-card";


        const status =
            item.status === "done"
                ? "Concluída ✓"
                : "Em andamento";


        card.innerHTML = `

            <div class="task-top">

                <div>
                    <h3>
                        ${item.icon}
                        ${item.title}
                    </h3>

                    <div class="task-date">
                        Criada em ${item.date}
                    </div>
                </div>

                <span class="status ${
                    item.status === "done"
                    ? "done"
                    : "progress"
                }">
                    ${status}
                </span>

            </div>

            ${
                item.completedAt
                ?
                `
                <div class="task-date">
                    Finalizada em ${item.completedAt}
                </div>
                `
                :
                ""
            }
        `;


        container.appendChild(card);
    });
}


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);
}


/* =========================================
   EVENTOS
========================================= */

solveButton.addEventListener(
    "click",
    solveProblem
);


document.getElementById(
    "copyMessage"
).addEventListener(
    "click",
    copyMessage
);


document.getElementById(
    "saveTask"
).addEventListener(
    "click",
    saveTask
);


document.getElementById(
    "backHome"
).addEventListener(
    "click",
    () => showScreen("homeScreen")
);


document.getElementById(
    "goSolve"
).addEventListener(
    "click",
    () => showScreen("homeScreen")
);


document.getElementById(
    "navSolve"
).addEventListener(
    "click",
    () => {

        showScreen("homeScreen");

        setTimeout(() => {
            problemInput.focus();
        }, 300);
    }
);


/* NAVEGAÇÃO */

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const screen =
                item.dataset.screen;

            showScreen(screen);
        }
    );
});


/* EXEMPLOS */

document.querySelectorAll(
    ".example-card"
).forEach(card => {

    card.addEventListener(
        "click",
        () => {

            problemInput.value =
                card.dataset.problem;

            solveProblem();
        }
    );
});


/* ENTER + CTRL */

problemInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            (event.ctrlKey || event.metaKey)
        ) {

            solveProblem();
        }
    }
);


/* =========================================
   LIMPAR DADOS
========================================= */

document.getElementById(
    "clearData"
).addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Isso apagará todas as suas tarefas. Deseja continuar?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "resolvePraMimTasks"
        );

        localStorage.removeItem(
            "resolvePraMimHistory"
        );


        tasks = [];

        history = [];


        renderTasks();

        renderHistory();


        showToast(
            "Dados apagados."
        );
    }
);


/* =========================================
   PWA - INSTALAÇÃO
========================================= */

let deferredPrompt = null;


window.addEventListener(
    "beforeinstallprompt",
    event => {

        event.preventDefault();

        deferredPrompt = event;

        document.getElementById(
            "installButton"
        ).style.display = "block";
    }
);


document.getElementById(
    "installButton"
).addEventListener(
    "click",
    async () => {

        if (!deferredPrompt) {

            showToast(
                "Para instalar, abra o aplicativo pelo navegador compatível."
            );

            return;
        }


        deferredPrompt.prompt();


        const result =
            await deferredPrompt.userChoice;


        if (result.outcome === "accepted") {

            showToast(
                "Aplicativo instalado! 📱"
            );
        }


        deferredPrompt = null;
    }
);


/* =========================================
   SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("service-worker.js")
                .then(() => {

                    console.log(
                        "Service Worker registrado."
                    );

                })
                .catch(error => {

                    console.error(
                        "Erro no Service Worker:",
                        error
                    );

                });
        }
    );
}


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.getElementById(
    "installButton"
).style.display = "none";


renderTasks();

renderHistory();