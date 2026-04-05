const regexUrl = /^https:\/\/app\.mercos\.com\/\d+\/pedidos\/\d+\/detalhar\/?/;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.status === 'complete') {
        if (tab.url) {
            const isPaginaPedido = regexUrl.test(tab.url)

            if (isPaginaPedido) {
                chrome.action.setIcon({
                    path: { "48": "/src/img/icon_active.png" },
                    tabId: tabId
                }).catch(err => console.error("Erro no ícone ativo:", err));
            } else {
                chrome.action.setIcon({
                    path: { "48": "/src/img/icon_inactive.png" },
                    tabId: tabId
                }).catch(err => console.error("Erro no ícone inativo:", err));
            }
        }
    }
});