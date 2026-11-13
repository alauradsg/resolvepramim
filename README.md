# ⚡ Resolve Pra Mim — Web App Mobile PWA

> **Assistente mobile-first para resolução de burocracias cotidianas, cancelamentos, contestações e direitos do consumidor.**  
> Projeto desenvolvido no curso de **Design de Mídias Digitais (Fatec)** para a disciplina de **Desenvolvimento Mobile II**.

---

## 📱 Sobre o Projeto

O **Resolve Pra Mim** é uma aplicação web progressiva (PWA) projetada sob a filosofia **Mobile-First**. O objetivo central é acolher o cidadão em momentos de estresse burocrático (cancelamento de internet, cobranças indevidas, solicitação de segunda via e reclamações em órgãos reguladores) e transformar a dor em uma sequência de passos simples, rápidos e acessíveis com linguagem empática.

### 🌟 Principais Funcionalidades

1. **Guia Passo a Passo de Burocracias:** Instruções mastigadas, lista de documentos necessários e fundamentação legal.
2. **Gerador de Mensagens Pré-formatadas (One-Tap Copy):** Mensagens prontas para colar em chats de operadoras, SACs e Procon, com feedback tátil e visual de cópia.
3. **Gestão e Histórico de Tarefas:** Salve e acompanhe o andamento de protocolos de atendimento com suporte offline total (LocalStorage + Service Worker).
4. **Autenticação Segura com Google (Firebase Auth):** Login social via pop-up com proteção de credenciais por variáveis de ambiente na Vercel (`/api/firebase-config.js`).
5. **Hierarquia Tipográfica Escalonável (`rem`):** Totalmente adaptável às preferências de acessibilidade e Dynamic Type do sistema operacional.
6. **Assistente IA Local via WebGPU (Hugging Face / SLM):** Chatbot executado 100% no navegador do usuário via `@huggingface/transformers` com aceleração por GPU, sem custos de API e com salvaguardas anti-alucinação.

---

## 🤖 Atividade A2.2 — Chatbot IA com WebGPU e Vetorização Hugging Face

Na atividade **A2.2**, o aplicativo integra um motor de **quebra (chunking), vetorização (embeddings) e busca por similaridade de cosseno** executado localmente no navegador via **WebGPU / WASM**:

* **Solucionando o Problema da Aula (Memória e Alucinação):** Em vez de carregar um SLM gerador pesado de ~500 MB (`Qwen2.5-0.5B`) que estoura a memória RAM de celulares/notebooks e alucina palavras, adotamos o pipeline de **extração de embeddings vetoriais** da Hugging Face (`Xenova/all-MiniLM-L6-v2`, com apenas **~23 MB** — 20x mais leve!) combinado a um vetorizador TF-IDF local instantâneo.
* **Biblioteca:** `@huggingface/transformers@3.8.1` via CDN ESM nativa com aceleração `webgpu` e fallback automático para `wasm` e motor vetorial puro do browser (tempo limite de segurança de 7,5s para nunca travar em 4G ou celulares com pouca RAM).
* **Zero Alucinação (100% Fiel à Lei):**
  * A base jurídica do *Resolve Pra Mim* (CDC Art. 42, Art. 49, Art. 18/26, Art. 35, Lei 14.015/2020 e Decreto do SAC nº 11.034/2022) é quebrada em *chunks* semânticos, vetorizada em 384 dimensões e comparada via **Similaridade de Cosseno** com a pergunta do usuário, retornando uma orientação 100% verificada e sem invenções.
* **Formulário de Linha Única & Seletor de Modo:** Atende estritamente à especificação da atividade com alternador *"🎯 Já sei o que resolver"* vs. *"🤖 Estou em dúvida (IA)"*.

---

## 🎨 Atividade A2.1 & A5 — Design System & Tipografia

A interface segue as diretrizes do **Apple Human Interface Guidelines (HIG)** e as normas de acessibilidade **WCAG 2.1 Nível AA**:

