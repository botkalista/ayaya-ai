import Generation from '../../dist/index.js';
import Missile from './models/Missile.js';

const gen = new Generation(100, {
    inputSize: 4,
    hiddenLayersSizes: [3],
    outputSize: 2
});

const target = { x: 350, y: 250 }

const missiles = [];

const start_ttl = 300;
let ttl = start_ttl;

function setup() {
    createCanvas(600, 400);
    background(150);

    for (let i = 0; i < gen.entitiesCount; i++) {
        const missile = new Missile(random(0, width), height - 10);
        missiles.push(missile);
    }
}

function draw() {
    background(150);

    noStroke();
    fill(0, 0, 200);
    ellipse(target.x, target.y, 20, 20);

    for (let i = 0; i < gen.entities.length; i++) {
        const entity = gen.entities[i];
        const missile = missiles[i];

        const out = entity.getOutputs([missile.pos.x, missile.pos.y, target.x, target.y]);
        missile.applyForce(out[0] - 0.5, out[1] - 0.5);

        missile.tick();
        missile.render();
    }

    ttl--;
    if (ttl == 0) {
        noLoop();
        for (let i = 0; i < gen.entities.length; i++) {
            const score = 10000 / dist(missiles[i].pos.x, missiles[i].pos.y, target.x, target.y);
            gen.entities[i].setScore(score);
        }
        gen.nextGeneration(0.05, { trucateHalf: true });
        console.log(gen.score);
        ttl = start_ttl;
        missiles.length = 0;
        for (let i = 0; i < gen.entities.length; i++) {
            const missile = new Missile(random(0, width), height - 10);
            missiles.push(missile);
        }
        loop();
    }
}


window.setup = setup;
window.draw = draw;