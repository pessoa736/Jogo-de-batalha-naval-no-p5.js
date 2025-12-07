
const telaW = 800
const telaH = 600
const quantidadeDeCasas = 20
const tamanhoDoSunmario = 3

const paletaDeCores=[
  "#ededed", // branco
  "#323232", //preto
  "#24a", // azul
  "#4a2", // verde
  "#a24", // vermelho
  "#989898",  // cinza
  "rgba(0,0,0,0.4)" // preto transparente
]



const tamanhoDaCasaW= telaW * (1/20) * 0.8
const tamanhoDaCasaH= telaH * 0.05
var coresDasCasas = []

var posSubmarino = 0

var sprsSubmarino = [] // 0 submarino destruido e 1 inteiro
var animSubmarino = []
var timeAnim = 0

var imgSubmarinoInteiro
var imgSubmarinoExplodido

var imagenVinheta

var musicas = [] // 0 para derrota e 1 para musica de ganhar 

var telas = 0 //// 0 anim, 1 jogo, 2 resultado
var disparosRestantes = 3


var gameBoxX = [], gameBoxY = [], gameBoxW = [], gameBoxH = [], gameBoxText = [], gameBoxTextSize = []
var numeroDeBox = 0

var boxDeResultadoX = [], boxDeResultadoY = [], boxDeResultadoW = [], boxDeResultadoH = [], boxDeResultadoText = [], boxDeResultadoTextSize = []
var numeroDeResultBox = 0




function preload() {
  animSubmarino[0] = loadImage('asserts/submarino1.png');
  animSubmarino[1] = loadImage('asserts/submarino2.png');
  animSubmarino[2] = loadImage('asserts/submarino3.png');
  animSubmarino[3] = loadImage('asserts/submarino4.png');
  animSubmarino[4] = loadImage('asserts/submarino5.png');
  
  musicas[1] = loadSound('asserts/vitoria.mp3');
  musicas[0] = loadSound('asserts/derrota.mp3');
  
  imagenVinheta = loadImage('asserts/vinheta_lop.png');
  imgSubmarinoInteiro = loadImage('asserts/submarioninteiro.png');
  imgSubmarinoExplodido = loadImage('asserts/submarionexplodido.png');
}



function setup() {
  createCanvas(telaW, telaH)
  
  for (let i= 0; i<20; i++) coresDasCasas[i] = paletaDeCores[5]; /// colocando todas as casas em cinza

  posSubmarino = floor(random(0, quantidadeDeCasas - tamanhoDoSunmario))


  // carregamento das caixas de dialogo da tela do  jogo
  let BoxI = 0

  gameBoxW[BoxI] = telaW*0.4; gameBoxH[BoxI] = telaH*0.1; gameBoxX[BoxI] = telaW/2 - gameBoxW[BoxI]/2; gameBoxY[BoxI] = telaH/8  - gameBoxH[BoxI]/2 
  gameBoxText[BoxI] = "Bem vindo a batalha naval"; gameBoxTextSize[BoxI] = 24
  BoxI++

  gameBoxW[BoxI] = telaW*0.75; gameBoxH[BoxI] = telaH*0.075; gameBoxX[BoxI] = telaW/2 - gameBoxW[BoxI]/2; gameBoxY[BoxI] = telaH*0.25  - gameBoxH[BoxI]/2 
  gameBoxText[BoxI] = "abaixo mos temos 20 posições do mar, aonde existe um submario de tamanho 3\n(ocupa 3 quadrados). Seu objetivo é acertá-lo tendo 3 disparos";  gameBoxTextSize[BoxI] = 16
  BoxI++

  gameBoxW[BoxI] = telaW*0.3; gameBoxH[BoxI] = telaH*0.08; gameBoxX[BoxI] = telaW/2 - gameBoxW[BoxI]/2; gameBoxY[BoxI] = telaH*0.85 - gameBoxH[BoxI]/2 
  gameBoxText[BoxI] = "Disparos restantes: " + disparosRestantes;  gameBoxTextSize[BoxI] = 20
  BoxI++


  numeroDeBox = floor((gameBoxH.length + gameBoxW.length + gameBoxX.length + gameBoxY.length + gameBoxText.length + gameBoxTextSize.length)/6)




  // carregamento das caixas de dialogo da tela de resultado
  BoxI = 0

  boxDeResultadoW[BoxI] = telaW*0.2; boxDeResultadoH[BoxI] = telaH*0.10; boxDeResultadoX[BoxI] = telaW/2 - boxDeResultadoW[BoxI]/2; boxDeResultadoY[BoxI] = telaH*0.175  - boxDeResultadoH[BoxI]/2 
  boxDeResultadoText[BoxI] = "Resultado"; boxDeResultadoTextSize[BoxI] = 28
  BoxI++

  boxDeResultadoW[BoxI] = telaW*0.45; boxDeResultadoH[BoxI] = telaH*0.05; boxDeResultadoX[BoxI] = telaW/2 - boxDeResultadoW[BoxI]/2; boxDeResultadoY[BoxI] = telaH*0.85  - boxDeResultadoH[BoxI]/2 
  boxDeResultadoText[BoxI] = "Clique em qualque canto para recomeçar"; boxDeResultadoTextSize[BoxI] = 18
  BoxI++

  numeroDeResultBox = floor((boxDeResultadoH.length + boxDeResultadoW.length + boxDeResultadoX.length + boxDeResultadoY.length + boxDeResultadoText.length + boxDeResultadoTextSize.length)/6)
}


