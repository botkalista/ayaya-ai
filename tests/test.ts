import NeuralNetwork from '../src/models/NeuralNetwork';

const net = new NeuralNetwork(2, [12], 2);


for (let i = 0; i < 10; i++) {
    const a = Math.random();
    const b = Math.random();
    console.log(NeuralNetwork.feedForward([a, b], net));
}