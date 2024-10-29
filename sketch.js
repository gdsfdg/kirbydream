var main_graphics;
let hills = [];
let stars = [];
let starbounce = [];
let moon;
let dark;
let dreamyoverlay;
let omoribgmask;
let opacity_amount = 1;

let nonSpriteImages = [];

let dream;
let reality;

let reference_canvas;

let fadein = 1;

let awake = false;

let transition = 0;
let dreamagain;

let realsound;
let dreamsound;
let audio = false;

function preload(){
  dark = loadImage("sprites/dark.png");
  nonSpriteImages.push(dark);
  //white = loadImage("sprites/white.png");
  //nonSpriteImages.push(white);
  omoribgmask = loadImage("sprites/omoribgmask.png");
  nonSpriteImages.push(omoribgmask);
  dreamyoverlay = loadImage("sprites/dreamyoverlay.png");
  nonSpriteImages.push(dreamyoverlay);

  realsound = loadSound('sound/nature.mp3');
  dreamsound = loadSound('sound/noise.mp3');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);

  //kirby = new Sprite("kirby", width/5, height/1.7, undefined, [0, 1, 0, 2, 3, 2], "kirby");
  initializeKirbies();
  makeHills();
  makeStars(true, 50, stars);
  moon = new Sprite("moon", width*0.85, height*0.05);

  dream = new Dream();
  reality = new Dream(true);

  dreamagain = new Sprite("dreamagain", width*0.6, height*0.42);
  dreamagain.adjustTransparency(-1);

  //resize. only 16:9 supported
  let resize_ratio = windowWidth / 3840;
  for(let i=0; i<nonSpriteImages.length; i++){
    nonSpriteImages[i].resize(nonSpriteImages[i].width*resize_ratio, nonSpriteImages[i].height*resize_ratio);
  }

  reference_canvas = dream.starReferenceCanvas();
  dream.setPlanetPosition();
  //main_graphics = createGraphics(windowWidth, windowHeight);
}

function draw() {
  //if(frameCount > 25 && transition < 1){
    if(frameCount > 25 && !awake){
      fadein -= 0.01;
      dream.show();
    }
    if(awake){
      //tint(255, transition);
      //transition += 0.001;
      reality.show();
      dreamagain.show();
      dreamagain.adjustTransparency(0.0008);
    }

    // force wake up after a while
    if(frameCount > 4500 && !awake){
      wakeUp();
    }

    background(0, fadein);
    //debug
    //if(mouseY > height*0.8) image(reference_canvas, 0, 0);
}

function wakeUp(){
  for(let i=0; i<stars.length; i++) stars[i].reset();
  for(let i=0; i<hills.length; i++) hills[i].reset(color("#52B65B"));
  dreamsound.stop();
  realsound.jump(0)
  realsound.setVolume(1);
  playAnimationOnce(3);
  changeAnimation(4);
  awake = true;
}

function mousePressed(){
  if(!audio){
    realsound.play();
    dreamsound.setVolume(0);
    dreamsound.play();
    audio = true;
  }
  if(awake){
    let min_x = dreamagain.x;
    let max_x = dreamagain.x + dreamagain.spritewidth;

    let min_y = dreamagain.y;
    let max_y = dreamagain.y + dreamagain.spriteheight;

    if (mouseX > min_x && mouseX < max_x && mouseY > min_y && mouseY < max_y){ 
      window.location.reload();
    }  
  }
}