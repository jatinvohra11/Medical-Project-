document.addEventListener('DOMContentLoaded', () => {
    // --- Store and display doctor's name ---
    const doctorName = localStorage.getItem('doctorName');
    if (doctorName) {
        document.getElementById('doctor-welcome-message').textContent = `Welcome, ${doctorName}`;
    }

    // --- Logout Functionality ---
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        // Clear any stored data
        localStorage.removeItem('doctorName');
        
        // Redirect to the login page
        window.location.href = 'index.html';
    });
});
