const regexUrl = /^https:\/\/app\.mercos\.com\/\d+\/pedidos\/\d+\/detalhar\/?/;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // 1. Previne erros ao tentar mudar ícone em páginas internas do Chrome
    if (!tab.url || tab.url.startsWith('chrome://')) return;

    if (changeInfo.url || changeInfo.status === 'complete') {
        const isPaginaPedido = regexUrl.test(tab.url);

        // 2. Definimos o caminho como uma STRING simples em vez de um objeto {"48": ...}
        const iconPath = isPaginaPedido 
            ? "/src/img/icon_active.png" 
            : "/src/img/icon_inactive.png";

        chrome.action.setIcon({
            path: iconPath,
            tabId: tabId
        }).catch(err => console.error("Erro ao mudar o ícone:", err));
    }
});