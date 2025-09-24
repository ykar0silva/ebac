

class ContaBancaria {
    #saldo;
    constructor() {
        this.#saldo = 0;
    }

    depositar(valor) {
        if (valor > 0) {
            this.#saldo += valor;
            return true;
        }
        return false;
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.#saldo) {
            this.#saldo -= valor;
            return true;
        }
        return false;
    }

    getSaldo() {
        return this.#saldo;
    }
}

class CaixaEletronico {
    constructor(conta) {
        this.conta = conta;
    }

    depositar() {
        const valorDeposito = parseFloat(document.getElementById("valorDeposito").value);
        if (this.conta.depositar(valorDeposito)) {
            this.mostrarSaldo();
        } else {
            console.log("Valor inválido para depósito");
        }
    }
    sacar() {
        const valorSaque = parseFloat(document.getElementById("valorSaque").value);
        if (this.conta.sacar(valorSaque)) {
            this.mostrarSaldo();
        } else {
            document.getElementById("aviso").textContent = "Saldo insuficiente ou valor inválido para saque";
        }
    }

    mostrarSaldo() {
        document.getElementById("saldo").textContent = `Saldo: R$${this.conta.getSaldo().toFixed(2)}`;
    }
}
const minhaConta = new ContaBancaria();
const caixa = new CaixaEletronico(minhaConta);              