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
  
});