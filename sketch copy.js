

const LARGURA = 800;
const ALTURA = 600;

let tela = 0;
let frameAnimacao = 0;
let imagens = [];

let cores = [];

let posicaoSubmarino = 0;
let disparosRestantes = 3;
let acertou = false;

let musicaVitoria;
let musicaDerrota;
let audioLiberado = false;
let vinhetaImagem;



function preload() {
  imagens[0] = loadImage('asserts/submarino1.png');
  imagens[1] = loadImage('asserts/submarino2.png');
  imagens[2] = loadImage('asserts/submarino3.png');
  imagens[3] = loadImage('asserts/submarino4.png');
  imagens[4] = loadImage('asserts/submarino5.png');
  
  musicaVitoria = loadSound('asserts/vitoria.mp3');
  musicaDerrota = loadSound('asserts/derrota.mp3');
  
  vinhetaImagem = loadImage('asserts/vinheta_lop.png');
}




function setup() {
  createCanvas(LARGURA, ALTURA);
  
  for (let i = 0; i < 20; i++) {
    cores[i] = color(180); // cinza base
  }
  
  posicaoSubmarino = floor(random(0, 18));
}




function draw() {
  if (tela == 0) {
    background(40);
    let indiceImagem = floor(frameAnimacao / 20) % imagens.length;
    image(imagens[indiceImagem], 0, 0, LARGURA, ALTURA);
    
    frameAnimacao = frameAnimacao + 1;

    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 220, 40, 440, 60, 10);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("BATALHA NAVAL", LARGURA / 2, 70);
    
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 100, ALTURA - 90, 200, 50, 10);
    
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Clique para começar", LARGURA / 2, ALTURA - 65);
    
    if (vinhetaImagem) {
      image(vinhetaImagem, 0, 0, LARGURA, ALTURA);
    }
    
    
  } else if (tela == 1) {
    background(25);
    
    
    // pulso de tensão
    let cicloPulso = frameCount % 120;
    let fatorPulso;
    
    if (cicloPulso < 60) fatorPulso = cicloPulso / 60;
    else fatorPulso = (120 - cicloPulso) / 60;
    
    let pulso = 60 + fatorPulso * 100;
    fill(0, 0, 0, pulso);
    rect(0, 0, width, height);
    
    
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 200, 10, 400, 50, 10);
    
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("BATALHA NAVAL", LARGURA / 2, 35);
    
    
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 300, 80, 600, 70, 10);
    
    
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Clique em uma das 20 casas para atirar!", LARGURA / 2, 105);
    text("O submarino ocupa 3 casas consecutivas", LARGURA / 2, 135);
    
    fill(120, 120, 120, 220);
    rect(LARGURA / 2 - 180, 170, 360, 45, 10);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Disparos restantes: " + disparosRestantes, LARGURA / 2, 192);
    
    let cicloAlerta = frameCount % 100;
    let fatorAlerta;
    if (cicloAlerta < 50) {
      fatorAlerta = cicloAlerta / 50;
    } else {
      fatorAlerta = (100 - cicloAlerta) / 50;
    }
    let alertaPulso = 160 + fatorAlerta * 90;
    fill(alertaPulso);
    
    let larguraCasa = LARGURA * 0.04;
    let alturaCasa = ALTURA * 0.1;
    let espacamento = LARGURA * 0.003;
    let inicioX = (LARGURA - (larguraCasa + espacamento) * 20) / 2;
    let y = ALTURA * 0.7;
    let totalLargura = (larguraCasa + espacamento) * 20 - espacamento;
    let bordaR = 80 + pulso * 0.3;
    let bordaG = 120 + pulso * 0.2;
    let bordaB = 200;
    fill(bordaR, bordaG, bordaB, 200);
    rect(inicioX - 8, y - 8, totalLargura + 16, alturaCasa + 16, 6);
    
    for (let i = 0; i < 20; i++) {
      let x = inicioX + i * (larguraCasa + espacamento);
      
      fill(40);
      rect(x - 2, y - 2, larguraCasa + 4, alturaCasa + 4, 4);
      
      fill(cores[i]);
      rect(x, y, larguraCasa, alturaCasa, 3);
      
      fill(255);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(i + 1, x + larguraCasa / 2, y + alturaCasa / 2);
    }
    
    if (acertou || disparosRestantes == 0) {
      image(imagens[0], 0, 0, LARGURA, ALTURA);
    }
    
    if (vinhetaImagem) {
      image(vinhetaImagem, 0, 0, LARGURA, ALTURA);
    }
    
  } else if (tela == 2) {
    background(10, 20, 40);
    
    let raioExplosao = 80 + (sin(frameCount * 0.1) + 1) * 60;
    let brilho = 150 + (sin(frameCount * 0.2) + 1) * 50;
    
    for (let r = raioExplosao; r > 0; r = r - 8) {
      let proporcao = 1;
      if (raioExplosao != 0) {
        proporcao = r / raioExplosao;
      }
      let alphaExplosao = 255 * proporcao;
      fill(255, brilho, 0, alphaExplosao);
      ellipse(LARGURA / 2, ALTURA / 2, r * 2, r * 2);
    }
    
    image(imagens[imagens.length - 1], random(-4, 4), random(-4, 4), LARGURA, ALTURA);
    
    let larguraCasaV = LARGURA * 0.04;
    let alturaCasaV = ALTURA * 0.1;
    let espacamentoV = LARGURA * 0.003;
    let inicioXV = (LARGURA - (larguraCasaV + espacamentoV) * 20) / 2;
    let yV = ALTURA * 0.7;
    let totalLarguraV = (larguraCasaV + espacamentoV) * 20 - espacamentoV;
    let bordaRV = 80 + 40;
    let bordaGV = 120 + 30;
    let bordaBV = 200;
    fill(bordaRV, bordaGV, bordaBV, 220);
    rect(inicioXV - 8, yV - 8, totalLarguraV + 16, alturaCasaV + 16, 6);
    
    for (let j = 0; j < 20; j++) {
      let xV = inicioXV + j * (larguraCasaV + espacamentoV);
      fill(40);
      rect(xV - 2, yV - 2, larguraCasaV + 4, alturaCasaV + 4, 4);
      
      let corCasaV = cores[j];
      if (j >= posicaoSubmarino && j < posicaoSubmarino + 3) {
        corCasaV = color(255, 0, 0);
      }
      fill(corCasaV);
      rect(xV, yV, larguraCasaV, alturaCasaV, 3);
      
      fill(255);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(j + 1, xV + larguraCasaV / 2, yV + alturaCasaV / 2);
    }
    
    fill(0, 0, 0, 210);
    rect(LARGURA / 2 - 260, 60, 520, 90, 18);
    
    fill(255, 230, 80);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("VITÓRIA ÉPICA!", LARGURA / 2, 95);
    
    fill(0, 0, 0, 220);
    rect(LARGURA / 2 - 300, 165, 600, 90, 16);
    
    fill(255);
    textSize(26);
    text("Você detonou o submarino inimigo!", LARGURA / 2, 195);
    textSize(18);
    text("Ele estava nas casas " + (posicaoSubmarino + 1) + " - " + (posicaoSubmarino + 3), LARGURA / 2, 225);
    
    fill(0, 0, 0, 220);
    rect(LARGURA / 2 - 200, 260, 400, 65, 14);
    
    fill(180, 255, 180);
    textSize(22);
    text("Disparos restantes: " + disparosRestantes, LARGURA / 2, 292);
    
    let brilhoBotao = 120 + (sin(frameCount * 0.25) + 1) * 60;
    fill(0, 0, 0, 220);
    rect(LARGURA / 2 - 220, ALTURA - 120, 440, 70, 20);
    
    fill(255, brilhoBotao, 120);
    textSize(22);
    text("Clique para desafiar outro submarino", LARGURA / 2, ALTURA - 85);
    
    if (vinhetaImagem) {
      image(vinhetaImagem, 0, 0, LARGURA, ALTURA);
    }
    
  } else if (tela == 3) {
    background(60);
    image(imagens[0], 0, 0, LARGURA, ALTURA);
    
    let larguraCasaP = LARGURA * 0.04;
    let alturaCasaP = ALTURA * 0.1;
    let espacamentoP = LARGURA * 0.003;
    let inicioXP = (LARGURA - (larguraCasaP + espacamentoP) * 20) / 2;
    let yP = ALTURA * 0.7;
    let totalLarguraP = (larguraCasaP + espacamentoP) * 20 - espacamentoP;
    let bordaRP = 80;
    let bordaGP = 0;
    let bordaBP = 0;
    fill(bordaRP, bordaGP, bordaBP, 220);
    rect(inicioXP - 8, yP - 8, totalLarguraP + 16, alturaCasaP + 16, 6);
    
    for (let k = 0; k < 20; k++) {
      let xP = inicioXP + k * (larguraCasaP + espacamentoP);
      fill(40);
      rect(xP - 2, yP - 2, larguraCasaP + 4, alturaCasaP + 4, 4);
      
      let corCasaP = cores[k];
      if (k >= posicaoSubmarino && k < posicaoSubmarino + 3) {
        corCasaP = color(200, 0, 0);
      }
      fill(corCasaP);
      rect(xP, yP, larguraCasaP, alturaCasaP, 3);
      
      fill(255);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(k + 1, xP + larguraCasaP / 2, yP + alturaCasaP / 2);
    }
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 220, 80, 440, 70, 10);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("GAME OVER", LARGURA / 2, 115);
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 260, 180, 520, 80, 10);
    
    fill(255);
    textSize(25);
    text("O submarino escapou!", LARGURA / 2, 210);
    textSize(18);
    text("Ele estava nas casas " + (posicaoSubmarino + 1) + " - " + (posicaoSubmarino + 3), LARGURA / 2, 240);
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 180, 280, 360, 60, 10);
    
    fill(255);
    textSize(20);
    text("Disparos restantes: " + disparosRestantes, LARGURA / 2, 310);
    
    fill(0, 0, 0, 200);
    rect(LARGURA / 2 - 200, ALTURA - 110, 400, 60, 10);
    
    fill(255);
    textSize(20);
    text("Clique para jogar novamente", LARGURA / 2, ALTURA - 80);
    
    if (vinhetaImagem) {
      image(vinhetaImagem, 0, 0, LARGURA, ALTURA);
    }
  }
}

