document.addEventListener("DOMContentLoaded", () => {
    /* Footer */
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("current-year");
    const modifiedElement = document.getElementById("lastModified");

    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    if (modifiedElement) {
        modifiedElement.textContent = "Last Modified: " + document.lastModified;
    }

    /* Mentor Auto-Fill (For Booking Page) */
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTutor = urlParams.get('tutor');
    const tutorInput = document.getElementById('tutor-display');

    if (selectedTutor && tutorInput) {
        tutorInput.value = selectedTutor;
    }

    /* Hamburger Menu */
    const mainnav = document.querySelector('.nav');
    const hambutton = document.querySelector('#menu');

    if (hambutton && mainnav) {
        hambutton.addEventListener('click', () => {
            mainnav.classList.toggle('show');
            hambutton.classList.toggle('show');

            if (hambutton.textContent === "☰") {
                hambutton.textContent = "✖";
            } else {
                hambutton.textContent = "☰";
            }
        });
    }

    const newsletterForm = document.querySelector(".newsletter form");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevents the page from reloading

            const name = document.getElementById("news-name").value;
            const email = document.getElementById("news-email").value;

            const userData = {
                name: name,
                email: email,
                date: new Date().toLocaleDateString()
            };


            let subscribers = JSON.parse(localStorage.getItem("newsletterList")) || [];

            subscribers.push(userData);

            localStorage.setItem("newsletterList", JSON.stringify(subscribers));

            newsletterForm.innerHTML = `<p class="confirmation">Thanks for subscribing, ${name}! We've saved your info.</p>`;

            console.log("Current Subscribers:", subscribers);
        });
    }

    /* Contact Form Logic */
    const contactForm = document.getElementById('contact-form');
    const contactConfirmation = document.getElementById('contact-confirmation');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            const selectedPurpose = document.querySelector('input[name="purpose"]:checked').value;
            const wantsNewsletter = document.getElementById('newsletter').checked;

            const newMessage = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                purpose: selectedPurpose,
                message: document.getElementById('message').value,
                subscribeToNewsletter: wantsNewsletter,
                timestamp: new Date().toLocaleString()
            };

            let allMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];

            allMessages.push(newMessage);

            localStorage.setItem('contactMessages', JSON.stringify(allMessages));

            contactForm.style.display = 'none';

            if (contactConfirmation) {
                let purposeText = newMessage.purpose;
                if (purposeText === 'general') purposeText = 'general inquiry';
                if (purposeText === 'reservation') purposeText = 'reservation question';
                if (purposeText === 'suggestion') purposeText = 'website suggestion';

                contactConfirmation.innerHTML = `
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">Message Sent!</h3>
                    <p>Thank you, <strong>${newMessage.name}</strong>. We have received your ${purposeText}.</p>
                    <br>
                    <p>A reply will be sent to <em>${newMessage.email}</em> shortly.</p>
                `;
            }
        });
    }
});