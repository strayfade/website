{
    "title": "AI vs Anti-cheat",
    "description": "A deep-dive into neural networks",
    "tags": ["Anti-cheat", "AI", "C++"],
    "author": "Noah",
    "date": "1/26/2023",
    "showTitle": true,
    "indexed": true
}

> *The source code for this project can be found at [Strayfade/FNN](https://github.com/Strayfade/FNN)*

> Feed-forward Neural Networks (FNNs) are used to change data in an intelligent way, and they are very easy to set up and use. Although this article will be applying their use to evading simple anti-cheat detection, FNNs are an invaluable resource for automating complex systems and evaluating information.

### Starting from scratch
To begin coding, we will create a `NeuralNetwork` class, which holds values from our neural network

    class NeuralNetwork {
    private:
        V(int) Layers;
        V2(float) Neurons;
        V2(float) Biases;
        V3(float) Weights;
    }

> `V/V2/V3(T)` is just a wrapper for the std::vector object.

This class holds values for our input/output "neurons", biases, and weights. It also holds a vector containing our `Layers` layout, which defines how many neurons should be in each layer of the network. An example of this is `{ 2, 4, 2 }`, which has two input values and two output values, as well as a computation layer of 4 neurons.

Our constructor for the `NeuralNetwork` class looks like this:

    NeuralNetwork::NeuralNetwork(V(int) NewLayers) {
        this->Layers = NewLayers;
        for (int i = 0; i < this->Layers.size(); i++) {
            this->Layers[i] = NewLayers[i];
        }
        
        CreateNeurons();
        CreateBiases();
        CreateWeights();
    }

We start by setting our `Layers` variable to tell the network how many neurons should be in each layer. Then, we run the functions `CreateNeurons`, `CreateBiases`, and `CreateWeights` to initialize the network. This code is simplified and has all of the logging/debugging functions removed.

Here are the function definitions for `CreateNeurons`, `CreateBiases`, and `CreateWeights`:

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

After this, we will write the `Forward` function, which is used to run the network.

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

At this point, it's worth talking about how feed-forward neural networks actually function. 

Training our neural network involves the following steps:

 1. Create an array of neural networks
 2. Slightly randomize the weights and biases in the network (performed using the `Mutate()` function)
 3. Run the forward operation with input data
 4. Calculate how correct/incorrect the response was from the network
 5. Find the network in the array that was "most correct"
 6. Make all of the networks "copy" the weights and biases of the best network
 7. Go back to step 2 and do it all again

With this approach, the network will gradually provide better outputs over time. After it has been sufficiently trained, we can save the weights and biases and re-load them at a later time. This is our "model".

    -0.12585058
    0.49258252
    0.14557051
    -0.99751266
    ...

We can save and load it from memory (as an array), or from a file by creating `Save()` and `Load()` functions in the `NeuralNetwork` class.

### Applying what we know
AI has many uses in the scope of cheating, but we will be using it primarily to "humanize" mouse movements made by the computer. Some anti-cheats (namely Easy Anti-Cheat), have shown to detect mouse movement that seems too un-realistic. A good example of this would be a crosshair that is always locked onto an enemy player's head instead of having human randomness applied. 

*So, then, why can't we just use randomness added onto our crosshair's position?* This works, in some cases, but it gives the user less control over their crosshair's actual position. By using a pre-trained neural network to calculate mouse movements, we can create something that is based off of human movement and moves in the exact same way as a human.

For our network array (Step 1), we will create an array of 50 networks with the layers `{ 4, 12, 2 }`. This is because we will have four inputs (X/Y for the mouse's current position, and X/Y for where we want to move it), and two outputs (X/Y for an output location).

    V(int) Layers = { 2, 12, 2 };
    V(NeuralNetwork) Networks;
	for (int i = 0; i < 50; i++) {
		Networks.push_back(NeuralNetwork(Layers));
	}

Then, we will create inputs for the network like this:

    POINT Pt; // Get Mouse Location
    GetCursorPos(&Pt);

    Vec2 MouseTarget = { 200, 200 };
    V(float) Input = { 0, 0, MouseTarget.x, MouseTarget.y }; // Create FNN Input
    Input[0] = ((float)(Pt.x) / 1920) - 0.5f;
    Input[1] = ((float)(Pt.y) / 1080) - 0.5f;

We forward the network to "run" it, then calculate how it did using a variable `Performance`:

    for (int i = 0; i < Networks.size(); i++) {
        V(float) Output = Networks[i].Forward(Input);
        float PerformanceX = pow((float(MouseTarget.x) - 960) / 1920 - Output[0], 2);
        float PerformanceY = pow((float(MouseTarget.y) - 540) / 1080 - Output[1], 2);
        Networks[i].Performance = pow(1 - sqrt(PerformanceX + PerformanceY), 5);
    }

Now, we find which network did the best and create the next generation based on that.

    NeuralNetwork HighestFitness(Layers);
    for (int i = 0; i < Networks.size(); i++) {
        if (Networks[i].Fitness > HighestFitness.Fitness) {
            HighestFitness = Networks[i];
        }
    }
    for (int i = 0; i < Networks.size(); i++) {
        Networks[i].CloneFrom(HighestFitness);
        Networks[i].Mutate(1, 0.1);
    }

At this point, it's worth explaining what the `Mutate` function does. `Mutate` is responsible for randomly choosing whether or not to randomize the biases and weights of the network.

Here, `Chance` is responsible for determining whether or not we should mutate the network, and `Value` is the maximum amount that we can mutate the network per run. `Chance` can be thought of as the Mutation Chance, and `Value` is the Mutation Scale.

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

At this point, we are finished coding the neural network. To test it, we can feed it an input to move the mouse to in the `Vec2 MouseTarget` and watch as it tries to move to the desired location. It will likely start off just guessing during training, but will get better over time.

### References
 - [https://github.com/Strayfade/FNN](https://github.com/Strayfade/FNN)
 - [https://towardsdatascience.com/building-a-neural-network-framework-in-c-16ef56ce1fef](https://towardsdatascience.com/building-a-neural-network-framework-in-c-16ef56ce1fef)
 - [https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network](https://deepai.org/machine-learning-glossary-and-terms/feed-forward-neural-network)