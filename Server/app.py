from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS  # Import CORS


app = Flask(__name__)

CORS(app)


# Load the model and scaler from the 'server' folder
model = joblib.load("server/fnn.pkl")
scaler = joblib.load("server/scaler.pkl")

# Define the order of columns (must match training)
columns = [
    "HighBP", "HighChol", "CholCheck", "BMI", "Smoker", "Stroke",
    "HeartDiseaseorAttack", "PhysActivity", "Fruits", "Veggies",
    "HvyAlcoholConsump", "AnyHealthcare", "NoDocbcCost", "GenHlth",
    "MentHlth", "PhysHlth", "DiffWalk", "Sex", "Age", "Education", "Income"
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the incoming JSON data
        input_data = request.get_json()
        print(input_data)

        # Convert the JSON data into a pandas DataFrame
        input_df = pd.DataFrame([input_data])

        # Ensure the columns match the model's expected input (order and feature names)
        input_df = input_df[columns]  # Select the columns used during training

        # Scale the input data using the saved scaler
        input_scaled = scaler.transform(input_df)

        # Predict using the model
        predictions = model.predict(input_scaled)

        print(predictions)

        # Return predictions as a JSON response
        return jsonify({'prediction': int(predictions[0])})  # Convert to integer and return

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
