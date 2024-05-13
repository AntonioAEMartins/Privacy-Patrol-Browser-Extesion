const getContext = HTMLCanvasElement.prototype.getContext;
let localStorageCount = Object.keys(localStorage).length;
let sessionStorageCount = Object.keys(sessionStorage).length;

browser.runtime.sendMessage({
    type: "storageData",
    localStorageCount,
    sessionStorageCount
});

HTMLCanvasElement.prototype.getContext = function (...args) {
    let context = getContext.apply(this, args);
    if (args[0] === '2d') {
        const getImageData = context.getImageData;
        context.getImageData = function (...args) {
            browser.runtime.sendMessage({
                type: "canvasFingerprintDetected",
                detected: true
            });
            return getImageData.apply(this, args);
        };
    }
    return context;
};

browser.runtime.sendMessage({
    type: "canvasFingerprintStatus",
    detected: false
});