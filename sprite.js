class Sprite {
    constructor(filename, x=0, y=0, scale=1, customorder=0, json_filename=undefined, speed=0.03){
        this.filename = filename;
        this.json_filename = json_filename;
        this.speed = speed;
        this.scale = scale;
        this.animation = [];
        this.index  = 0;
        this.frames = 0;

        this.x = x;
        this.y = y;

        this.customorder = customorder;

        this.spritewidth  = 0;
        this.spriteheight = 0;

        this.spritesheet;

        this.transparency = 1.0;

        this.color = color("white");

        this.setup();
    }

    setup(){
        let filepath = "sprites/" + this.filename + ".png";
        this.spritesheet = loadImage(filepath, this.setup2.bind(this));
    }

    setup2(){
        if(this.json_filename){
            let filepath = "sprites/" + this.json_filename + ".json";
            loadJSON(filepath, this.assignFromJson.bind(this));    
        } else {
            this.frames         = 2;
            this.spritewidth    = this.spritesheet.width / 2;
            this.spriteheight   = this.spritesheet.height;
            this.setup3();
        }
    }

    assignFromJson(json){
        this.frames         = json.frames;
        this.spritewidth    = json.width;
        this.spriteheight   = json.height;
        this.setup3();
    }

    setup3(){        
        let x = 0;
        let y = 0;
        for(let i = 0; i < this.frames; i++){
            let img = this.spritesheet.get(x, y, this.spritewidth, this.spriteheight);
            this.animation.push(img);
            x += this.spritewidth;
            if(x >= this.spritesheet.width){
                x = 0;
                y += this.spriteheight;
            }
        }
        this.screenResize();
        if(this.scale!=1){
            this.setScale();
        }
        if(this.customorder != 0){
            this.setCustomSpriteOrder();
        }
        this.index = random(0, this.frames-1);
    }

    setCustomSpriteOrder(){
        let new_order = [];
        for(let i = 0; i < this.customorder.length; i++){
            new_order.push(this.animation[this.customorder[i]]);
        }
        this.frames = this.customorder.length;
        this.animation = new_order;
    }

    setScale(){
        for(let i = 0; i < this.frames; i++){
            let frame = this.animation[i];
            frame.resize(frame.width*this.scale, frame.height*this.scale);
            this.animation[i] = frame;
        }
    }

    reset(col=color("white")){
        this.transparency = 1;
        this.color = col;
    }

    //resize. only 16:9 supported
    screenResize(){
        let resize_ratio = windowWidth / 3840;

        for(let i = 0; i < this.frames; i++){
            let frame = this.animation[i];
            frame.resize(frame.width*resize_ratio, frame.height*resize_ratio);
            this.animation[i] = frame;
        }
    }

    show(transparency=this.transparency, col=this.color){
        this.showNoAnimate(transparency, col);
        this.animate();
    }

    showNoAnimate(transparency=this.transparency, color=this.color){
        let index = floor(this.index) % this.frames;
        //handling
        if(this.animation[index]){
            push();
            color.setAlpha(transparency);
            tint(color, transparency);
            image(this.animation[index], this.x, this.y);
            pop();
        }
    }

    animate(){
        this.index += this.speed;
    }

    adjustTransparency(value){
        this.transparency += value;
        if(this.transparency>1)this.transparency=1;
        if(this.transparency<0)this.transparency=0;
    }

    setColor(color){
        this.color = color;
    }
}