function draw(){
  background(paletaDeCores[1])
  
  
  if (telas == 0) {
    for (let i=0; i<musicas.length; i++) if (musicas[i] && musicas[i].isPlaying()) musicas[i].stop();

    
    let frameAtual = floor(timeAnim/20)%5
    image(animSubmarino[frameAtual], 0,0, telaW, telaH)
    timeAnim++
    
    if (floor(timeAnim/60) >= 6) telas = 1;
    
    let w= telaW*0.3, h=telaH*0.1
    let x = telaW/2 - w/2, y = telaH*0.9 - h/2 

    fill(paletaDeCores[6])
    rect(x, y, w, h, Math.sqrt(telaH**2+telaW**2)*0.01)
    
    fill(paletaDeCores[0])
    textSize(16)
    textAlign(CENTER, CENTER)
    text("clique em qualquer canto para \npular a animação", x+w/2, y+h/2)
  
  
  } else if (telas == 1){
    
    for (let i=0; i<musicas.length; i++) if (musicas[i] && musicas[i].isPlaying()) musicas[i].stop();

    gameBoxText[2] = "Disparos restantes: " + disparosRestantes;

    /// renderizamento das caixas de texto
    for (let i = 0; i<numeroDeBox; i++){
      let x = gameBoxX[i]; let y = gameBoxY[i]; let h = gameBoxH[i]; let w = gameBoxW[i]
      let _textsize = gameBoxTextSize[i]
      
      if (x && y && h && w){
        fill(paletaDeCores[6])
        rect(x, y, w, h, Math.sqrt(telaH**2+telaW**2)*0.01)
        
        fill(paletaDeCores[0])
        textAlign(CENTER, CENTER)
        if (_textsize) textSize(_textsize);
        text(gameBoxText[i] || null, x+w/2, y+h/2)
      }
    }
    
  } else if (telas == 2) {


    // renderizamento das caixas de texto da tela de resultado
    for (let i = 0; i<numeroDeResultBox; i++){
      let x = boxDeResultadoX[i]; let y = boxDeResultadoY[i]; let h = boxDeResultadoH[i]; let w = boxDeResultadoW[i]
      let _textsize = boxDeResultadoTextSize[i]
      
      if (x && y && h && w){
        fill(paletaDeCores[6])
        rect(x, y, w, h, Math.sqrt(telaH**2+telaW**2)*0.01)
        
        fill(paletaDeCores[0])
        textAlign(CENTER, CENTER)
        if (_textsize) textSize(_textsize);
        text(boxDeResultadoText[i] || null, x+w/2, y+h/2)
      }
    }
  }

  if (telas == 1 || telas == 2){
    for (let i=0; i<20; i++){
      fill(coresDasCasas[i])
      rect(telaW/2 - tamanhoDaCasaW*(10-i), telaH*0.75, tamanhoDaCasaW, tamanhoDaCasaH)
    }

    if (telas == 2) {
      let xSub = telaW/2 - tamanhoDaCasaW*(10-posSubmarino);
      let ySub = telaH*0.75;
      let wSub = tamanhoDaCasaW * tamanhoDoSunmario;
      let hSub = tamanhoDaCasaH * 2;
      
      if (boxDeResultadoText[0] == "Vitória!") {
          if (imgSubmarinoExplodido) image(imgSubmarinoExplodido, xSub, ySub - hSub/4, wSub, hSub);
      } else {
          if (imgSubmarinoInteiro) image(imgSubmarinoInteiro, xSub, ySub - hSub/4, wSub, hSub);
      }
    }
  }

  //venheta
  image(imagenVinheta, -10, -10, telaW+20, telaH+20)
}

function mouseClicked(){
  if (telas == 0){
    telas = 1;
  } else if (telas == 1){
    for (let i=0; i<quantidadeDeCasas; i++){
      let x = telaW/2 - tamanhoDaCasaW*(10-i)
      let y = telaH*0.75
      
      if (mouseX > x && mouseX < x + tamanhoDaCasaW && mouseY > y && mouseY < y + tamanhoDaCasaH){
        if (coresDasCasas[i] != paletaDeCores[5]) return; 

        disparosRestantes--;

        if (i >= posSubmarino && i < posSubmarino + tamanhoDoSunmario){
          for(let k=0; k<tamanhoDoSunmario; k++){
             coresDasCasas[posSubmarino+k] = paletaDeCores[3]; 
          }
          telas = 2;
          if (musicas[1]) musicas[1].play();
          boxDeResultadoText[0] = "Vitória!";
        } else {
          coresDasCasas[i] = paletaDeCores[2]; 
          
          if (disparosRestantes == 0){
            telas = 2;
            if (musicas[0]) musicas[0].play();
            boxDeResultadoText[0] = "Derrota!";
            for(let k=0; k<tamanhoDoSunmario; k++){
               if (coresDasCasas[posSubmarino+k] == paletaDeCores[5]) {
                   coresDasCasas[posSubmarino+k] = paletaDeCores[4]; 
               }
            }
          }
        }
        break;
      }
    }
  } else if (telas == 2) {
    telas = 0;
    disparosRestantes = 3;
    posSubmarino = floor(random(0, quantidadeDeCasas - tamanhoDoSunmario));

    for (let i= 0; i<quantidadeDeCasas; i++) coresDasCasas[i] = paletaDeCores[5];
  }
}