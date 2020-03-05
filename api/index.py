import tensorflow as tf
from tensorflow import keras

import numpy as np

# load the dataset
path_to_file = tf.keras.utils.get_file('one_to_45.txt', 'https://raw.githubusercontent.com/nurseiit/46th-soz/master/one_to_45.txt')

# Read, then decode for py2 compat.
text = open(path_to_file, 'rb').read().decode(encoding='utf-8')

# The unique characters in the file
vocab = sorted(set(text))

# utils
char2idx = {u:i for i, u in enumerate(vocab)}
idx2char = np.array(vocab)

# Reload the model from the 2 files we saved
with open('../model/saved_model/model_config.json') as json_file:
    json_config = json_file.read()
model = keras.models.model_from_json(json_config)
model.load_weights('../model/saved_model/model_weights.h5')

model.build(tf.TensorShape([1, None]))

model.summary()

# Evaluation step (generating text using the learned model)
def generate_text(start_string, num_generate = 500, temperature = 0.7):
    # Low temperatures results in more predictable text.
    # Higher temperatures results in more surprising text.


    # Converting our start string to numbers (vectorizing)
    input_eval = [char2idx[s] for s in start_string]
    input_eval = tf.expand_dims(input_eval, 0)

    # Empty string to store our results
    text_generated = []


    # Here batch size == 1
    model.reset_states()
    for _ in range(num_generate):
        predictions = model(input_eval)
        # remove the batch dimension
        predictions = tf.squeeze(predictions, 0)

        # using a categorical distribution to predict the character returned by the model
        predictions = predictions / temperature
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()

        # We pass the predicted character as the next input to the model
        # along with the previous hidden state
        input_eval = tf.expand_dims([predicted_id], 0)

        text_generated.append(idx2char[predicted_id])

    result = start_string + ''.join(text_generated)

    # Make sure the result ends correctly with a period
    # TODO errors
    result = result[:result.rfind('.') + 1]

    return result


from sanic import Sanic
from sanic.response import json
app = Sanic()

@app.route('/generate')
async def index(req):
    text = req.args['text'][0]
    result = generate_text(start_string = text)
    return json({'result': result})

# http://0.0.0.0:8000/generate?text=%D0%90%D1%81%D1%82%D0%B0%D0%BD%D0%B0%20
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)
