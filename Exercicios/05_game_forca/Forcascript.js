var x = 0;
var palavras = ['computador', 'celular', 'modem', 'churrasqueira', 'caderno', 'jaqueta', 'teclado', 'cavalo', 'janela', 'programacao', 'sinal', 'ventilador', 'monitor',
'notebook', 'impostor', 'mascote', 'sapato', 'dilema', 'girafa', 'separado', 'unido', 'artista', 'estacao', 'cartao', 'nave', 'prisao', 'buzina'];
var palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
var palavraCortada = palavraSelecionada.split("");
var imagem = document.getElementById('personagem');
var regexLetras = /^[a-z]$/m;
var letrasUsadas = [];
var posicao;
var acertos = 0;

for (posicao = 0; posicao < palavraCortada.length; posicao++) {
    var span = document.createElement('span');
    span.setAttribute('id', posicao);
    span.classList.add('fs-36');

    var div = document.getElementById('palavra');
    var underline = document.createTextNode(' _');
    span.appendChild(underline);
    div.appendChild(span);
}

function verificarInput(evento) {
    if (x < 6 && acertos < palavraCortada.length) {
        var ultimaLetra = evento.key.toString();
        var letraMostrar = document.createTextNode(' ' + ultimaLetra);
        var spanLetrasUsadas = document.getElementById('letrasUsadas');
        if (regexLetras.test(evento.key.toString())) {
            if (letrasUsadas.includes(ultimaLetra)) {
                console.log('já usou a letra');
            } else {
                letrasUsadas.push(ultimaLetra);
                spanLetrasUsadas.appendChild(letraMostrar);
                for (posicao = 0; posicao < palavraCortada.length; posicao++) {
                    if (evento.key === palavraCortada[posicao]) {
                        var spanLocal = document.getElementById(posicao);
                        spanLocal.textContent = ' ' + ultimaLetra;
                        acertos += 1;
                    }
                }
                if (!palavraCortada.includes(evento.key)) {
                    if (x < 6) {
                        x += 1;
                        imagem.src = 'img/' + x.toString() + '.png';
                    }
                    if (x == 6) {
                        document.getElementById('textoFimDeJogo').innerHTML = ('Você perdeu!');
                        imagem.src = 'img/' + x.toString() + '.png';
                        var textoBotao = document.createTextNode('Jogar novamente');
                        var botaoReload = document.createElement('button');
                        botaoReload.setAttribute('onclick', 'window.location.reload()');
                        document.getElementById('botaoReload').appendChild(botaoReload);
                        botaoReload.appendChild(textoBotao);
                    }
                }
            }
        }
        if (acertos == palavraCortada.length){
            document.getElementById('textoFimDeJogo').innerHTML = ('Você ganhou!');
            var textoBotao = document.createTextNode('Jogar novamente');
            var botaoReload = document.createElement('button');
            botaoReload.setAttribute('onclick', 'window.location.reload()');
            document.getElementById('botaoReload').appendChild(botaoReload);
            botaoReload.appendChild(textoBotao);
        }
    }
}
document.addEventListener('keydown', verificarInput);