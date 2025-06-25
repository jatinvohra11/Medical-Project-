document.addEventListener('DOMContentLoaded', () => {
    // Backend server ka URL
    const API_URL = 'http://127.0.0.1:5000';

    // --- UI Elements ---
    const patientBtn = document.getElementById('patient-btn');
    const doctorBtn = document.getElementById('doctor-btn');
    const patientFormSection = document.getElementById('patient-form');
    const doctorFormSection = document.getElementById('doctor-form');

    const patientLoginForm = document.getElementById('patient-login-form');
    const doctorLoginForm = document.getElementById('doctor-login-form');
    
    const patientSignupBtn = document.getElementById('patient-signup-btn');

    const patientErrorMessage = document.getElementById('patient-error-message');
    const doctorErrorMessage = document.getElementById('doctor-error-message');

    // --- Form Toggling Logic ---
    patientBtn.addEventListener('click', () => {
        if (!patientBtn.classList.contains('active')) {
            patientBtn.classList.add('active');
            doctorBtn.classList.remove('active');
            patientFormSection.classList.add('active');
            doctorFormSection.classList.remove('active');
        }
    });

    doctorBtn.addEventListener('click', () => {
        if (!doctorBtn.classList.contains('active')) {
            doctorBtn.classList.add('active');
            patientBtn.classList.remove('active');
            doctorFormSection.classList.add('active');
            patientFormSection.classList.remove('active');
        }
    });

    // --- Patient Login Logic ---
    patientLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        patientErrorMessage.textContent = ''; 

        const email = document.getElementById('patient-email').value;
        const password = document.getElementById('patient-password').value;

        try {
            const response = await fetch(`${API_URL}/patient/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful, dashboard par redirect karo
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'patient_dashboard.html';
            } else {
                patientErrorMessage.textContent = data.error || 'Login failed. Please try again.';
            }
        } catch (error) {
            console.error('Login Error:', error);
            patientErrorMessage.textContent = 'An error occurred. Please check the console.';
        }
    });
    
    // --- Patient Signup Logic ---
    patientSignupBtn.addEventListener('click', async () => {
        patientErrorMessage.textContent = ''; // Clear previous error message

        const name = document.getElementById('patient-name').value;
        const email = document.getElementById('patient-email').value;
        const password = document.getElementById('patient-password').value;

        if (!name || !email || !password) {
            patientErrorMessage.textContent = 'Please fill all fields for signup.';
            return;
        }

        try {
            const response = await fetch(`${API_URL}/patient/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.status === 201) {
                patientErrorMessage.style.color = 'green';
                patientErrorMessage.textContent = 'Signup successful! You can now log in.';
            } else {
                patientErrorMessage.style.color = '#dc3545';
                patientErrorMessage.textContent = data.error || 'Signup failed. Please try again.';
            }
        } catch (error) {
            console.error('Signup Error:', error);
            patientErrorMessage.textContent = 'An error occurred during signup.';
        }
    });


    // --- Doctor Login Logic ---
    doctorLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        doctorErrorMessage.textContent = '';

        const doctor_id = document.getElementById('doctor-id').value;
        const password = document.getElementById('doctor-password').value;

        try {
            const response = await fetch(`${API_URL}/doctor/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctor_id, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Doctor login successful, redirect to doctor dashboard
                // Abhi ke liye, hum sirf ek alert dikhayenge
                alert(`Welcome Dr. ${data.name}! Redirecting...`);
                // window.location.href = 'doctor_dashboard.html'; // Jab doctor page ban jayega
            } else {
                doctorErrorMessage.textContent = data.error || 'Login failed. Please try again.';
            }
        } catch (error) {
            console.error('Doctor Login Error:', error);
            doctorErrorMessage.textContent = 'An error occurred. Please check the console.';
        }
    });
});
