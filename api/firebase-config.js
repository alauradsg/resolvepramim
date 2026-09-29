export default function handler(req, res) {
    // Configurações públicas do Firebase carregadas a partir das variáveis de ambiente da Vercel
    res.status(200).json({
        apiKey: process.env.FIREBASE_API_KEY || "",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
        projectId: process.env.FIREBASE_PROJECT_ID || "",
        appId: process.env.FIREBASE_APP_ID || "",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || ""
    });
}
