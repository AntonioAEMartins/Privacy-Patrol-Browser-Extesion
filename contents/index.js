document.addEventListener('DOMContentLoaded', function () {
    browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === "cookieCounts") {
            document.getElementById('firstPartyCookiesCount').textContent = message.firstPartyCookies;
            document.getElementById('thirdPartyCookiesCount').textContent = message.thirdPartyCookies;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let thirdPartyConnectionCount = 0;

    browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === "thirdPartyConnectionDetected") {
            thirdPartyConnectionCount++;
            document.getElementById('thirdPartyCount').textContent = thirdPartyConnectionCount;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let hijackingThreatCount = 0;

    browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === "hijackingThreatDetected") {
            hijackingThreatCount += message.count;
            document.getElementById('hijackingCount').textContent = hijackingThreatCount;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === "storageData") {
            document.getElementById('localStorageUsage').textContent = message.localStorageCount;
            document.getElementById('sessionStorageUsage').textContent = message.sessionStorageCount;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === "canvasFingerprintDetected" || message.type === "canvasFingerprintStatus") {
            let status = message.detected ? "Detectado" : "Não Detectado";
            document.getElementById('canvasFingerprintStatus').textContent = status;
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    let baseScore = 100;
    let thirdPartyConnections = 0;
    let hijackingThreats = 0;
    let localStorageUsage = 0;
    let sessionStorageUsage = 0;
    let canvasFingerprintDetected = false;

    function updatePrivacyScore() {
        let score = baseScore;

        const cleanThirdPartyConnections = Number(thirdPartyConnections) || 0;
        const cleanHijackingThreats = Number(hijackingThreats) || 0;
        const cleanLocalStorageUsage = Number(localStorageUsage) || 0;
        const cleanSessionStorageUsage = Number(sessionStorageUsage) || 0;
        const cleanFingerprintDetected = canvasFingerprintDetected ? 1 : 0;

        const thirdPartyPenalty = Math.min(cleanThirdPartyConnections, 10);
        const hijackingPenalty = Math.min(cleanHijackingThreats * 10, 30);
        const storagePenalty = (cleanLocalStorageUsage > 50 || cleanSessionStorageUsage > 50) ? 5 : 0;
        const fingerprintPenalty = cleanFingerprintDetected ? 20 : 0;

        score -= thirdPartyPenalty;
        score -= hijackingPenalty;
        score -= storagePenalty;
        score -= fingerprintPenalty;

        score = Math.max(score, 0);

        if (!isNaN(score)) {
            document.getElementById('privacyScoreValue').textContent = score;
        }
    }

    browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.type === "thirdPartyConnectionDetected") {
            thirdPartyConnections += parseInt(message.count);
            updatePrivacyScore();
        } else if (message.type === "hijackingThreatDetected") {
            hijackingThreats += parseInt(message.count);
            updatePrivacyScore();
        } else if (message.type === "storageData") {
            localStorageUsage = parseInt(message.localStorageCount);
            sessionStorageUsage = parseInt(message.sessionStorageCount);
            updatePrivacyScore();
        } else if (message.type === "canvasFingerprintStatus") {
            canvasFingerprintDetected = message.detected;
            updatePrivacyScore();
        }
    });
});

