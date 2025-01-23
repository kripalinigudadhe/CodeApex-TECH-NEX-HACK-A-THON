import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the dataset (ensure the file path is correct)
data = pd.read_csv('career_data.csv')

# Check and ensure 'age' is numeric (you can do this by inspecting the dataframe)
data['age'] = pd.to_numeric(data['age'], errors='coerce')  # Convert 'age' to numeric values

# Initialize LabelEncoder for categorical columns
education_encoder = LabelEncoder()
skills_encoder = LabelEncoder()
interests_encoder = LabelEncoder()
career_encoder = LabelEncoder()

# Encode the categorical columns
data['education_level'] = education_encoder.fit_transform(data['education_level'])
data['skills'] = skills_encoder.fit_transform(data['skills'])
data['interests'] = interests_encoder.fit_transform(data['interests'])
data['career'] = career_encoder.fit_transform(data['career'])

# Features and labels
X = data[['age', 'education_level', 'skills', 'interests']]
y = data['career']

# Ensure no NaN values are present in X and y (this is important for model training)
X = X.dropna()
y = y[X.index]  # Keep labels corresponding to valid rows

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate the model accuracy
train_accuracy = model.score(X_train, y_train)
test_accuracy = model.score(X_test, y_test)

print(f'Train Accuracy: {train_accuracy * 100}%')
print(f'Test Accuracy: {test_accuracy * 100}%')

# Save the model and encoders to disk
with open('career_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('education_encoder.pkl', 'wb') as encoder_file:
    pickle.dump(education_encoder, encoder_file)

with open('skills_encoder.pkl', 'wb') as encoder_file:
    pickle.dump(skills_encoder, encoder_file)

with open('interests_encoder.pkl', 'wb') as encoder_file:
    pickle.dump(interests_encoder, encoder_file)

with open('career_encoder.pkl', 'wb') as encoder_file:
    pickle.dump(career_encoder, encoder_file)

print("Model and encoders saved successfully!")

