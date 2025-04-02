import os
from flask import Flask, jsonify
import pickle
import pandas as pd

# Initialize Flask app
app = Flask(__name__)

# Load the trained model from the correct path
model = pickle.load(open("xgboost_model.pkl", "rb"))

# Sample data (for now, using the sample data you mentioned)
sample_data = pd.DataFrame({
    'HighBP': [1.0, 1.0, 0.0, 1.0, 0.0],
    'HighChol': [0.0, 1.0, 0.0, 1.0, 0.0],
    'CholCheck': [1.0, 1.0, 1.0, 1.0, 1.0],
    'BMI': [26.0, 26.0, 26.0, 28.0, 29.0],
    'Smoker': [0.0, 1.0, 0.0, 1.0, 1.0],
    'Stroke': [0.0, 1.0, 0.0, 0.0, 0.0],
    'HeartDiseaseorAttack': [0.0, 0.0, 0.0, 0.0, 0.0],
    'PhysActivity': [1.0, 0.0, 1.0, 1.0, 1.0],
    'Fruits': [0.0, 1.0, 1.0, 1.0, 1.0],
    'Veggies':[1.0 ,0.0, 0.0, 0.0, 1.0],
    'HvyAlcoholConsump':[0.0, 1.0, 0.0, 0.0, 0.0],
    'AnyHealthcare': [1.0, 1.0, 1.0, 1.0, 1.0],
    'NoDocbcCost': [0.0, 0.0, 0.0, 0.0, 0.0],
    'GenHlth': [3.0, 3.0, 1.0, 3.0, 2.0],
    'MentHlth': [5.0, 0.0, 0.0, 0.0, 0.0],
    'PhysHlth': [30.0, 0.0, 10.0, 3.0, 0.0],
    'DiffWalk': [0.0, 0.0, 0.0, 0.0, 0.0],
    'Sex': [1.0, 0.0, 1.0, 1.0, 0.0],
    'Age': [4.0, 12.0, 13.0, 11.0, 8.0],
    'Education': [6.0, 6.0, 6.0, 6.0, 5.0],
    'Income': [8.0, 8.0, 8.0, 8.0, 8.0]
})

# Endpoint to get prediction
@app.route('/predict', methods=['GET'])
def predict():
    # Using the sample data to predict the diabetes binary outcome
    sample_input = sample_data.iloc[2].values.reshape(1, -1)  # Reshape to match the model's input shape
    print(sample_input)
    prediction = model.predict(sample_input)
    print(prediction)

    # Returning the prediction in the response as JSON
    return jsonify({
        'prediction': int(prediction[0])  # Convert prediction to integer and send as response
    })

if __name__ == '__main__':
    app.run(debug=True)