* **Zona do Polegar (Thumb-Friendly Zone):** Todas as ações críticas (gerar pedido, copiar mensagem, navegação inferior) situam-se na metade inferior da tela móvel com alvos $\ge 48\text{px}$.
* **Escala Tipográfica Padronizada em `rem`:**
  * `--display`: `2.000rem` (32px) — Títulos de impacto
  * `--h1`: `1.500rem` (24px) — Títulos principais de tela
  * `--h2`: `1.250rem` (20px) — Cartões de serviços
  * `--h3`: `1.125rem` (18px) — Subtítulos e passos
  * `--body`: `1.000rem` (16px) — Leitura principal (impede autozoom indesejado no Safari iOS)
  * `--small`: `0.875rem` (14px) — Metadados e formulários
  * `--caption`: `0.750rem` (12px) — Badges, protocolos e legendas
* **Modo Escuro Nativo (Dark Mode):** Alternância automática conforme as preferências do usuário (`@media (prefers-color-scheme: dark)`).
* **Dupla Codificação:** Badges de status nunca dependem exclusivamente da cor; combinam cor semântica, ícone representativo e texto explicativo legível.

---

## 🔒 Arquitetura de Segurança do Firebase

A aplicação utiliza o SDK Modular v11 do Firebase com arquitetura segura Serverless na Vercel:

```
┌─────────────────────────────────┐
│     Client (Navegador/PWA)      │
│  auth.js (Google Sign-In Popup) │
└────────────────┬────────────────┘
                 │
                 │ 1. GET /api/firebase-config
                 ▼
┌─────────────────────────────────┐
│     Vercel Serverless Function  │
│  api/firebase-config.js         │
│  (Lê process.env sem expor keys)│
└────────────────┬────────────────┘
                 │
                 │ 2. Retorna credenciais públicas
                 ▼
┌─────────────────────────────────┐
│     Firebase Authentication     │
│  Google OAuth Provider          │
└─────────────────────────────────┘
```

---

## 📁 Estrutura de Arquivos

```text
resolvepramim/
├── api/
│   └── firebase-config.js      # Serverless function Vercel para credenciais Firebase
├── .gitignore                  # Bloqueio de arquivos sensíveis e variáveis locais
├── auth.js                     # Gerenciamento de autenticação Google via Firebase v11
├── chatbot.js                  # Motor IA local via WebGPU (Transformers.js + Qwen 0.5B)
├── index.html                  # Estrutura semântica mobile-first e PWA
├── manifest.json               # Configurações de instalação e ícones do PWA
├── README.md                   # Documentação acadêmica completa do projeto
├── script.js                   # Lógica central, banco de soluções e LocalStorage
├── service-worker.js           # Cache offline v4 e PWA
├── status-modal.js             # Modal de acompanhamento de status em React
├── style.css                   # Design tokens, tipografia escalável e dark mode
└── success-check.json          # Asset de animação Lottie
```

---

## 🚀 Como Executar o Projeto

### Localmente
Como a aplicação utiliza módulos ES6 nativos e Service Worker, ela deve ser executada através de um servidor HTTP local:

```bash
# Com Python 3
python -m http.server 3000

# Ou com Node.js (npx serve)
npx serve .
```

Acesse no navegador: `http://localhost:3000`

### Deploy na Vercel
1. Conecte o repositório do GitHub à [Vercel](https://vercel.com).
2. Configure as seguintes **Environment Variables** no painel da Vercel:
   * `FIREBASE_API_KEY`
   * `FIREBASE_AUTH_DOMAIN`
   * `FIREBASE_PROJECT_ID`
   * `FIREBASE_STORAGE_BUCKET`
   * `FIREBASE_MESSAGING_SENDER_ID`
   * `FIREBASE_APP_ID`
3. No [Firebase Console](https://console.firebase.google.com), acesse **Authentication > Settings > Authorized Domains** e adicione o domínio gerado pela Vercel (`seu-app.vercel.app`).

---

## 👥 Créditos & Autoria
* **Aluna:** Ana Laura (@alauradsg)
* **Curso:** Tecnologia em Design de Mídias Digitais
* **Instituição:** Fatec
* **Disciplina:** Desenvolvimento Mobile II
