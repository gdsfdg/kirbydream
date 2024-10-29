//there's only one kirby so don't need a class

// 0 = sleep normal
// 1 = sleep happy
// 2 = sleep sad
// 3 = wake up blinking
// 4 = awake
let currentanimation = 0;
let kirbies = [];

let temporary_animation = false;
let temporary_animation_index = 0;


function showKirby(){
    if(temporary_animation){
        kirbies[temporary_animation_index].showNoAnimate();
        kirbies[temporary_animation_index].animate();
        if(kirbies[temporary_animation_index].index > kirbies[temporary_animation_index].frames){
            temporary_animation = false;
            temporary_animation_index = 0;
        }
    } else {
        kirbies[currentanimation].show();
    }
    print(currentanimation);
}

function initializeKirbies(){
    kirbies.push(new Sprite("kirby", width/5, height/1.7, undefined, [0, 1, 0, 2, 3, 2], "kirby"));
    kirbies.push(new Sprite("kirby1", width/5, height/1.7, undefined, [0, 1, 0, 2, 3, 2], "kirby"));
    kirbies.push(new Sprite("kirby2", width/5, height/1.7, undefined, [0, 1, 0, 2, 3, 2], "kirby"));
    kirbies.push(new Sprite("kirby3", width/5, height/1.7, undefined, [0, 1, 0, 2, 3, 4], "kirby2"));
    kirbies.push(new Sprite("kirby4", width/5, height/1.7));
}

function playAnimationOnce(i){
    kirbies[i].index = 0;
    temporary_animation = true;
    temporary_animation_index = i;
}

function changeAnimation(i){
    kirbies[i].index = kirbies[currentanimation].index;
    currentanimation = i;
}