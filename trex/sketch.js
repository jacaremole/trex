var JOGANDO = 1;
var ENCERRAMENTO = 0;

var estadodojogo = JOGANDO;
var trex, trex_correndo,trexparado;
var solo, soloinvisivel, imagemdosolo;
var gameover,imggameover
var restart,imgrestart
var somcheckpoint,sommorte,sompulo

var nuvem, grupodenuvens, imagemdanuvem;

var obstaculo, imagemObstaculo1,imagemObstaculo2,imagemObstaculo3,imagemObstaculo4,imagemObstaculo5,imagemObstaculo6,grupodeobstaculos

var pontuacao=0


var novaimagem;

function preload(){
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexparado = loadAnimation("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
 
 imagemObstaculo1=loadImage("obstacle1.png")
 imagemObstaculo2=loadImage("obstacle2.png")
 imagemObstaculo3=loadImage("obstacle3.png")
 imagemObstaculo4=loadImage("obstacle4.png")
 imagemObstaculo5=loadImage("obstacle5.png")
 imagemObstaculo6=loadImage("obstacle6.png")
  
 imgrestart = loadImage("restart.png")
  
 imggameover = loadImage("gameOver.png")
 
  //carregar sons
  sompulo = loadSound("jump.mp3")
  sommorte= loadSound("die.mp3")
  somcheckpoint = loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("colidiu",trexparado)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  grupodenuvens = new Group();
  
  grupodeobstaculos = new Group();
  
  //server para ver a hitbox e outras coisas e ajuda a arrumar problemas no trex
  //trex.debug=true
  
  
  //modela a hitbox do trex
  //trex.setCollider("rectangle",50,0,200,100)
  trex.setCollider("circle",0,0,50)
  
  gameover= createSprite(290,40,30,30);
  gameover.addImage(imggameover);
  gameover.scale=0.6;
  
  restart = createSprite(290,100,30,30);
  restart.addImage(imgrestart);
  restart.scale=0.5
  
}

function draw() {
  background(180);
  text("pontuaçao: "+ pontuacao,500,30)
  
  trex.collide(soloinvisivel);
  
  if(estadodojogo===JOGANDO){
    solo.velocityX = -(6+pontuacao/300);
    
    pontuacao=pontuacao+Math.round(frameCount/60)
    
     if (solo.x < 0){
      solo.x = solo.width/2;
  }
   
     if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -13;
       sompulo.play();
  }
   
    trex.velocityY = trex.velocityY + 0.8
    
    gerarNuvens();
    gerarObstaculos();
    
    restart.visible=false;
    gameover.visible=false;
    
    //check point e seu som
    if(pontuacao%400 === 0 && pontuacao!==0){
     somcheckpoint.play();
     
     
    }
    
    if(grupodeobstaculos.isTouching(trex)){
     estadodojogo = ENCERRAMENTO;
     sommorte.play();
     //trex.velocityY=-13;
  }
    
  }
  else if(estadodojogo===ENCERRAMENTO){
    solo.velocityX = 0;
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    
    trex.changeAnimation("colidiu",trexparado);
    
    grupodeobstaculos.setLifetimeEach(-1);
    grupodenuvens.setLifetimeEach(-1);
    
    restart.visible=true;
    gameover.visible=true;
    
    if(mousePressedOver(restart)){
    reset();
  }
    
  }
   
  

  
   
  drawSprites();
}

function reset(){
  estadodojogo = 1;
 
  grupodeobstaculos.destroyEach();
  grupodeobstaculos.setVelocityXEach(-1);
  
  grupodenuvens.destroyEach();
  grupodenuvens.setVelocityXEach(-1);
  
  trex.changeAnimation("running",trex_correndo);
  
  pontuacao=0;

}

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem)
    nuvem.y = Math.round(random(10,60))
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;
    
    
    //atribuir tempo de duração à variável
    nuvem.lifetime = 210
    
    //ajustando a profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    grupodenuvens.add(nuvem);
    
    }
  

  
}
function gerarObstaculos(){
  if(frameCount % 65 === 0){
   obstaculo=createSprite(600,170,20,20);
   obstaculo.velocityX=-(6+pontuacao/300);
   var aleatoriedade = Math.round(random(1,6))
   switch(aleatoriedade){
     case 1:obstaculo.addImage(imagemObstaculo1);
            break;
     case 2:obstaculo.addImage(imagemObstaculo2);
            break;
     case 3:obstaculo.addImage(imagemObstaculo3);
            break;
     case 4:obstaculo.addImage(imagemObstaculo4);
            break
     case 5:obstaculo.addImage(imagemObstaculo5);
            break;
     case 6:obstaculo.addImage(imagemObstaculo6);
            break;
     default:break;
     
   }
   // obstaculo.debug=true
   obstaculo.scale=0.5;
   obstaculo.lifetime=160;
  
    grupodeobstaculos.add(obstaculo);
    
    
    
  }
  
}