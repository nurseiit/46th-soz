import * as tf from '@tensorflow/tfjs-node';
import sample from './sample';
import getTextData from './data';

const modelURL = 'file://../model/saved_model/lstm_model_js/model.json';

const loadModel = async () => tf.loadLayersModel(modelURL);

// Generate text using a next-char-prediction model
const generateText = (model, textData, seed, length, temperature) => {
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
  return generated;
};

type Props = {
  text: string;
};

const generate = async ({ text }: Props): Promise<string> => {
  const textData = getTextData();

  const sampleLen = textData.sampleLen();
  const charSetSize = textData.charSetSize();

  console.log(`Length of text: ${textData.textLen()} characters`);
  console.log(`${charSetSize} unique characters`);

  const model = await loadModel();
  model.summary();
  // Get a seed text from the text data object.
  const generatedText = await generateText(model, textData, text, 300, 0.7);
  console.log(`Generated text: ${generatedText}.`);
  return generatedText;
};

export default generate;
