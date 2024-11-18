import joblib

# Load the model and preprocessors
model = joblib.load("question_classifier.pkl")
tfidf = joblib.load("tfidf_vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Example: Predict the tag for a new question
new_question = "What is a microservice architecture?"
new_question_vector = tfidf.transform([new_question])
predicted_tag = label_encoder.inverse_transform(model.predict(new_question_vector))
print("Predicted tag:", predicted_tag[0])
