import { fetchIdioms } from './api.js';
import { displayIdioms } from './ui.js';

async function initializeApp() {
    // 1. API & Dynamic Carousel Logic
    const idiomContainer = document.getElementById('idiom-container');
    if (idiomContainer) {
        const idiomsList = await fetchIdioms();
        displayIdioms(idiomsList, 'idiom-container');
    }

    // Footer Date Logic
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("current-year");
    const modifiedElement = document.getElementById("lastModified");
    
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    if (modifiedElement) {
        modifiedElement.textContent = "Last Modified: " + document.lastModified;
    }

    // Mentor Auto-Fill (For Booking Page)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTutor = urlParams.get('tutor');
    const tutorInput = document.getElementById('tutor-display');
    if (selectedTutor && tutorInput) {
        tutorInput.value = selectedTutor;
    }

    // Hamburger Menu Logic
    const mainnav = document.querySelector('.nav');
    const hambutton = document.querySelector('#menu');
    
    // Set the initial hamburger icon if it's empty
    if (hambutton && hambutton.textContent.trim() === "") {
        hambutton.textContent = "☰";
    }

    if (hambutton && mainnav) {
        hambutton.addEventListener('click', () => {
            mainnav.classList.toggle('show');
            hambutton.classList.toggle('show');
            
            // Toggle between the hamburger and the X
            if (hambutton.textContent.includes("✖")) {
                hambutton.textContent = "☰";
            } else {
                hambutton.textContent = "✖";
            }
        });
    }

    // Newsletter Form Logic (localStorage)
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
        });
    }

    // Contact Form Logic (localStorage)
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
                if (purposeText === 'technical') purposeText = 'technical English question';
                if (purposeText === 'curriculum') purposeText = 'curriculum details request';
                
                contactConfirmation.innerHTML = `
                    <h3 style="color: var(--primary-color); margin-bottom: 10px;">Message Sent!</h3>
                    <p>Thank you, <strong>${newMessage.name}</strong>. We have received your ${purposeText}.</p>
                    <br>
                    <p>A reply will be sent to <em>${newMessage.email}</em> shortly.</p>
                `;
            }
        });
    }

    // Booking Confirmation Data Display
    const bookingDetailsContainer = document.getElementById('booking-details');
    
    if (bookingDetailsContainer) {
        // We reuse the urlParams variable if it's already defined, or just call it directly from window
        const params = new URLSearchParams(window.location.search);
        
        // Extract the parameters matching the 'name' attributes from your form
        const tutor = params.get('tutor') || 'Not specified';
        const name = params.get('name') || 'Guest';
        const email = params.get('email') || 'Not specified';
        const lessonTime = params.get('lesson-time') || 'Not specified';
        const level = params.get('level') || 'Not specified';
        const goal = params.get('goal') || 'Not specified';
        
        // Make the date and time easier to read
        let formattedTime = lessonTime;
        if (lessonTime !== 'Not specified') {
            formattedTime = new Date(lessonTime).toLocaleString();
        }

        // Inject the HTML string using template literals
        bookingDetailsContainer.innerHTML = `
            <h3 style="color: var(--primary-color); margin-bottom: 15px;">Your Booking Summary:</h3>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Mentor:</strong> ${tutor}</li>
                <li><strong>English Level:</strong> <span style="text-transform: capitalize;">${level}</span></li>
                <li><strong>Requested Time:</strong> ${formattedTime}</li>
                <li><strong>Goal:</strong> <em>"${goal}"</em></li>
            </ul>
        `;
    }

    //Navigation Wayfinding
    const navLinks = document.querySelectorAll('.nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Check if the link's href matches the current page URL
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

// Start the app when the HTML is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);