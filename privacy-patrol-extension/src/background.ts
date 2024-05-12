import browser from 'webextension-polyfill';

interface ChangeInfo {
    cookie: browser.Cookies.Cookie;
    removed: boolean;
}

interface Message {
    type: string;
    action: string;
}

// Função para extrair o domínio de uma URL
function getDomainFromUrl(url: string): string {
    const urlObj = new URL(url);
    return urlObj.hostname;
}

// Contadores para diversas métricas
let thirdPartyConnectionAttempts = 0;
let suspiciousRedirects = 0;
let localStorageUsage = 0;
let cookieCount = 0;
let canvasFingerprintAttempts = 0;

// Detectar conexões de terceiros
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const requestDomain = new URL(details.url).hostname;
        const pageDomain = details.originUrl ? new URL(details.originUrl).hostname : '';

        if (requestDomain !== pageDomain) {
            thirdPartyConnectionAttempts++;
            console.log("Conexão de terceira parte detectada:", thirdPartyConnectionAttempts);
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

// Detectar redirecionamentos suspeitos
browser.webRequest.onBeforeRedirect.addListener(
    (details) => {
        if (details.type === "main_frame") {
            suspiciousRedirects++;
            console.log("Redirecionamento suspeito detectado:", suspiciousRedirects);
        }
    },
    { urls: ["<all_urls>"] }
);

// Detectar tentativas de fingerprinting de canvas
browser.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    if (message.type === 'fingerprintDetected') {
        canvasFingerprintAttempts++;
        console.log("Tentativa de fingerprinting de canvas detectada:", canvasFingerprintAttempts);
    }
});

// Atualizar contagem de cookies
function updateCookieCount() {
    browser.cookies.getAll({}).then((cookies) => {
        cookieCount = cookies.length;
        console.log(`Total de cookies: ${cookieCount}`);
    }).catch((error) => {
        console.error('Erro ao buscar cookies:', error);
    });
}

// Ouvir mudanças em cookies
browser.cookies.onChanged.addListener((changeInfo: ChangeInfo) => {
    console.log('Mudança em cookie:', changeInfo);
    updateCookieCount();
});

// Calcular e enviar pontuação de privacidade
function calculatePrivacyScore() {
    let score = 100; // Pontuação inicial

    // Deduções por métricas de privacidade
    score -= thirdPartyConnectionAttempts * 2;
    score -= suspiciousRedirects * 5;
    score -= localStorageUsage > 5 ? 15 : localStorageUsage > 1 ? 5 : 0;
    score -= cookieCount > 50 ? 20 : cookieCount > 10 ? 10 : 0;
    score -= canvasFingerprintAttempts * 10;

    return Math.max(score, 0); // Garantir que a pontuação não seja negativa
}

browser.runtime.onMessage.addListener((message: Message, sender) => {
    if (message.action === "getPrivacyScore") {
        return Promise.resolve({ score: calculatePrivacyScore() });
    }
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getConnectionCounts") {
        // Certifique-se de que a resposta é enviada corretamente
        sendResponse({
            thirdPartyConnectionAttempts: thirdPartyConnectionAttempts,
            suspiciousRedirects: suspiciousRedirects
        });
        return true; // para manter o canal de comunicação aberto para sendResponse
    }
});
