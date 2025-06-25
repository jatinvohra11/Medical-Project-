from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS # Import CORS

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# --- In-Memory Data Storage ---
# In a real application, this data would be in a database.
users = {
    "patients": {
        "patient_1": {
            "name": "Jatin Vohra",
            "email": "patient@example.com",
            "hashed_password": generate_password_hash("password123")
        }
    },
    "doctors": {
        # Updated doctors with a common password
        "DOC123": {
            "hashed_password": generate_password_hash("pass123"),
            "name": "Dr. Emily Carter"
        },
        "DOC456": {
            "hashed_password": generate_password_hash("pass123"),
            "name": "Dr. Ben Adams"
        },
        # Added new doctor as requested
        "12306952": {
            "hashed_password": generate_password_hash("pass123"),
            "name": "Dr. Alex Ray"
        }
    }
}

# --- Root Route ---
@app.route('/', methods=['GET'])
def index():
    """A simple root route to confirm the server is running."""
    return jsonify({"message": "Welcome to the ViviCure API! The server is running."}), 200


# --- Helper Functions ---
def get_patient_by_email(email):
    """Finds a patient by their email address."""
    for user_id, user_data in users["patients"].items():
        if user_data["email"] == email:
            return user_id, user_data
    return None, None

# --- Patient Routes ---

@app.route('/patient/signup', methods=['POST'])
def patient_signup():
    """
    Handles patient registration.
    Expects JSON payload with 'name', 'email', and 'password'.
    """
    data = request.get_json()
    if not data or not all(k in data for k in ['name', 'email', 'password']):
        return jsonify({"error": "Missing data. Required fields: name, email, password"}), 400

    name = data['name']
    email = data['email']
    password = data['password']

    # Check if patient already exists
    _ , existing_user = get_patient_by_email(email)
    if existing_user:
        return jsonify({"error": "A patient with this email already exists."}), 409

    # Hash the password for security
    hashed_password = generate_password_hash(password)

    # Create a new patient ID (simple sequential ID for this example)
    new_patient_id = f"patient_{len(users['patients']) + 1}"
    
    # Store the new patient
    users["patients"][new_patient_id] = {
        "name": name,
        "email": email,
        "hashed_password": hashed_password
    }
    
    print("Updated Patients:", users["patients"]) # For debugging

    return jsonify({
        "message": "Patient signed up successfully!",
        "patient_id": new_patient_id
    }), 201

@app.route('/patient/login', methods=['POST'])
def patient_login():
    """
    Handles patient login.
    Expects JSON payload with 'email' and 'password'.
    """
    data = request.get_json()
    if not data or not all(k in data for k in ['email', 'password']):
        return jsonify({"error": "Missing data. Required fields: email, password"}), 400

    email = data['email']
    password = data['password']

    # Find the patient by email
    patient_id, patient = get_patient_by_email(email)
    
    # Check if patient exists and if the password is correct
    if patient and check_password_hash(patient["hashed_password"], password):
        return jsonify({
            "message": "Patient logged in successfully!",
            "patient_id": patient_id,
            "name": patient["name"]
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# --- Doctor Routes ---

@app.route('/doctor/login', methods=['POST'])
def doctor_login():
    """
    Handles doctor login.
    Expects JSON payload with 'doctor_id' and 'password'.
    """
    data = request.get_json()
    if not data or not all(k in data for k in ['doctor_id', 'password']):
        return jsonify({"error": "Missing data. Required fields: doctor_id, password"}), 400
        
    doctor_id = data['doctor_id']
    password = data['password']
    
    # Find the doctor by ID
    doctor = users["doctors"].get(doctor_id)

    # Check if doctor exists and if the password is correct
    if doctor and check_password_hash(doctor["hashed_password"], password):
        return jsonify({
            "message": "Doctor logged in successfully!",
            "doctor_id": doctor_id,
            "name": doctor["name"]
        }), 200
    else:
        return jsonify({"error": "Invalid Doctor ID or password"}), 401


# --- Main Execution ---
if __name__ == '__main__':
    # To run this:
    # 1. Make sure you have Flask-Cors installed: pip install Flask-Cors
    # 2. Run the script: python app.py
    # The server will be running on http://127.0.0.1:5000
    app.run(debug=True)
