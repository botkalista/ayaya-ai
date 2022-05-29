import NeuralNetwork from "./NeuralNetwork";

export default class Entity {

    score: number = 0;

    constructor(public neuralNetwork: NeuralNetwork) { }

    getOutputs(inputs: number[]) {
        return NeuralNetwork.feedForward(inputs, this.neuralNetwork);
    }

    setScore(score: number) {
        this.score = score;
    }

    addScore(score: number) {
        this.score += score;
    }

    subScore(score: number) {
        this.score -= score;
    }


}