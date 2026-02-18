
document.addEventListener('DOMContentLoaded', (event) => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Stop the form from submitting normally

            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/send-email', { // Your backend endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formObject),
                });

                const result = await response.json();

                if (response.ok) {
                    formStatus.textContent = result.message;
                    formStatus.style.color = 'green';
                    contactForm.reset(); // Clear the form fields
                } else {
                    formStatus.textContent = result.message || 'An error occurred.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'An error occurred. Please try again later.';
                formStatus.style.color = 'red';
            }
        });
    }
});
        // Select all hamburger buttons and navigation menus
        
        
        const hamburgerBtns = document.querySelectorAll('.hamburger');
        const navMenus = document.querySelectorAll('.nav-menu');

        // Loop through each hamburger button to attach an event listener
        hamburgerBtns.forEach((hamburger, index) => {
            hamburger.addEventListener('click', () => {
                // Toggle the 'active' class on the current button
                hamburger.classList.toggle('active');
                // Toggle the 'active' class on the corresponding menu
                navMenus[index].classList.toggle('active');
            });
        });
