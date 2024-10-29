class Mover{
    constructor(sprite, move_speed, update_speed = 0.3){
        this.sprite = sprite;
        this.update_speed = update_speed;
        this.move_speed = move_speed;
        this.counter = 0;
        this.lastframe_counter = 0;
    }
    
    moveshow(){
        this.counter += this.update_speed;
        //if(floor(this.counter)>floor(this.lastframe_counter)) this.move();
        this.move();
        this.sprite.show();

        this.lastframe_counter = this.counter;
    }

    move(){
        this.sprite.x += this.move_speed;
        this.checkEdges();
    }

    checkEdges(){
        if(this.sprite.x > width + this.sprite.spritewidth){
            this.sprite.y = random(0, height);
            this.sprite.x = -this.sprite.spritewidth;
        }
    }

}