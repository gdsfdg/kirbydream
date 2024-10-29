//mostly taken from noc
class Bounce{
    constructor(sprite){
        this.sprite = sprite;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.radius = 0;
        this.activated = false;
        this.gravity = createVector(0, 0.3);
    }

    setup(){
        this.radius = this.sprite.animation[0].height;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
      }
    
    update() {
        if(this.activated){
            this.applyForce(this.gravity);
        }
        this.velocity.add(this.acceleration);
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;
        this.acceleration.mult(0);
    }

    activate(){
        if(random()>0.99){
            this.radius = this.sprite.animation[0].height;
            this.gravity = createVector(0, 0.5 - this.radius/1000);
            this.activated = true;
        }
    }

    contactEdge() {
        // The mover is touching the edge when it's within one pixel
        return (this.sprite.y > height - this.radius - 1);
    }    

    bounceEdges() {
        // A new variable to simulate an inelastic collision
        // 10% of the velocity's x or y component is lost
        let bounce = -0.5;
        print(this.radius);
        if (this.sprite.x > width - this.radius) {
            this.sprite.x = width - this.radius;
          this.velocity.x *= bounce;
        } else if (this.sprite.x < this.radius) {
            this.sprite.x = this.radius;
          this.velocity.x *= bounce;
        }
        if (this.sprite.y > height - this.radius) {
            this.sprite.y = height - this.radius;
          this.velocity.y *= bounce;
        }
      }    
    
}