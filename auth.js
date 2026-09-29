"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

let auth = null;

/* =========================================
   INICIALIZAÇÃO DO FIREBASE (VIA VERCEL SERVERLESS)
========================================= */

async function initAuth() {
    try {
        const response = await fetch("/api/firebase-config");
        if (!response.ok) {
            throw new Error(`Status ${response.status}`);
        }

        const config = await response.json();

        if (!config || !config.apiKey) {
            console.warn("Variáveis de ambiente do Firebase ainda não carregadas da Vercel.");
            return null;
        }

        const app = initializeApp(config);
        auth = getAuth(app);

        // Monitorar alterações de login em tempo real
        onAuthStateChanged(auth, user => {
            renderUserState(user);
        });

        return auth;
    } catch (error) {
        console.warn("Aviso: /api/firebase-config indisponível no ambiente local.", error);
        return null;
    }
}

/* =========================================
   RENDERIZAÇÃO DO ESTADO DO USUÁRIO
========================================= */

function renderUserState(user) {
    const loggedOutView = document.getElementById("authLoggedOut");
    const loggedInView = document.getElementById("authLoggedIn");
    const userPhoto = document.getElementById("userPhoto");
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const authError = document.getElementById("authError");

    if (authError) {
        authError.style.display = "none";
        authError.textContent = "";
    }

    if (user) {
        if (loggedOutView) loggedOutView.style.display = "none";
        if (loggedInView) loggedInView.style.display = "block";
        if (userName) userName.textContent = user.displayName || "Usuário";
        if (userEmail) userEmail.textContent = user.email || "";

        if (userPhoto) {
            if (user.photoURL) {
                userPhoto.innerHTML = `<img src="${user.photoURL}" alt="${user.displayName || 'Avatar'}" class="user-avatar-img">`;
            } else {
                userPhoto.innerHTML = "👤";
            }
        }
    } else {
        if (loggedOutView) loggedOutView.style.display = "block";
        if (loggedInView) loggedInView.style.display = "none";
        if (userPhoto) userPhoto.innerHTML = "👤";
    }
}

/* =========================================
   AÇÕES DE LOGIN E LOGOUT
========================================= */

document.getElementById("googleLoginBtn")?.addEventListener("click", async () => {
    const authError = document.getElementById("authError");
    if (authError) {
        authError.style.display = "none";
        authError.textContent = "";
    }

    if (!auth) {
        auth = await initAuth();
        if (!auth) {
            if (authError) {
                authError.textContent = "Para fazer login com o Google, abra o aplicativo pelo link da Vercel (onde as chaves estão configuradas).";
                authError.style.display = "block";
            }
            return;
        }
    }

    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        const result = await signInWithPopup(auth, provider);
        const firstName = (result.user?.displayName || "Usuário").split(" ")[0];
        window.showToast?.(`Bem-vindo(a), ${firstName}! 👋`);
    } catch (error) {
        console.error("Erro na autenticação:", error);
        if (authError) {
            if (error.code === "auth/popup-closed-by-user") {
                authError.textContent = "A janela do Google foi fechada antes de concluir o login.";
            } else if (error.code === "auth/unauthorized-domain") {
                authError.textContent = "Domínio não autorizado no Firebase Console. Certifique-se de cadastrar seu domínio .vercel.app em Authentication > Settings > Authorized domains.";
            } else if (error.code === "auth/network-request-failed") {
                authError.textContent = "Falha de conexão com os servidores do Google. Verifique sua internet.";
            } else {
                authError.textContent = `Erro ao entrar: ${error.message || error.code}`;
            }
            authError.style.display = "block";
        }
    }
});

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    if (!auth) return;

    try {
        await signOut(auth);
        window.showToast?.("Você saiu da conta.");
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
});

// Inicialização imediata
initAuth();
