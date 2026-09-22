// utils.js
// Funções auxiliares puras: nenhuma delas depende de estado externo
// nem manipula o DOM diretamente.

export const REGRAS = [
    { valorMinimo: 3.00, tempo: 120 },
    { valorMinimo: 1.75, tempo: 60 },
    { valorMinimo: 1.00, tempo: 30 }
];

/**
 * Dentre as regras que o valor inserido consegue pagar, encontra a de maior
 * valorMinimo (a mais vantajosa). Substitui o laço for/if original por reduce,
 * mantendo exatamente o mesmo resultado.
 * @param {number} valor
 * @param {Array<{valorMinimo: number, tempo: number}>} regras
 * @returns {{valorMinimo: number, tempo: number} | null}
 */
export function encontrarRegraAplicavel(valor, regras) {
    return regras.reduce((melhorRegra, regraAtual) => {
        const atende = valor >= regraAtual.valorMinimo;
        const ehMelhor = !melhorRegra || regraAtual.valorMinimo > melhorRegra.valorMinimo;
        return atende && ehMelhor ? regraAtual : melhorRegra;
    }, null);
}

/**
 * Formata um valor em reais com ponto decimal (mesmo formato usado
 * originalmente na mensagem de troco).
 * @param {number} valor
 * @returns {string}
 */
export function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2)}`;
}

/**
 * Formata um valor em reais com vírgula decimal (mesmo formato usado
 * originalmente na tabela de preços).
 * @param {number} valor
 * @returns {string}
 */
export function formatarMoedaTabela(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

/**
 * Gera o HTML das linhas <tr> da tabela de preços a partir do array de regras,
 * ordenadas do menor para o maior tempo, com o aviso de "tempo máximo
 * permitido" na regra de maior tempo — igual ao HTML estático original,
 * porém gerado dinamicamente a partir dos dados (find/map).
 * @param {Array<{valorMinimo: number, tempo: number}>} regras
 * @returns {string}
 */
export function criarLinhasTabela(regras) {
    const tempoMaximo = Math.max(...regras.map((regra) => regra.tempo));

    return regras
        .slice()
        .sort((a, b) => a.tempo - b.tempo)
        .map((regra) => {
            const regraDeTempoMaximo = regras.find((r) => r.tempo === tempoMaximo);
            const aviso = regra === regraDeTempoMaximo
                ? ' <span class="text-danger" style="font-size: 0.9em;">(Tempo máximo permitido)</span>'
                : '';
            return `<tr><td>${regra.tempo} minutos${aviso}</td><td>${formatarMoedaTabela(regra.valorMinimo)}</td></tr>`;
        })
        .join('');
}
