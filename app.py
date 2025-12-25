from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

CONCH_ANSWERS = [
    "Maybe someday.",
    "Nothing.",
    "Neither.",
    "I don't think so.",
    "No.",
    "Yes.",
    "Try asking again."
]

@app.route('/api/magic-conch', methods=['POST'])
def ask_conch():
    # We can accept a question from the body if we want to log it or use it
    # data = request.json
    # question = data.get('question')
    
    answer = random.choice(CONCH_ANSWERS)
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
