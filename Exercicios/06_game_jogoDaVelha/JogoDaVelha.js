var nomeJogador1, nomeJogador2;
var sinalJogador1;
var opcaoSelecionada1, opcaoSelecionada2;
var divJogadores = document.getElementById('opcoesJogo');
var vezDoJogador1 = true;
var podeJogar = false;
var valorCampoJogo;
var botaoClicado;

var textoFinal = document.getElementById('opcoesJogoFinal');

var casa1 = document.getElementById('11');
var casa2 = document.getElementById('12');
var casa3 = document.getElementById('13');
var casa4 = document.getElementById('21');
var casa5 = document.getElementById('22');
var casa6 = document.getElementById('23');
var casa7 = document.getElementById('31');
var casa8 = document.getElementById('32');
var casa9 = document.getElementById('33');

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
            opcaoSelecionada2 = 'O';
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
    opcaoSelecionada1 = undefined;
    document.getElementById('opcoesJogo').textContent = '';
    casa1.textContent = '';
    casa2.textContent = '';
    casa3.textContent = '';
    casa4.textContent = '';
    casa5.textContent = '';
    casa6.textContent = '';
    casa7.textContent = '';
    casa8.textContent = '';
    casa9.textContent = '';
    textoOpcoes = '';
    document.getElementById('opcoesJogoFinal').textContent = '';
    casa1.onclick = function() {jogar('11'); checarVitoria();};
    casa2.onclick = function() {jogar('12'); checarVitoria();};
    casa3.onclick = function() {jogar('13'); checarVitoria();};
    casa4.onclick = function() {jogar('21'); checarVitoria();};
    casa5.onclick = function() {jogar('22'); checarVitoria();};
    casa6.onclick = function() {jogar('23'); checarVitoria();};
    casa7.onclick = function() {jogar('31'); checarVitoria();};
    casa8.onclick = function() {jogar('32'); checarVitoria();};
    casa9.onclick = function() {jogar('33'); checarVitoria();};
    podeJogar = false;
    vezDoJogador1 = true;
}

function jogar(idBotaoClicado){
    if (podeJogar){
        if (vezDoJogador1){
            botaoClicado = document.getElementById(idBotaoClicado);
            //botaoClicado.appendChild(document.createTextNode(opcaoSelecionada1));
            botaoClicado.textContent = opcaoSelecionada1;
            botaoClicado.removeAttribute('onclick');
            vezDoJogador1 = false;
        }else{
            botaoClicado = document.getElementById(idBotaoClicado);
            //botaoClicado.appendChild(document.createTextNode(opcaoSelecionada2));
            botaoClicado.textContent = opcaoSelecionada2;
            botaoClicado.removeAttribute('onclick');
            vezDoJogador1 = true;
        }
    }
}

function checarVitoria(){
    if (casa1.textContent == casa2.textContent && casa2.textContent == casa3.textContent && casa1.textContent != ''){
        if (casa1.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
    if (casa4.textContent == casa5.textContent && casa5.textContent == casa6.textContent && casa4.textContent != ''){
        if (casa4.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }
    }
    if (casa7.textContent == casa8.textContent && casa8.textContent == casa9.textContent && casa7.textContent != ''){
        if (casa7.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
    if (casa1.textContent == casa4.textContent && casa4.textContent == casa7.textContent && casa1.textContent != ''){
        if (casa1.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
    if (casa2.textContent == casa5.textContent && casa5.textContent == casa8.textContent && casa2.textContent != ''){
        if (casa2.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
    if (casa3.textContent == casa6.textContent && casa6.textContent == casa9.textContent && casa3.textContent != ''){
        if (casa3.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
    if (casa1.textContent == casa5.textContent && casa5.textContent == casa9.textContent && casa1.textContent != ''){
        if (casa1.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
    if (casa3.textContent == casa5.textContent && casa5.textContent == casa7.textContent && casa3.textContent != ''){
        if (casa2.textContent == opcaoSelecionada1){
            textoFinal.textContent = 'Jogador 1 venceu';
        }else{
            textoFinal.textContent = 'Jogador 2 venceu';
        }
    }
}