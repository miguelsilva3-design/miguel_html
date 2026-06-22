const luffy = document.querySelector(".luffy"); 
const barbanegra = document.querySelector(".barbanegra");
const gameover = document.querySelector(".gameover");
const btnreiniciar = document.querySelector(".reiniciar");
const elementoContador = document.querySelector("#contador");
const modoGear = document.querySelector("#modo-gear");

let loopId;
let contadorPulos = 0;

const pularLuffy = () => { 
    if (!luffy.classList.contains("pular")) {
        luffy.classList.add("pular"); 
        
        contadorPulos++;
        elementoContador.textContent = contadorPulos;

        if (contadorPulos === 10) {
            luffy.classList.add("luffy-gear");
            barbanegra.classList.add("barbanegra-rapido");
            modoGear.style.display = "block";
        }

        setTimeout(() => { 
            luffy.classList.remove("pular"); 
        }, 500);
    }
}

const iniciarLoopJogo = () => {
    loopId = setInterval(() => {
        const barbanegraPosicao = barbanegra.offsetLeft;
        const luffyPosicao = +window.getComputedStyle(luffy).bottom.replace("px", "");
        
        if (barbanegraPosicao <= 150 && barbanegraPosicao > 50 && luffyPosicao < 70) {
            
            barbanegra.style.animation = 'none';
            barbanegra.style.left = `${barbanegraPosicao}px`;

            luffy.style.animation = 'none';
            luffy.style.bottom = `${luffyPosicao}px`;

            luffy.src = "./imagens/game-over.png";
            luffy.style.width = '75px';
            luffy.style.marginLeft = '45px';
            
            gameover.style.visibility = 'visible';

            clearInterval(loopId);
        }
    }, 10);
}

const reiniciarJogo = () => {
    gameover.style.visibility = 'hidden';
    
    contadorPulos = 0;
    elementoContador.textContent = contadorPulos;
    luffy.classList.remove("luffy-gear");
    barbanegra.classList.remove("barbanegra-rapido");
    modoGear.style.display = "none";
    
    barbanegra.style.animation = "barbanegra_animado 1.5s infinite linear";
    barbanegra.style.left = "";
    
    luffy.src = "./imagens/luffy.gif";
    luffy.style.width = '300px';
    luffy.style.bottom = '0px';
    luffy.style.marginLeft = '0px';
    luffy.style.animation = "";
    
    clearInterval(loopId);
    iniciarLoopJogo();
}

iniciarLoopJogo();
btnreiniciar.addEventListener("click", reiniciarJogo);
document.addEventListener("keydown", pularLuffy);
document.addEventListener("touchstart", pularLuffy);
