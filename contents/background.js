let firstPartyCookies = 0;
let thirdPartyCookies = 0;
let tabDomainMap = {};
let hijackingThreatCount = {};


browser.webRequest.onHeadersReceived.addListener(
    function (details) {
        details.responseHeaders.forEach(header => {
            if (header.name.toLowerCase() === "set-cookie") {
                if (isThirdPartyCookie(details.url, header.value)) {
                    thirdPartyCookies++;
                } else {
                    firstPartyCookies++;
                }
            }
        });

        browser.runtime.sendMessage({
            type: "cookieCounts",
            firstPartyCookies,
            thirdPartyCookies
        });
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
);

function isThirdPartyCookie(requestUrl, cookieHeader) {
    let cookieDomain = getCookieDomain(cookieHeader);
    let requestDomain = new URL(requestUrl).hostname;
    return !requestDomain.endsWith(cookieDomain) && !cookieDomain.endsWith(requestDomain);
}

function getCookieDomain(cookieString) {
    const domainPattern = /domain=([^;]+)/i;
    let match = cookieString.match(domainPattern);
    return match ? match[1].replace(/^\./, '') : new URL(cookieString).hostname;
}

browser.webRequest.onBeforeRequest.addListener(
    function (details) {
        const tabId = details.tabId;
        let tabDomain = tabDomainMap[tabId];
        const requestDomain = new URL(details.url).hostname;

        if (tabDomain && !requestDomain.endsWith(tabDomain)) {
            browser.runtime.sendMessage({
                type: "thirdPartyConnectionDetected",
                tabId: tabId
            });
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        tabDomainMap[tabId] = new URL(changeInfo.url).hostname;
    }
});

browser.tabs.onRemoved.addListener((tabId) => {
    delete tabDomainMap[tabId];
});

browser.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.type === 'script' && new URL(details.url).hostname !== new URL(details.originUrl).hostname) {
            logThreat(details.tabId, 'Script de origem desconhecida detectado');
        }
        if (details.type === 'main_frame' && details.url !== details.originUrl) {
            logThreat(details.tabId, 'Redirecionamento inesperado detectado');
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

function logThreat(tabId, message) {
    hijackingThreatCount[tabId] = (hijackingThreatCount[tabId] || 0) + 1;
    browser.runtime.sendMessage({
        type: "hijackingThreatDetected",
        tabId: tabId,
        count: hijackingThreatCount[tabId]
    });
}

browser.tabs.onRemoved.addListener((tabId) => {
    delete hijackingThreatCount[tabId];
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        browser.tabs.executeScript(tabId, {
            file: 'contentScript.js'
        });
    }
});

browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "canvasFingerprintDetected" || message.type === "canvasFingerprintStatus") {
        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length > 0) {
                browser.tabs.sendMessage(tabs[0].id, message);
            }
        });
    }
});
