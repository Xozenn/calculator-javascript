//teoricamente eu só criaria uma calculadora, então não precisaria criar uma factory function mas é pra aprender trabalhar

//Se eu preciso usar uma variável dentro do object, então é melhor criar dentro do {} as variáveis

//variáveis/atributos ficam em cima
//functions/métodos ficam em baixo

//acessar os atributos se estiverem dentro do object usar this.atributo

//tudo dentro do object são chaves (atributos, métodos), sempre que eu precisar acessar uma function por exemplo preciso usar a palavra this.function

function criaCalculadora() {
    return {
        display: document.querySelector('.display'),

        inicia() {
            //calculadora chama o cliqueBotoes
            this.cliqueBotoes();
            this.pressionaEnter();
        },

        pressionaEnter() {
            this.display.addEventListener('keypress', (e) => {
                if(e.keyCode === 13){
                    this.fazOperacao();
                }
            });
        },

        cliqueBotoes() {
            //this -> calculadora
            document.addEventListener('click', (e) => {
                //quem tá chamando essa function é o document, o this aqui dentro é document
                //para usar o this do meu object posso adicionar um bind() para minha function passando o this
                //poderia usar arrow function pq ela trava o this em quem chamou, mas aí perderia o this do document
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
            /*
            const numeroApagado = this.display.value.slice(-1);
            this.display.value = this.display.value.replace(numeroApagado, '');
            */
            //o valor dele quando apaga é o mesmo valor - o último caractere da String
            this.display.value = this.display.value.slice(0, -1);
        },

        fazOperacao() {
            //eval -> avalia oq ta na String e tenta executar a String como codigo JS
            //alert() ela executa, então é perigoso pois podem executar JS pelo eval e isso seria uma falha de segurança
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