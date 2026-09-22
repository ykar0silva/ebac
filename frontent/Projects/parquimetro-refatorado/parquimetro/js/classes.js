// classes.js
// Definição das classes do domínio da aplicação.

import { encontrarRegraAplicavel } from './utils.js';

export class Parquimetro {
    /**
     * @param {Array<{valorMinimo: number, tempo: number}>} regras
     */
    constructor(regras) {
        this.regras = regras;
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

        const regraAplicavel = encontrarRegraAplicavel(valorInserido, this.regras);

        if (!regraAplicavel) {
            return { status: 'erro', mensagem: 'Valor insuficiente. O mínimo é R$ 1,00.' };
        }

        const troco = valorInserido - regraAplicavel.valorMinimo;

        return {
            status: 'sucesso',
            tempo: regraAplicavel.tempo,
            troco
        };
    }
}
