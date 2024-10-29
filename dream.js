class Dream{
    constructor(reality=false){
        this.reality = reality;

        //Variables to shape the dream
        this.noground = 0;
        this.clouds = 0;
        this.omori = 0;
        this.uboasprite;

        //Shared variables between dreams
        this.fade_out_overlay = false;

        //Transition variables
        //this.transition_finish = 0;
        this.ground_opacity = 1;
        this.transition = 1;
        this.tint_amount = 0;

        //Storage for dream assets
        this.special_array = [];
        this.special_array2 = [];
        this.j = 0;
        this.l = 0;
        this.bool = true;
        this.special_sprite;
        this.specialvar;

        this.kirby_expression = false;

        this.color_palette = [];

        this.setup();
    }

    setup(){

        if(this.reality) return;

        //this.assignVariable();
        //this.assignVariable();

        this.assignVariablePepega();
        
        if(random()>0.95){
            this.uboasprite = new Sprite("uboa", width*0.75, height*0.36);
            this.uboasprite.adjustTransparency(-1);
        }

        print("noground: " + this.noground);
        print("clouds: " + this.clouds);
        print("omori: " + this.omori);

        this.fade_out_overlay = true;

        getRandomColorPalette(this.color_palette);

        //Special Scenarios
        //Space Scenario
        if(this.noground>0){
            if(this.omori == 0){
                makeStars(false, 100, this.special_array);
                for(let i = 0; i<this.special_array.length; i++){
                    this.special_array[i].adjustTransparency(-1);
                }    
            }

            if(this.noground==2){
                this.fade_out_overlay = true;

                this.special_sprite = new Sprite("space");
                this.special_sprite.adjustTransparency(-1);
                
                makeSpriteSet("planet", 5, this.special_array2);    
            }
        }

        //Clouds Scenario
        if(this.clouds==2){
            this.fade_out_overlay = true;

            this.special_sprite = new Sprite("clouds");
            this.special_sprite.adjustTransparency(-1);

            makeStars(false, 100, this.special_array);
            let color_table = [color("#FF2554"), color(0, 0, 100), color("#FFE058")]
            for(let i = 0; i<this.special_array.length; i++){
                this.special_array[i].adjustTransparency(-1);
                this.special_array[i].color = color_table[floor(random(0, 2.9999))];
            }
            for(let i=0; i<stars.length; i++){
                this.special_array2.push(color_table[floor(random(0, 2.9999))]);
            }
            
        }

        if(this.clouds == 1){
            makeSpriteSet("cloud", 5, this.special_array2);
            makeSpriteSet("cloud", 5, this.special_array2);
            if(this.omori > 0) this.special_array2.push(new Sprite("cloudmewo"));
            if(this.noground > 0) makeSpriteSet("cloudstar", 2, this.special_array2);

            for(let i=0; i<this.special_array2.length; i++){
                this.special_array2[i].x = random(-width, 0);
                let lower_limit = height*0.5;
                if(this.noground == 1) lower_limit = height*0.9;
                this.special_array2[i].y = random(-height*0.1, lower_limit);
                let mover = new Mover(this.special_array2[i], random(width*0.0001, width*0.0004));
                this.special_array2[i] = mover;
            }
        }

        //Omori Scenario
        if(this.omori>0){
            if(this.omori==2){
                this.fade_out_overlay = true;
                this.special_sprite = new Sprite("omoriscenery");
                this.special_sprite.adjustTransparency(-1);
                this.color_palette = [color("#BE83F9"), color("#FEEF9A"), color("#FED8FF")];
            }

            makeSpriteSet("omori_star", 3, this.special_array, 30);
            makeSpriteSet("omori_sky", 11, this.special_array, 3);
            for(let i = 0; i<this.special_array.length; i++){
                this.special_array[i].x = random(0, width);
                this.special_array[i].y = random(0, height);
                this.special_array[i].adjustTransparency(-1);
            }

        }
    }

    assignVariable(){
        let variable = random(0, 3);
        print(variable);
        if(variable==3) variable -= - 0.1;
        if(variable>=0 && variable<1) this.noground++;
        if(variable>=1 && variable<2) this.clouds++;
        if(variable>=2 && variable<3) this.omori++;
    }

    assignVariablePepega(){
        let variable = random(0, 6);
        print(variable);
        if(variable==3) variable -= - 0.1;
        if(variable>=0 && variable<1) this.noground = 2;
        if(variable>=1 && variable<2) this.clouds = 2;
        if(variable>=2 && variable<3) this.omori = 2;

        if(variable>=3 && variable<4){
            this.noground = 1;
            this.clouds = 1;
        }
        if(variable>=4 && variable<5){
            this.clouds = 1;
            this.omori = 1;
        }
        if(variable>=5 && variable<6){
            this.noground = 1;
            this.omori = 1;
        }
    }

    lighting(){
        push();
        blendMode(HARD_LIGHT);
        let overlay_fade = 1;
        if(this.fade_out_overlay){
            overlay_fade = this.transition;
        }
        if(this.noground>0) this.tint_amount +=0.01;
        /*
        if(this.clouds==2){
            if(this.transition>0) this.specialvar = 1-this.transition;
            else if(this.specialvar > 0.5) this.specialvar -= 0.0001;
            push();
            tint(255, this.specialvar);
            image(dreamyoverlay, 0, 0);
            pop();
        }
        */
        tint(100, this.tint_amount, 100, overlay_fade);
        image(dark, 0, 0);
        pop();
    }

    ground(){
        if(this.noground>0 || this.clouds==2){
            hills[2].adjustTransparency(-0.001);
            if(hills[2].transparency<0.4){
                hills[0].adjustTransparency(-0.001);
                hills[1].adjustTransparency(-0.001);
            }
        }

        for(let i=0; i<hills.length; i++){
            let col = color("#52B65B");
            push();
            if(!this.reality) col = lerpColor(color("#52B65B"), this.color_palette[i], 1-this.transition);
            hills[i].show(undefined, col);
            pop();
        }

        if(this.omori==2){
            this.special_sprite.show();
            this.special_sprite.adjustTransparency(0.0006);
        }
    }

    backgroundLayer(){
        //space
        if(this.noground>0){
            //space fog
            if(this.noground == 2){
                this.special_sprite.adjustTransparency(0.0006);
                this.special_sprite.show();    
            }
            //stars
            if(this.omori == 0){
                this.fillScreenStars();
            }
            //planets
            if(this.noground == 2){
                if(this.transition < 0.3){
                    for(let i=0; i<this.special_array2.length; i++){
                        if(this.l < this.special_array2.length){
                            this.special_array2[floor(this.l)].adjustTransparency(0.0003);
                            this.l += 0.0003;
                        }
                        this.special_array2[i].show();
                    }    
                }    
            }
        }

        //cloud world
        if(this.clouds == 2){
            //stars
            this.fillScreenStars();
            for(let i=0; i<stars.length; i++){
                stars[i].show(1-this.transition, this.special_array2[i]);
            }

            //clouds
            this.special_sprite.adjustTransparency(0.0006);
            this.special_sprite.show();

            //add new overlay in overlay function.
        }

        if(this.omori>0){
            this.fillScreenStars();
            if(this.omori==2){
                push();
                tint(255, 1-this.transition);
                image(omoribgmask, 0, 0);
                pop();    
            }
        }
    }

    stars(){
        let opacity = 1;
        if(this.clouds == 2 || this.omori > 0) opacity = this.transition;
        for(let i=0; i<stars.length; i++){
          stars[i].show(opacity);
        }
        moon.show(opacity);
    }

    fillScreenStars(){
        for(let i = 0; i<this.special_array.length; i++){
            let interval;
            if(this.transition < 0.5) interval = 0.0005;
            else interval = 0.0001;

            if(this.j < this.special_array.length){
                this.special_array[floor(this.j)].adjustTransparency(interval);
                this.j += interval;
            }
            this.special_array[i].show();    
        }
    }

    drawBackground(){
        let col = color(255);
        if(this.color_palette[3]) col = this.color_palette[3];
        if(this.noground==2)    col=color(0);
        if(this.clouds==2)      col=color("#0785C4"); //Blue
        if(this.omori==2)       col=color("#6C0EFF"); //Purple

        col.setAlpha(1-this.transition);

        background(255);
        background(col);
    }

    show(){
        this.drawBackground();
        this.backgroundLayer();
        this.ground();
        showKirby();
        if(this.transition < 0.1 && !this.kirby_expression && (this.noground == 2 || this.clouds == 2 || this.omori == 2)) changeAnimation(1);
        this.uboa();
        this.lighting();
        this.stars();
        this.cloudz();

        realsound.setVolume(this.transition);
        dreamsound.setVolume(1-this.transition);
        this.transition -= 0.0005;
        if(this.transition<=0) this.transition = 0;
    }

    cloudz(){
        if(this.clouds == 1){
            for(let i=0; i<this.special_array2.length; i++){ this.special_array2[i].moveshow(); }
        }
    }

    uboa(){
        if(this.uboasprite){
            this.uboasprite.adjustTransparency(0.005);
            this.uboasprite.show();
            if(this.transition < 0.6 && !this.kirby_expression) changeAnimation(2);
        }
    }

    tintTransition(col=255){
        tint(col, 1-this.transition);
    }

    //so long!!! put in seperate file???
    starReferenceCanvas(){
        if(this.noground!=2) return;

        let radius = width*0.12;
        let halfradius = 0;

        let reference_canvas = createGraphics(windowWidth, windowHeight);
        reference_canvas.background(0);

        reference_canvas.noStroke();
        reference_canvas.fill(255);

        for(let i = 0; i<this.special_array.length; i++) reference_canvas.ellipse(this.special_array[i].x+halfradius, this.special_array[i].y+halfradius, radius);
        for(let i=0; i<stars.length; i++) reference_canvas.ellipse(stars[i].x+halfradius, stars[i].y+halfradius, radius);

        //don't spawn planets on border.
        let border_width = height*0.1;
        reference_canvas.rect(0, 0, width, border_width);
        reference_canvas.rect(0, 0, border_width, height);
        reference_canvas.rect(0, height-border_width, width, border_width);
        reference_canvas.rect(width-border_width, 0, border_width, height);

        //dont spawn on moon...
        reference_canvas.fill("pink");
        let moonradius = moon.spritewidth/2;
        reference_canvas.ellipse(moon.x + moonradius, moon.y + moonradius, moonradius*1.2);

        //don't spawn on kirby
        let kirbyradius = kirbies[currentanimation].spritewidth/2;
        reference_canvas.ellipse(kirbies[currentanimation].x + kirbyradius, kirbies[currentanimation].y + kirbyradius, kirbyradius*1.2);

        return reference_canvas;
    }

    setPlanetPosition(){
        if(this.noground!=2) return;
        let planet_array = this.special_array2;
        let planet_index = 0;
        reference_canvas.loadPixels();
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const i = 4 * (y * width + x);
            const [r, g, b] = [reference_canvas.pixels[i], reference_canvas.pixels[i + 1], reference_canvas.pixels[i + 2]]; // get colors
            if (r == 0 && b == 0 && g == 0) {
              //set planet position here on x, y
              let extra = 0;
              if(planet_index==0) extra = 50
              planet_array[planet_index].x = x-extra;
              planet_array[planet_index].y = y-extra;
              planet_array[planet_index].adjustTransparency(-1);
              planet_index++;
              //draw circle where planet is.
              noStroke();
              reference_canvas.fill(200);
              reference_canvas.ellipse(x, y, 800);
              reference_canvas.fill("yellow");
              reference_canvas.ellipse(x, y, 200);
              
              if(planet_index>4) return;
              //refresh pixels.
              reference_canvas.loadPixels();
            }
          }
        }
        
        //if there weren't enough black spaces
        for(planet_index; planet_index<5; planet_index++){
            let x = random(0, width);
            let y = random(0, height);
            planet_array[planet_index].x = x;
            planet_array[planet_index].y = y;
            planet_array[planet_index].adjustTransparency(-1);

            reference_canvas.fill("orange");
            reference_canvas.ellipse(x, y, 200);
        }
    }
    
    
}