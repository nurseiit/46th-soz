import * as tf from '@tensorflow/tfjs-node';

const modelURL = 'file://../model/saved_model/lstm_model_js/model.json';

const loadModel = async () => tf.loadLayersModel(modelURL);

type Props = {
  text: string;
};

const generate = async ({ text }: Props): Promise<string> => {
  const model = await loadModel();
  const startString = text;

  // Number of characters to generate
  const numGenerate = 300;

  // TODO
  // # Converting our start string to numbers (vectorizing)
  // input_eval = [char2idx[s] for s in start_string]
  let inputEval = [];
  inputEval = tf.expandDims(inputEval, 0);

  // Empty string to store our results
  const textGenerated = [];

  // Low temperatures results in more predictable text.
  // Higher temperatures results in more surprising text.
  // Experiment to find the best setting.
  const temperature = 0.7;

  // Here batch size == 1
  model.resetStates();

  for (let i = 0; i < numGenerate; i += 1) {
    let predictions = model(inputEval);
    // remove the batch dimension
    predictions = tf.squeeze(predictions, 0);

    // using a categorical distribution to predict
    // the character returned by the model
    predictions /= temperature;
    // const predictedId = tf.multinomial(predictions, 1)[-1, 0].numpy();
    /*

      # We pass the predicted character as the next input to the model
      # along with the previous hidden state
      input_eval = tf.expand_dims([predicted_id], 0)

      text_generated.append(idx2char[predicted_id])
  */
  }

  return startString + textGenerated.join('');
};

export default generate;
