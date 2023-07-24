{
    "title": "AI vs Anti-cheat",
    "description": "Neural networks are a double-edged sword for anticheat.",
    "tags": ["Anti-cheat", "AI", "C++"],
    "author": "Noah",
    "date": "7/22/2023",
    "showTitle": true,
    "indexed": true,
    "pinned": true
}

### Introduction

> The source code for this project can be found at [Strayfade/FNN](https://github.com/Strayfade/FNN)

Are "neural anti-cheats" like Valve's "VACnet" the solution to cheating in video games? Possibly. However, just as neural networks can be used by anti-cheat to detect cheaters, cheaters can use neural networks to avoid anti-cheat.

This article will be discussing how certain input methods, such as mouse movement, can be easily detected by anti-cheat software, and how this problem can be solved through the use of input "humanization" through neural networks.

### VACnet

By looking at [Valve's publicly available patent](https://patentimages.storage.googleapis.com/e5/80/ee/aadc4e252c6791/WO2019182868A1.pdf) for VACnet, lots of information can be revealed about the upcoming anti-cheat's inner workings. On [page 44](https://patentimages.storage.googleapis.com/e5/80/ee/aadc4e252c6791/WO2019182868A1.pdf#page=44), Valve displays some of the values forwarded through the network: 

 - Pitch
 - Yaw
 - Object Type
 - Action Result
 - Affected Object
 - Distance to AO

While it's hard to guess at what some of these values represent, two are immediately recognizable: **pitch** and **yaw**. This likely confirms that VACnet closely monitors how the player's mouse movement affects the in-game camera's pitch and yaw over time.

### 1. Simple Detection

Let's focus on the simplest form of aimbot detection: the distance of the crosshair from the target location. If this distance shows little to no movement over a long period of time, then it is safe to assume that the player is cheating. This is the easiest way to hypothetically detect a player using aimbot, but it is also the easiest to circumvent using our first "humanization" method: Input Smoothing.

### 2. Smoothing Detection

The goal of "smoothing" is to move the mouse gradually to the target location, as a human would, instead of instantly moving the mouse where it needs to be. Smoothing is almost **always** accomplished using the following function, where *x* is a screen coordinate and *t* is that coordinate's target position:

> <em>f(x) = (t - x) / c + x</em>

Note that in this equation, *c* is the **smoothing constant**, a value greater than *1* which can be used to control the speed at which the coordinate changes. The higher the value, the slower the coordinate changes.

An anticheat could detect a user that is using smoothing simply because of the fact that the crosshair's distance from the target will always decrease at an exponential rate. This can, of course, happen natrually with human players at times, but it will **always** happen with players who are cheating and using smoothing.

One way to avoid this detection is by using a linear smoothing function, or one that adds a constant value to the coordinate over time until it is within a certain distance from the target coordinate. Many cheats, however, don't take advantage of this, as an exponential smoothing algorithm is usually easier to code. Additionally, a linear smoothing algorithm could (*in theory*) be just as straightforward for an anticheat to detect as its exponential variant.

### The Solution

It almost feels that we would need a smoothing algorithm with added randomness to make the inputs look "human". What is the best way to produce controlled randomness that can change depending on the circumstances? **Neural networks.**

### Writing Our Own Neural Network

The key in creating a neural network is the layout of **weights** and **biases**.

 - **Weights** define how much the input should be changed by
 - **Biases** define the probability that the input will be changed at all

Lastly, we have our input and output layers, or **neurons**.

Here is example code that shows what we are working with. In this example, the `V(T)` is a macro for the `std::vector<>` object. `V2(T)` is the definition for a **Vector2** (`std::vector<std::vector<...>>`), and so on.

    class NeuralNetwork {
    private:
        V(int) Layers;
        V2(float) Neurons;
        V2(float) Biases;
        V3(float) Weights;
    }

When creating a constructor for this class, the values in the `Neurons`, `Biases`, and `Weights` vectors are populated with starting data.

    void NeuralNetwork::CreateNeurons() {
        V2(float) NewNeurons;
        for (int x = 0; x < this->Layers.size(); x++) {
            V(float) NewNeuronsArray;
            for (int y = 0; y < this->Layers[x]; y++) {
                NewNeuronsArray.push_back(0);
            }
            NewNeurons.push_back(NewNeuronsArray);
        }
        this->Neurons = NewNeurons;
    }
    void NeuralNetwork::CreateBiases() {
        V2(float) NewBiases;
        for (int x = 0; x < this->Layers.size(); x++) {
            V(float) NewBiasesArray;
            for (int y = 0; y < this->Layers[x]; y++) {
                NewBiasesArray.push_back(Random(-0.5f, 0.5f));
            }
            NewBiases.push_back(NewBiasesArray);
        }
        this->Biases = NewBiases;
    }
    void NeuralNetwork::CreateWeights() {
        V3(float) NewWeights;
        for (int x = 1; x < this->Layers.size(); x++) {
            V2(float) NewWeightsArray;
            int NeuronsInPreviousLayer = this->Layers[x - 1];
            for (int y = 0; y < this->Neurons[x].size(); y++) {
                V(float) NewWeightsArrayArray;
                for (int z = 0; z < NeuronsInPreviousLayer; z++) {
                    NewWeightsArrayArray.push_back(Random(-0.5f, 0.5f));
                }
                NewWeightsArray.push_back(NewWeightsArrayArray);
            }
            NewWeights.push_back(NewWeightsArray);
        }
        this->Weights = NewWeights;
    }

### How does it all work?

The type of neural network shown here is a Feed-Forward Neural Network, also called a **FNN** (or **FFNN**). The input values are forwarded through the network, and then the network is **mutated**.

Here is the function used to **forward** the input values through the network and return an output:

    V(float) NeuralNetwork::Forward(V(float) Input) {
        for (int x = 0; x < Input.size(); x++) {
            this->Neurons[0][x] = Input[x];
        }
        for (int x = 1; x < this->Layers.size(); x++) {
            int WorkingLayer = x - 1;
            for (int y = 0; y < this->Neurons[x].size(); y++) {
                float Value = 0.0f;
                for (int z = 0; z < this->Neurons[WorkingLayer].size(); z++) {
                    Value += this->Weights[WorkingLayer][y][z] * this->Neurons[WorkingLayer][z];
                }
                this->Neurons[x][y] = tanh(Value + this->Biases[x][y]);
            }
        }
        return this->Neurons[Neurons.size() - 1];
    }

The last step in the training process is **mutation**.

When a network is **mutated**, it's characteristics are cloned into a new network, and then that network has its weights and biases modified by a random amount.

    void NeuralNetwork::Mutate(int Chance, float Value) {
        for (int x = 0; x < this->Biases.size(); x++) {
            for (int y = 0; y < this->Biases[x].size(); y++) {
                if (Random(0.0f, Chance) <= 0.5) {
                    this->Biases[x][y] += Random(-Value, Value);
                }
            }
        }
        for (int x = 0; x < this->Weights.size(); x++) {
            for (int y = 0; y < this->Weights[x].size(); y++) {
                for (int z = 0; z < this->Weights[x][y].size(); z++) {
                    if (Random(0.0f, Chance) <= 0.5) {
                        this->Weights[x][y][z] += Random(-Value, Value);
                    }
                }
            }
        }
    }

### Feed-Forward Neural Networks TLDR

When training a FNN, an array of networks is given the same input information. Then, the data is forwarded through the network and the outputs are measured. All of the networks' outputs must be measured to test which network came closest to generating the expected output. This is why all data passed to the network during training must have an expected result already prepared.

The network with the best outputs, or `performance`, is used as the base to create a new array of networks that will be used for the next training loop. These new networks must be mutated so that they are given the chance to generate outputs that are closer to the target result than their parent network.

The hierarchy of parent networks and mutation is what gives this type of training the name **Genetic Algorithm**.

Training our neural network involves the following steps:

 - Create an array of neural networks
 - Slightly randomize the weights and biases in the network (performed using the Mutate() function)
 - Run the forward operation with input data
 - Calculate how correct/incorrect the response was from the network
 - Find the network in the array that was "most correct"
 - Make all of the networks "copy" the weights and biases of the best network
 - Go back to step 2 and do it all again

With this approach, the network will gradually provide better outputs over time. After it has been sufficiently trained, we can save the weights and biases and re-load them at a later time. This is our "model".

    -0.12585058
    0.49258252
    0.14557051
    -0.99751266
    ...

We can save and load it from memory (as an array), or from a file by creating Save() and Load() functions in the NeuralNetwork class.

### References
 - [https://github.com/Strayfade/FNN](https://github.com/Strayfade/FNN)
 - [https://towardsdatascience.com/building-a-neural-network-framework-in-c-16ef56ce1fef](https://towardsdatascience.com/building-a-neural-network-framework-in-c-16ef56ce1fef)
 - [https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network](https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network)
 - [https://www.theloadout.com/csgo/vacnet-cheating-patent](https://www.theloadout.com/csgo/vacnet-cheating-patent)
 - [https://patents.google.com/patent/WO2019182868A1](https://patents.google.com/patent/WO2019182868A1)
 - [https://patentimages.storage.googleapis.com/e5/80/ee/aadc4e252c6791/WO2019182868A1.pdf](https://patentimages.storage.googleapis.com/e5/80/ee/aadc4e252c6791/WO2019182868A1.pdf)