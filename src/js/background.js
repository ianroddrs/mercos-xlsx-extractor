// Expressão regular para validar a URL (removido o '1' que estava no final causando erro de sintaxe)
const regexUrl = /^https:\/\/app\.mercos\.com\/\d+\/pedidos\/\d+\/detalhar\/?/;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        
        const isPaginaPedido = tab.url && regexUrl.test(tab.url)

        if (isPaginaPedido) {
            chrome.action.setIcon({
                path: { "48": "src/img/icon_active.png" },
                tabId: tabId
            });
        } else {
            chrome.action.setIcon({
                path: { "48": "src/img/icon_inactive.png" },
                tabId: tabId
            });
        }
    }
});