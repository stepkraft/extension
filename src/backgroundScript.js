/*global chrome*/
try {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        const port = chrome.tabs.connect(tabId);
        port.postMessage({ name: 'extension-tabs', payload: { changeInfo, tab }});
    });
} catch (er) {
    console.warn(er);
}