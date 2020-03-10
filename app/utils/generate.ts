import * as tf from '@tensorflow/tfjs-node';
import sample from './sample';
import getTextData from './data';

const modelURL = 'file://../model/saved_model/lstm_model_js/model.json';

const loadModel = async () => tf.loadLayersModel(modelURL);

// Generate text using a next-char-prediction model
const generateText = (
  model,
  textData,
  sentenceIndicesOriginal,
  length,
  temperature
) => {
  const sampleLen = model.inputs[0].shape[1];
  const charSetSize = model.inputs[0].shape[2];

  console.log(`len: ${sampleLen}, size: ${charSetSize}.`);

  // Avoid overwriting the original input.
  let sentenceIndices = sentenceIndicesOriginal.slice();

  let generated = '';
  while (generated.length < length) {
    // Encode the current input sequence as a one-hot Tensor.
    const inputBuffer = new tf.TensorBuffer([1, sampleLen, charSetSize]);

    // Make the one-hot encoding of the seeding sentence.
    for (let i = 0; i < sampleLen; i += 1) {
      inputBuffer.set(1, 0, i, sentenceIndices[i]);
    }
    const input = inputBuffer.toTensor();

    // Call model.predict() to get the probability values of the next
    // character.
    const output = model.predict(input);

    // Sample randomly based on the probability values.
    const winnerIndex = sample(tf.squeeze(output), temperature);
    const winnerChar = textData.getFromCharSet(winnerIndex);

    generated += winnerChar;
    sentenceIndices = sentenceIndices.slice(1);
    sentenceIndices.push(winnerIndex);

    // Memory cleanups.
    input.dispose();
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
  const input = tf.input({ shape: [sampleLen, charSetSize] });
  // const output = tf.input({ shape: [charSetSize] });
  model.build(input);
  model.summary();
  return 'kek';
  /*
  // Get a seed text from the text data object.
  const [seed, seedIndices] = textData.getRandomSlice();
  const generatedText = await generateText(
    model,
    textData,
    seedIndices,
    300,
    0.7
  );
  console.log(`Generated text: ${generatedText}.`);
  return generatedText;
   */
};

export default generate;
