export default class NetworkLayer {

    inputs: number[];
    outputs: number[];

    weights: number[][];
    biases: number[];

    constructor(public inputSize: number, public outputSize: number, public isBinary: boolean = true, public activationFunction = (e: number) => { return 1 / (1 + Math.exp(-e)) }) {

        this.inputs = new Array(inputSize);
        this.biases = new Array(outputSize);
        this.outputs = new Array(outputSize);

        this.weights = [];

        for (let i = 0; i < inputSize; i++) {
            const w = new Array(outputSize);
            this.weights.push(w);
        }

        NetworkLayer.randomize(this);
    }

    static getWeights(networkLayer: NetworkLayer) {
        const result = [];
        for (let i = 0; i < networkLayer.weights.length; i++) {
            const data = [];
            for (let k = 0; k < networkLayer.weights[i].length; k++) {
                data.push(networkLayer.weights[i][k]);
            }
            result.push(data);
        }
        return result;
    }

    static setWeights(weights: number[][], networkLayer: NetworkLayer) {

        for (let i = 0; i < weights.length; i++) {
            for (let k = 0; k < weights[i].length; k++) {
                networkLayer.weights[i][k] = weights[i][k];
            }
        }

    }

    static feedForward(inputs: number[], networkLayer: NetworkLayer) {
        for (let i = 0; i < networkLayer.inputs.length; i++) {
            networkLayer.inputs[i] = inputs[i];
        }
        for (let i = 0; i < networkLayer.outputs.length; i++) {
            let total = 0;
            for (let k = 0; k < networkLayer.inputs.length; k++) {
                total += networkLayer.inputs[k] * networkLayer.weights[k][i];
            }

            if (networkLayer.isBinary) {
                networkLayer.outputs[i] = total > networkLayer.biases[i] ? 1 : 0;
            } else {
                networkLayer.outputs[i] = networkLayer.activationFunction(total + networkLayer.biases[i]);
            }
        }
        return networkLayer.outputs;
    }

    static randomize(networkLayer: NetworkLayer) {
        for (let i = 0; i < networkLayer.weights.length; i++) {
            for (let k = 0; k < networkLayer.weights[i].length; k++) {
                networkLayer.weights[i][k] = Math.random() * 2 - 1;
            }
        }
        for (let i = 0; i < networkLayer.biases.length; i++) {
            networkLayer.biases[i] = Math.random() * 2 - 1;
        }
    }

}