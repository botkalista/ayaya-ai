import Entity from "./Entity";
import NeuralNetwork from "./NeuralNetwork";

type EvolutionOptions = { trucateHalf?: boolean, excludeZeros?: boolean }

export default class Generation {

    entities: Entity[];

    generation: number = 1;

    score = {
        best: 0,
        max: 0,
        avg: 0,
        bestGen: 0
    }

    constructor(public entitiesCount: number, public config: { inputSize: number, hiddenLayersSizes: number[], outputSize: number }) {
        this.entities = [];
        for (let i = 0; i < entitiesCount; i++) {
            this.entities.push(this.createEntity());
        }
    }

    private createEntity() {
        const net = new NeuralNetwork(this.config.inputSize, this.config.hiddenLayersSizes, this.config.outputSize);
        const entity = new Entity(net);
        return entity;
    }

    private selectEntity(maxScore: number) {
        if (this.entities.length == 0) return this.createEntity();
        while (true) {
            const index = Math.floor(Math.random() * this.entities.length);
            const target = this.entities[index];
            const r = Math.random() * maxScore;
            if (r < target.score) return target;
        }
    }

    private crossover(a: Entity, b: Entity, mutationRate: number) {

        const child = this.createEntity();

        const weightsA = NeuralNetwork.getWeights(a.neuralNetwork);
        const weightsB = NeuralNetwork.getWeights(b.neuralNetwork);

        const weightsC = [];

        for (let i = 0; i < weightsA.length; i++) {
            const data = [];
            for (let k = 0; k < weightsA[i].length; k++) {
                const target = Math.random() < 0.5 ? weightsA[i][k] : weightsB[i][k];
                const mutated = Math.random() < mutationRate ? Math.random() * 2 - 1 : target;
                data.push(mutated);
            }
            weightsC.push(data);
        }

        NeuralNetwork.setWeights(weightsC, child.neuralNetwork);

        return child;
    }

    nextGeneration(mutationRate: number = 0.05, method: EvolutionOptions = { excludeZeros: false, trucateHalf: false }) {


        this.entities.sort((a, b) => b.score - a.score);

        const best = this.entities[0];

        this.score.max = best.score;
        this.score.avg = this.entities.reduce((p, v) => p + v.score, 0) / this.entities.length;

        if (best.score > this.score.best) {
            this.score.best = best.score;
            this.score.bestGen = this.generation;
        }

        if (method.excludeZeros) this.entities = this.entities.filter(e => e.score > 0);
        if (method.trucateHalf) this.entities.length = Math.floor(this.entities.length / 2);

        let maxScore = 0;
        this.entities.forEach(e => maxScore = Math.max(e.score, maxScore));

        const newEntities = [];

        for (let i = 0; i < this.entitiesCount; i++) {
            const a = this.selectEntity(maxScore);
            const b = this.selectEntity(maxScore);
            const c = this.crossover(a, b, mutationRate);
            newEntities.push(c);
        }

        this.entities = newEntities;

        this.generation++;

    }

}