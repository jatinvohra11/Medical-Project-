document.addEventListener('DOMContentLoaded', () => {
    // Get the toggle buttons and form sections
    const patientBtn = document.getElementById('patient-btn');
    const doctorBtn = document.getElementById('doctor-btn');
    const patientForm = document.getElementById('patient-form');
    const doctorForm = document.getElementById('doctor-form');

    // Add click event listener to the patient button
    patientBtn.addEventListener('click', () => {
        // If the patient button is not already active, make it active
        if (!patientBtn.classList.contains('active')) {
            // Toggle active class on buttons
            patientBtn.classList.add('active');
            doctorBtn.classList.remove('active');

            // Toggle active class on forms to show patient form and hide doctor form
            patientForm.classList.add('active');
            doctorForm.classList.remove('active');
        }
    });

    // Add click event listener to the doctor button
    doctorBtn.addEventListener('click', () => {
        // If the doctor button is not already active, make it active
        if (!doctorBtn.classList.contains('active')) {
            // Toggle active class on buttons
            doctorBtn.classList.add('active');
            patientBtn.classList.remove('active');

            // Toggle active class on forms to show doctor form and hide patient form
            doctorForm.classList.add('active');
            patientForm.classList.remove('active');
        }
    });

    // Prevent form submission for this demo
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would handle form submission here.
            // For now, we just log a message.
            alert('Form submission is disabled for this demo.');
        });
    });
});