function mouseClicked() {
  if (!audioLiberado) {
    if (typeof userStartAudio == 'function') {
      userStartAudio();
    } else if (typeof getAudioContext == 'function' && getAudioContext()) {
      if (getAudioContext().state != 'running') {
        getAudioContext().resume();
      }
    }
    audioLiberado = true;
  }
  if (tela == 0) {
    if (musicaVitoria && musicaVitoria.isPlaying()) {
      musicaVitoria.stop();
    }
    if (musicaDerrota && musicaDerrota.isPlaying()) {
      musicaDerrota.stop();
    }
    tela = 1;
  } else if (tela == 1) {
    let larguraCasa = LARGURA * 0.04; // escala com a largura da tela
    let alturaCasa = ALTURA * 0.1; // escala com a altura da tela
    let espacamento = LARGURA * 0.003; // espaçamento proporcional
    let inicioX = (LARGURA - (larguraCasa + espacamento) * 20) / 2;
    let y = ALTURA * 0.7; // posição vertical mais próxima da base
    
    for (let i = 0; i < 20; i++) {
      let x = inicioX + i * (larguraCasa + espacamento);
      
      if (mouseX > x && mouseX < x + larguraCasa && 
          mouseY > y && mouseY < y + alturaCasa) {
        
        if (red(cores[i]) == 255 || green(cores[i]) == 255) {
          return;
        }
        
        disparosRestantes = disparosRestantes - 1;
        
        if (i >= posicaoSubmarino && i < posicaoSubmarino + 3) {
          cores[i] = color(255);
          cores[posicaoSubmarino] = color(255);
          cores[posicaoSubmarino + 1] = color(255);
          cores[posicaoSubmarino + 2] = color(255);
          acertou = true;
          tela = 2;
          if (musicaVitoria) {
            musicaVitoria.play();
          }
        } else {
          cores[i] = color(0);
        }
        
        if (disparosRestantes == 0 && !acertou) {
          cores[posicaoSubmarino] = color(200);
          cores[posicaoSubmarino + 1] = color(200);
          cores[posicaoSubmarino + 2] = color(200);
          tela = 3;
          if (musicaDerrota) {
            musicaDerrota.play();
          }
        }
        
        break;
      }
    }
  } else if (tela == 2 || tela == 3) {
    if (musicaVitoria && musicaVitoria.isPlaying()) {
      musicaVitoria.stop();
    }
    if (musicaDerrota && musicaDerrota.isPlaying()) {
      musicaDerrota.stop();
    }
    tela = 0;
    frameAnimacao = 0;
    disparosRestantes = 3;
    acertou = false;
    posicaoSubmarino = floor(random(0, 18));
    
    for (let i = 0; i < 20; i++) {
      cores[i] = color(180);
    }
  }
}