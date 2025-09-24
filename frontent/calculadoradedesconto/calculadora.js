function calcularDesconto(){

    //entrada de dados
    let valorOriginal = document.getElementById("valor").value;
    let desconto = document.getElementById("desconto").value    ;

    //processamento
    let valorDesconto = (valorOriginal * desconto) / 100;
    let valorFinal = valorOriginal - valorDesconto;

    //saida
    document.getElementById("resultado").textContent = "Valor final: " + valorFinal;
}