function criaCalculadora() {
    return {
        display: document.querySelector('.display'),

        inicia() {
            this.cliqueBotoes();
            this.pressionaEnter();
        },

        pressionaEnter() {
            this.display.addEventListener('keypress', (e) => {
                if (e.keyCode === 13) {
                    this.fazOperacao();
                }
            });
        },

        cliqueBotoes() {
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.classList.contains('btn-num')) {
                    this.adicionaNoInput(el.innerText);
                }

                if (el.classList.contains('btn-clear')) {
                    this.limpaInput();
                }

                if (el.classList.contains('btn-deletar')) {
                    this.apagaNumero();
                }

                if (el.classList.contains('btn-resultado')) {
                    this.fazOperacao();
                }
            });
        },

        adicionaNoInput(valor) {
            this.display.value += valor;
        },

        limpaInput() {
            this.display.value = '';
        },

        apagaNumero() {
            this.display.value = this.display.value.slice(0, -1);
        },

        fazOperacao() {
            let conta = this.display.value;
            try {
                conta = eval(conta);

                if (!conta) {
                    alert('conta inválida');
                    return;
                }

                this.display.value = String(conta);
            } catch (e) {
                alert('ocorreu um erro');
                return;
            }
        }
    };
}
const calculadora = criaCalculadora();
calculadora.inicia();