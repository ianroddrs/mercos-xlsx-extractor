document.addEventListener('DOMContentLoaded', async () => {
  const btnGerar = document.getElementById('btnGerar');
  const mensagem = document.getElementById('mensagem');

  // Obter a aba ativa no momento em que o utilizador clica na extensão
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Expressão regular para verificar se estamos na página correta do Mercos
  // Aceita qualquer número de cliente e qualquer número de pedido
  const regexUrl = /^https:\/\/app\.mercos\.com\/\d+\/pedidos\/\d+\/detalhar\/?/;

  if (tab.url && regexUrl.test(tab.url)) {
    btnGerar.disabled = false;
    mensagem.innerText = "Pronto para exportar os dados deste pedido!";
  } else {
    btnGerar.disabled = true;
    mensagem.innerText = "Navegue até aos detalhes de um pedido no Mercos para usar a extensão.";
  }

  // Ação ao clicar no botão
  btnGerar.addEventListener('click', async () => {
    try {
      btnGerar.innerText = "Gerando...";
      btnGerar.disabled = true;
      
      // 1. Injeta a biblioteca SheetJS na página
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['js/xlsx.full.min.js']
      });
      
      // 2. Injeta o código de extração
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['js/content.js']
      });
      
      btnGerar.innerText = "Concluído";
      btnGerar.style.backgroundColor = "#10b981";
      btnGerar.style.color = "white";
      
      mensagem.innerHTML = "Download iniciado";
    } catch (error) {
    
      mensagem.innerHTML = error.message;
      mensagem.style.color = "#ff0000";

    }

  });
    
});