import * as tf from '@tensorflow/tfjs-node';
import sample from './sample';
import getTextData from './data';

const modelPath = 'file://../model/saved_model/lstm_model_js/model.json';

const loadModel = async () => tf.loadLayersModel(modelPath);

// Generate text using a next-char-prediction model
const generateText = (model, textData, seed, length, temperature): string => {
  let inputEval = tf.tensor1d(textData.textToIndices(seed));
  inputEval = tf.expandDims(inputEval, 0);

  model.resetStates();
  let generated = '';
  while (generated.length < length) {
    // Call model.predict() to get the probability values of the next
    // character.
    let output = model.predict(inputEval);
    output = tf.squeeze(output);

    // Sample randomly based on the probability values.
    const winnerIndex = sample(output, temperature);
    const winnerChar = textData.getFromCharSet(winnerIndex);

    generated += winnerChar;

    inputEval = tf.expandDims(tf.tensor1d([winnerIndex]), 0);

    // Memory cleanups.
    output.dispose();
  }
  return seed + generated;
};

type Props = {
  text: string | string[];
  length?: number;
  temperature?: number;
};

const generate = async ({
  text,
  length = 500,
  temperature = 0.1
}: Props): Promise<string> => {
  const textData = getTextData();
  const model = await loadModel();
  const generatedText = await generateText(
    model,
    textData,
    text as string,
    length,
    temperature
  );
  return generatedText;
};

export default generate;
