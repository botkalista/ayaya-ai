import NetworkLayer from "./NetworkLayer";



export default class NeuralNetwork {

    layers: NetworkLayer[];

    constructor(public inputSize: number, public hiddenLayersSizes: number[], public outputSize: number) {

        this.layers = [];

        const inputLayer = new NetworkLayer(inputSize, hiddenLayersSizes[0], false);
        this.layers.push(inputLayer);

        for (let i = 0; i < hiddenLayersSizes.length; i++) {
            const layerInputSize = hiddenLayersSizes[i];
            const layerOutputSize = i == hiddenLayersSizes.length - 1 ? outputSize : hiddenLayersSizes[i + 1];
            const layer = new NetworkLayer(layerInputSize, layerOutputSize, false);
            this.layers.push(layer);
        }

    }

    static getWeights(neuralNetwork: NeuralNetwork) {
        const result = [];
        for (let i = 0; i < neuralNetwork.layers.length; i++) {
            const weights = NetworkLayer.getWeights(neuralNetwork.layers[i]);
            result.push(weights);
        }
        return result;
    }

    static setWeights(weights: number[][][], neuralNetwork: NeuralNetwork) {
        for (let i = 0; i < neuralNetwork.layers.length; i++) {
            NetworkLayer.setWeights(weights[i], neuralNetwork.layers[i]);
        }
    }


    static feedForward(inputs: number[], neuralNetwork: NeuralNetwork) {
        let outputs = NetworkLayer.feedForward(inputs, neuralNetwork.layers[0]);
        for (let i = 1; i < neuralNetwork.layers.length; i++) {
            outputs = NetworkLayer.feedForward(outputs, neuralNetwork.layers[i]);
        }
        return outputs;
    }

}