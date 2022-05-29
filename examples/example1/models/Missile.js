
export default class Missile {

    constructor(x, y) {
        this.pos = { x, y }
        this.force = { x: 0, y: 0 }
        this.acc = { x: 0, y: 0 }
        this.size = 10;
        this.rot = 0;
        this.maxSpeed = 3;
    }

    applyForce(x, y) {
        this.force = { x, y }
    }

    rotateToHeading() {
        this.rot = createVector(this.acc.x, this.acc.y).heading() + HALF_PI;
    }

    tick() {
        this.acc.x += this.force.x;
        this.acc.y += this.force.y;

        this.acc.x = Math.max(Math.min(this.acc.x, this.maxSpeed), -this.maxSpeed);
        this.acc.y = Math.max(Math.min(this.acc.y, this.maxSpeed), -this.maxSpeed);

        this.pos.x += this.acc.x;
        this.pos.y += this.acc.y;

        this.force.x = 0;
        this.force.y = 0;
    }

    render(debug = false) {
        push();
        translate(this.pos.x, this.pos.y);
        this.rotateToHeading();
        rotate(this.rot);

        if (debug) {
            noStroke();
            fill(0, 0, 100);
            ellipse(0, 0, this.size, this.size);
        }

        stroke(0);
        fill(100, 0, 0, 50)

        const LG = this.size;
        const MD = this.size * 2 / 3;
        const SM = this.size / 2;

        beginShape(TRIANGLES);
        vertex(SM, MD);
        vertex(-SM, MD);
        vertex(0, -LG);
        endShape();
        pop();

    }

}