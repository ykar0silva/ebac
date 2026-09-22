// app.js
// Código principal: conecta as classes e os utilitários à interface,
// usando addEventListener em vez de eventos inline no HTML.

import { Parquimetro } from './classes.js';
import { REGRAS, formatarMoeda, criarLinhasTabela } from './utils.js';

class InterfaceUsuario {
    constructor() {
        this.parquimetro = new Parquimetro(REGRAS);

        this.inputValor = document.getElementById('valorInput');
        this.botaoCalcular = document.getElementById('calcularBtn');
        this.areaResultado = document.getElementById('result');
        this.corpoTabela = document.getElementById('tabelaPrecosBody');

        this.renderizarTabelaPrecos();
        this.botaoCalcular.addEventListener('click', () => this.processarDeposito());
    }

    /**
     * Preenche a tabela de preços dinamicamente a partir das regras do
     * parquímetro (mesmo conteúdo que antes estava fixo no HTML).
     */
    renderizarTabelaPrecos() {
        if (this.corpoTabela) {
            this.corpoTabela.innerHTML = criarLinhasTabela(this.parquimetro.regras);
        }
    }

    /**
     * Pega o valor do input e chama o método de cálculo.
     */
    processarDeposito() {
        const valor = parseFloat(this.inputValor.value);
        const resultado = this.parquimetro.calcular(valor);
        this.exibirResultado(resultado);
    }

    /**
     * Exibe o resultado do cálculo na tela.
     * @param {object} resultado - Objeto retornado por parquimetro.calcular().
     */
    exibirResultado(resultado) {
        this.areaResultado.innerHTML = '';
        this.areaResultado.className = '';

        if (resultado.status === 'erro') {
            this.areaResultado.innerHTML = resultado.mensagem;
            this.areaResultado.classList.add('error');
        } else {
            let mensagem = `Tempo adquirido: ${resultado.tempo} minutos.`;
            if (resultado.troco > 0) {
                mensagem += `<br>Seu troco é de ${formatarMoeda(resultado.troco)}.`;
            }
            this.areaResultado.innerHTML = mensagem;
            this.areaResultado.classList.add('success');
        }
    }
}

// Inicia a aplicação quando o documento HTML estiver completamente carregado.
document.addEventListener('DOMContentLoaded', () => {
    new InterfaceUsuario();
});
