const mario = document.querySelector(".mario"); 
const tubo = document.querySelector(".tubo");
const gameover = document.querySelector(".gameover");
const btnreiniciar = document.querySelector(".reiniciar");

let loopId;

// Função para fazer o Mário pular
const jump = () => { 
    // Só pula se ele já não estiver pulando
    if (!mario.classList.contains("pular")) {
        mario.classList.add("pular"); 
        setTimeout(() => { 
            mario.classList.remove("pular"); 
        }, 600);
    }
}

// Função que monitora o jogo e checa a colisão
const iniciarLoop = () => {
    loopId = setInterval(() => {
        const tuboposicao = tubo.offsetLeft;
        // Pega a altura atual do Mario em relação ao chão
        const marioposicao = +window.getComputedStyle(mario).bottom.replace("px", "");
        
        // REGRAS DE COLISÃO (Ajustadas para o tamanho de 150px do Mario)
        if (tuboposicao <= 150 && tuboposicao > 50 && marioposicao < 70) {
            
            // Para a animação do tubo onde ele colidiu
            tubo.style.animation = 'none';
            tubo.style.left = `${tuboposicao}px`;

            // Para o Mario onde ele colidiu
            mario.style.animation = 'none';
            mario.style.bottom = `${marioposicao}px`;

            // Altera a imagem do Mario para Game Over
            mario.src = "./imagens/game-over.png";
            mario.style.width = '75px';
            mario.style.marginLeft = '45px';
            
            // Mostra a tela cinza com o botão reiniciar
            gameover.style.visibility = 'visible';

            // Para este loop
            clearInterval(loopId);
        }
    }, 10);
}

// Função para reiniciar o jogo quando clicar no botão
const restart = () => {
    gameover.style.visibility = 'hidden';
    
    // Reseta o tubo
    tubo.style.animation = "tubo_animado 1.5s infinite linear";
    tubo.style.left = "";
    
    // Reseta o Mario
    mario.src = "./imagens/mario.gif";
    mario.style.width = '150px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '0px';
    mario.style.animation = "";
    
    // Limpa qualquer loop antigo e inicia um novo jogo
    clearInterval(loopId);
    iniciarLoop();
}

// Inicia o jogo pela primeira vez
iniciarLoop();

// Ouvintes de eventos (Cliques e Teclado)
btnreiniciar.addEventListener("click", restart);
document.addEventListener("keydown", jump); // Qualquer tecla faz pular
document.addEventListener("touchstart", jump); // Toque na tela (para celular) também faz pular