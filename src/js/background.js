const regexUrl = /^https:\/\/app\.mercos\.com\/\d+\/pedidos\/\d+\/detalhar\/?/;1

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        
        const isPaginaPedido = tab.url && regexUrl.test(tab.url)

        if (isPaginaPedido) {
            chrome.action.setIcon({
                path: { "48": "img/icon_active.png" },
                tabId: tabId
            });
        } else {
            chrome.action.setIcon({
                path: { "48": "img/icon_inactive.png" },
                tabId: tabId
            });
        }
    }
});