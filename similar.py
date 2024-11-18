from flask import Flask, request, jsonify
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

# Load saved data and vectorizers
tfidf_questions = joblib.load("tfidf_questions_vectorizer.pkl")
tfidf_answers = joblib.load("tfidf_answers_vectorizer.pkl")
question_vectors = joblib.load("question_vectors.pkl")
answer_vectors = joblib.load("answer_vectors.pkl")
df = joblib.load("qa_dataframe.pkl")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


def extract_keywords(question):
    # Remove common phrases to isolate the topic of interest
    question = question.lower()
    phrases_to_remove = ["what is", "what are", "explain", "does", "how to", "meaning of"]
    
    for phrase in phrases_to_remove:
        if question.startswith(phrase):
            question = question.replace(phrase, "").strip()
            break
    return question

def search_web_scrape(new_question):
    # Extract keywords for Wikipedia search
    search_topic = extract_keywords(new_question)
    search_url = f"https://en.wikipedia.org/wiki/{search_topic.replace(' ', '_')}"
    
    try:
        response = requests.get(search_url)

        # If exact page is not found, fallback to Wikipedia's search page
        if response.status_code != 200:
            print(f"Page not found for '{search_topic}', searching instead.")
            search_url = f"https://en.wikipedia.org/wiki/Special:Search?search={search_topic.replace(' ', '+')}"
            response = requests.get(search_url)
        
        # Parse the page content
        soup = BeautifulSoup(response.content, 'html.parser')
        paragraphs = soup.find_all('p')
        
        # Extract the first few paragraphs for a concise answer
        text_data = [p.get_text() for p in paragraphs[:3] if p.get_text().strip()]

        # Check if content was found
        if not text_data:
            print("No relevant content found on Wikipedia.")
            return None

        # Combine the extracted paragraphs into a single text block
        result = " ".join(" ".join(text_data).split())
        return result

    except Exception as e:
        print(f"Error occurred: {e}")
        return None


@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    new_question = data.get("question")

    if not new_question:
        return jsonify({"error": "No question provided"}), 400

    new_question_vector = tfidf_questions.transform([new_question])
    similarities = cosine_similarity(new_question_vector, question_vectors).flatten()
    top_indices = similarities.argsort()[-3:][::-1]

    similar_answers = [
        {
            "question": df.iloc[index]['text'],
            "answer": df.iloc[index]['answer_text']
        }
        for index in top_indices if similarities[index] >= 0.1
    ]

    # Search for the answer on the web and set a default message if None
    web_answer = search_web_scrape(new_question) or "No relevant web answer found."

    result = {
        "similar_answers": similar_answers,
        "web_answer": web_answer
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True,port=1000)
