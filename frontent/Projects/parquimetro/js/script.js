
class Parquimetro {
    constructor() {
        // As regras de preço são definidas aqui, da mais cara para a mais barata.
        this.regras = [
            { valorMinimo: 3.00, tempo: 120 },
            { valorMinimo: 1.75, tempo: 60 },
            { valorMinimo: 1.00, tempo: 30 }
        ];
    }

    /**
     * Calcula o tempo e o troco com base no valor inserido.
     * @param {number} valorInserido 
     * @returns {object}
     */
    calcular(valorInserido) {
        if (isNaN(valorInserido) || valorInserido <= 0) {
            return { status: 'erro', mensagem: 'Por favor, insira um valor válido.' };
        }
        for (const regra of this.regras) {
            if (valorInserido >= regra.valorMinimo) {
                const troco = valorInserido - regra.valorMinimo;
                return {
                    status: 'sucesso',
                    tempo: regra.tempo,
                    troco: troco
                };
            }
        }

        return { status: 'erro', mensagem: 'Valor insuficiente. O mínimo é R$ 1,00.' };
    }
}

class InterfaceUsuario {
    constructor() {
        this.parquimetro = new Parquimetro();

        this.inputValor = document.getElementById('valorInput');
        this.botaoCalcular = document.getElementById('calcularBtn'); // Dê um ID ao seu botão
        this.areaResultado = document.getElementById('result');

        // Adiciona o "ouvinte de evento" ao botão
        this.botaoCalcular.addEventListener('click', () => this.processarDeposito());
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
     * @param {object} resultado - O objeto retornado pelo método parquimetro.calcular().
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
                mensagem += `<br>Seu troco é de R$ ${resultado.troco.toFixed(2)}.`;
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