function exportarDados() {
    const dadosParaExcel = [];
    const linhas_da_tabela = document.querySelectorAll("#tabela_itens_pedido tbody tr.dados_item");

    if (linhas_da_tabela.length === 0) {
        throw new Error("Erro: Nenhum item encontrado na tabela de pedidos.");
    }

    linhas_da_tabela.forEach(linha => {
        let tds = linha.querySelectorAll('td');
        if(tds.length >= 4) {
            let codigo = tds[1].innerText.trim();
            let qtd = tds[3].innerText.trim();

            dadosParaExcel.push({
                "sku": codigo,
                "quantidade": Number(qtd) // Converte para número real no Excel
            });
        }
    });

    // Verifica se a biblioteca SheetJS (XLSX) carregou corretamente
    if (typeof XLSX !== 'undefined') {
        const worksheet = XLSX.utils.json_to_sheet(dadosParaExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Itens");
        
        // Tenta capturar o número do pedido no URL para dar nome ao ficheiro
        let nomeFicheiro = "Pedido_Mercos";
        const match = window.location.href.match(/pedidos\/(\d+)\/detalhar/);
        if (match && match[1]) {
            nomeFicheiro += "_" + match[1];
        }

        XLSX.writeFile(workbook, `${nomeFicheiro}.xlsx`);
    } else {
        throw new Error("Erro: Biblioteca Excel não carregada.");
    }
}

// Executa a função imediatamente ao ser injetada na página
exportarDados();