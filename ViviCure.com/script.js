document.addEventListener('DOMContentLoaded', () => {
    // Saare zaroori elements ko select karo
    const patientBtn = document.getElementById('patient-btn');
    const doctorBtn = document.getElementById('doctor-btn');
    const patientForm = document.getElementById('patient-form');
    const doctorForm = document.getElementById('doctor-form');

    // Patient button par click event lagao
    patientBtn.addEventListener('click', () => {
        // Check karo ki button pehle se active to nahi hai
        if (!patientBtn.classList.contains('active')) {
            // Buttons par active class ko toggle karo
            patientBtn.classList.add('active');
            doctorBtn.classList.remove('active');

            // Forms ko dikhane aur chupane ke liye active class toggle karo
            patientForm.classList.add('active');
            doctorForm.classList.remove('active');
        }
    });

    // Doctor button par click event lagao
    doctorBtn.addEventListener('click', () => {
        // Check karo ki button pehle se active to nahi hai
        if (!doctorBtn.classList.contains('active')) {
            // Buttons par active class ko toggle karo
            doctorBtn.classList.add('active');
            patientBtn.classList.remove('active');

            // Forms ko dikhane aur chupane ke liye active class toggle karo
            doctorForm.classList.add('active');
            patientForm.classList.remove('active');
        }
    });

    // Demo ke liye form submission ko roko
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            // Default form submission ko roko
            e.preventDefault();
            
            // Asli application mein, aap yahan form data bhejenge.
            // উদাহরণের জন্য, আপনি একটি বার্তা লগ করতে পারেন।
            console.log('Form submission is disabled for this demo.');
        });
    });
});
