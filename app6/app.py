from flask import Flask, request, jsonify, render_template
import requests
import json as json
from huggingface_hub import from_pretrained_keras
from keras_preprocessing.sequence import pad_sequences
from newspaper import Article
import pickle as pickle
import validators
from tensorflow import keras

model = from_pretrained_keras("raghavsharma06/keras-dummy-functional-demo")

with open('tokenizer.pickle', 'rb') as handle:
   tokenizer = pickle.load(handle)

API_URL = "https://api-inference.huggingface.co/models/raghavsharma06/model-v2"
headers = {"Authorization": "Bearer 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"}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/drag-drop')
def drag_drop():
    return render_template('drag-drop.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/report')
def report():
    return render_template('report.html')

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    user_input = data.get('data')
    output, number = news_veracity(user_input)
    print(number)
    return jsonify({'result': output})

def news_veracity(url):
    if not validators.url(url):
        return "ERROR: Not a valid URL", 0
    article = Article(url)
    
    article.download()
    article.parse()
    input_text = article.text

    input_sequence = tokenizer.texts_to_sequences([input_text])

    # Pad the sequence to match the model's input size (100)
    input_sequence = pad_sequences(input_sequence, maxlen=100)

    # Convert the sequence to float32
    result = model.predict(input_sequence)[0][0]
    if result > 0.5:
        return "True", result
    else:
        return "False", result

if __name__ == '__main__':
    app.run()



