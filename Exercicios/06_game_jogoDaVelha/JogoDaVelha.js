var nomeJogador1, nomeJogador2;
var sinalJogador1;
var opcaoSelecionada1, opcaoSelecionada2;
var divJogadores = document.getElementById('opcoesJogo');
var vezDoJogador1 = true;
var podeJogar = false;
var valorCampoJogo;
function setarOpcao(valor){
    opcaoSelecionada1 = valor;
}

function verificarNomes(){
    var campoTexto1 = document.getElementById('primeiroJogador');
    var campoTexto2 = document.getElementById('segundoJogador');
    if (campoTexto1.value != '' && campoTexto2.value != '' && opcaoSelecionada1 != undefined){
        nomeJogador1 = campoTexto1.value;
        nomeJogador2 = campoTexto2.value;
        campoTexto1.value = '';
        campoTexto2.value = ''
        var textoOpcoes = 'Jogador 1 é: ' + nomeJogador1 + ', jogador 2 é: ' + nomeJogador2 + ', Jogador 1 escolheu: ' + opcaoSelecionada1;
        document.getElementById('conteudoInicial').style.visibility = 'hidden';
        document.getElementById('opcoesJogo').textContent = '';
        document.getElementById('opcoesJogoFinal').textContent = textoOpcoes;
        podeJogar = true;
        if (opcaoSelecionada1 == 'X'){
            opcaoSelecionada2 == 'O';
        }else{
            opcaoSelecionada2 = 'X';
        }
    }else
    {
        var textoOpcoesErro = 'Por favor selecione um nome para cada jogador, e selecione o símbolo do jogador 1'
        document.getElementById('opcoesJogo').textContent = textoOpcoesErro;
    }
}

function resetar(){
    document.getElementById('conteudoInicial').style.visibility = 'visible';
    nomeJogador1 = '';
    nomeJogador2 = '';
    opcaoSelecionada = undefined;
    document.getElementById('opcoesJogo').textContent = '';
}

function jogar(idBotaoClicado){
    if (podeJogar){
        if (vezDoJogador1){
            var botaoClicado = document.getElementById(idBotaoClicado);
            botaoClicado.textContent = opcaoSelecionada1;
            botaoClicado.removeAttribute('onclick');
        }
    }
}