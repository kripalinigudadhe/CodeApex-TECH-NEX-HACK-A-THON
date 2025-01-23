import streamlit as st
import pickle
import numpy as np

# Load the trained model and encoders
with open('career_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('education_encoder.pkl', 'rb') as encoder_file:
    education_encoder = pickle.load(encoder_file)

with open('skills_encoder.pkl', 'rb') as encoder_file:
    skills_encoder = pickle.load(encoder_file)

with open('interests_encoder.pkl', 'rb') as encoder_file:
    interests_encoder = pickle.load(encoder_file)

with open('career_encoder.pkl', 'rb') as encoder_file:
    career_encoder = pickle.load(encoder_file)

# Streamlit UI for user input
st.title('Career Recommendation System')

# Input fields for user data
age = st.number_input("Age", min_value=18, max_value=100)

# Predefined options for education, skills, and interests based on the training data
education_levels = ["High School", "Undergraduate", "Postgraduate"]
skills_options = ["Programming", "Design", "Communication", "Marketing", "Data Analysis", "Graphic Design", "Sales", "Project Management"]
interests_options = ["Technology", "Art", "Healthcare", "Marketing", "Finance", "Construction", "Education", "Law", "Economics", "Media"]

education_level = st.selectbox("Education Level", education_levels)
skills = st.selectbox("Skills (e.g., Programming, Communication, etc.)", skills_options)
interests = st.selectbox("Interests (e.g., Art, Engineering, Medicine)", interests_options)

# Function to safely transform inputs using the correct encoder
def safe_transform(encoder, input_value, field_name):
    try:
        # Attempt to transform the input using the encoder
        return encoder.transform([input_value])[0]
    except ValueError:
        # If the value is not in the encoder, print a message and return None
        st.error(f"Error: '{input_value}' is not a valid {field_name}. Please choose a valid value.")
        return None

if st.button("Get Career Recommendation"):
    # Encode the user input using the appropriate encoder
    education_level_encoded = safe_transform(education_encoder, education_level, "education level")
    skills_encoded = safe_transform(skills_encoder, skills, "skills")
    interests_encoded = safe_transform(interests_encoder, interests, "interests")

    # Check if any of the values returned None, which means an invalid input
    if education_level_encoded is None or skills_encoded is None or interests_encoded is None:
        st.error("Please enter valid values for all fields.")
    else:
        # Create input vector for prediction
        user_input = np.array([[age, education_level_encoded, skills_encoded, interests_encoded]])

        # Make career prediction
        career_encoded = model.predict(user_input)[0]

        # Decode the career label using the career encoder
        career = career_encoder.inverse_transform([career_encoded])[0]

        st.write(f"Recommended Career: {career}")

