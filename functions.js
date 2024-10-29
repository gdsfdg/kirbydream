// cred https://digitalsynopsis.com/design/minimal-web-color-palettes-combination-hex-code/
let color_palettes = [
    ["#F8B195", "#F67280", "#6C5B7B", "#355C7D"],
    ["#99B898", "#FECEAB", "#E84A5F", "#2A363B"],
    ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FF8C94"],
    ["#A8A7A7", "#CC527A", "#E8175D", "#363636"],
    ["#A7226E", "#EC2049", "#F7DB4F", "#2F9599"],
    ["#E1F5C4", "#F9D423", "#FC913A", "#FF4E50"],
    ["#E5FCC2", "#9DE0AD", "#547980", "#594F4F"],
    ["#FE4365", "#FC9D9A", "#F9CDAD", "#83AF9B"]
]

function getRandomColorPalette(array){
    let chosen_palette = color_palettes[floor(random(0, color_palettes.length-1))];

    for(let i=0; i<4; i++){
        array.push(color(chosen_palette[i]));
    }
}

function makeHills(){
    let col = color("#52B65B");
    for(let i=1; i<4; i++){
      let filenamestring = "hills" + i;
      let hill = new Sprite(filenamestring, 0, 0, undefined, undefined, "fullscreen");
      hill.color = col;
      hills.push(hill);
    }
}
  
function makeStars(sky, amount, array){
    let xoff = 0.0;
    let yoff = 10.0;
    for(let i=0; i<amount; i++){
        let starsprite = floor(random(0.5, 6.5));
        let filenamestring = "stars" + starsprite;

        //let pos = starPos(xoff, yoff);
        let pos;
        if(sky) pos = randomStarPos();
        else    pos = randomStarPosWholeCanvas();
        
        let star = new Sprite(filenamestring, pos[0], pos[1], random(0.5, 1.1));
        //star.setColor(color("#FFE300"));
        //let bounce = new Bounce(star);
        array.push(star);
        //starbounce.push(bounce);
        xoff += 0.3;
        yoff += 0.3;
    }
}

function makeSpriteSet(name, count, array, repeat=0){
    for(let j=0; j<repeat+1; j++){
        for(let i=1; i<count+1; i++){
            let filenamestring = name + i;
            let sprite = new Sprite(filenamestring);
            array.push(sprite);
        }
    }
    return array; 
}
  
function randomStarPos(){
    let xpos = random(0, width);
    let ypos;
    if(xpos<width/3) ypos = random(0, height*0.45);
    else ypos = random(0, height*0.27);
    return[xpos, ypos];
}

function randomStarPosWholeCanvas(){
    let xpos = random(0, width);
    let ypos;
    if(xpos<width/3) ypos = random(height*0.45, height);
    else ypos = random(height*0.29, height);
    return[xpos, ypos];
}

//Unused
function makeSpace(array){
    for(let i=1; i<5; i++){
        let filenamestring = "space" + i;
        let space = new Sprite(filenamestring);
        space.adjustTransparency(-1);
        let mover = new Mover(space);

        array.push(mover);
    }
    return array;
}

function starPos(xoff, yoff){
    let xpos = noise(xoff) * width*1.5 - width/4;
    let ypos;
    if(xpos<width/3) ypos = noise(yoff) * height - height/4;
    else ypos = noise(yoff) * height - height/2;
    print(ypos);
    return [xpos, ypos];
}

function starbounceStuff(){
    if(frameCount>200){
        starbounce[i].activate();
    }
    if (starbounce[i].contactEdge()) {
        //{!5 .bold}
        let c = 0.1;
        let friction = starbounce[i].velocity.copy();
        friction.mult(-1);
        friction.setMag(c);

        //{!1 .bold} Apply the friction force vector to the object.
        starbounce[i].applyForce(friction);
    }
    starbounce[i].bounceEdges();
    starbounce[i].update();
}