document.addEventListener('DOMContentLoaded', async () => {
  const extractBtn = document.getElementById('extract-btn');
  const mensagem = document.getElementById('mensagem');

  // Obter a aba ativa no momento em que o utilizador clica na extensão
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Expressão regular para verificar se estamos na página correta do Mercos
  // Aceita qualquer número de cliente e qualquer número de pedido
  const regexUrl = /^https:\/\/app\.mercos\.com\/\d+\/pedidos\/\d+\/detalhar\/?/;

  if (tab.url && regexUrl.test(tab.url)) {
    extractBtn.disabled = false;
    mensagem.innerText = "Pronto para exportar os dados deste pedido!";
  } else {
    extractBtn.disabled = true;
    mensagem.innerText = "Navegue até aos detalhes de um pedido no Mercos para usar a extensão.";
  }

  // Ação ao clicar no botão
  extractBtn.addEventListener('click', async () => {
    extractBtn.innerText = "Gerando...";
    extractBtn.disabled = true;
    
    try {
      // 1. Injeta a biblioteca SheetJS na página
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['src/js/xlsx.full.min.js']
      });
      
      // 2. Injeta o código de extração
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['src/js/content.js']
      });
      
      extractBtn.innerText = "Concluído";
      extractBtn.style.backgroundColor = "#10b981";
      extractBtn.style.color = "white";
      
      mensagem.innerHTML = "Download iniciado";
    } catch (error) {
    
      mensagem.innerHTML = error.message;
      mensagem.style.color = "#ff0000";

    }

  });
    
});