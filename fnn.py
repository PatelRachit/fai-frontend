import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# Load the dataset
data = pd.read_csv("dataset/diabetes_binary_health_indicators_BRFSS2015.csv")

# Prepare features and target
X = data.drop("Diabetes_binary", axis=1)
y = data["Diabetes_binary"]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.1, random_state=42)

# Model definition
model = MLPClassifier(hidden_layer_sizes=(64, 32), activation='relu', solver='sgd', max_iter=5000, learning_rate='adaptive')
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Save model and scaler to files
os.makedirs("server", exist_ok=True)  # Create 'server' folder if it doesn't exist
joblib.dump(model, "server/fnn.pkl")
joblib.dump(scaler, "server/scaler.pkl")  # Save the scaler

print("Model and scaler saved.")
