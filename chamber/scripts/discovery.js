// Automatically update footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger Menu Toggle
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#primary-nav');
menuButton.textContent = '≡';

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    if (navigation.classList.contains('open')) {
        menuButton.textContent = 'X'; 
    } else {
        menuButton.textContent = '≡';
    }
});

// ==========================================
// Local Storage Visit Tracking
// ==========================================
const msToDays = 84600000; // Milliseconds in one day
const visitMessageElement = document.getElementById('visit-message');

// Get the current date in milliseconds
const today = Date.now();

// Get the stored last visit date, or default to 0 if it doesn't exist
const lastVisit = Number(window.localStorage.getItem('discoverLastVisit')) || 0;

if (lastVisit === 0) {
    // First time visiting
    visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    // Calculate the difference in time
    const timeDifference = today - lastVisit;
    const daysDifference = Math.floor(timeDifference / msToDays);

    if (timeDifference < msToDays) {
        // Visited less than a day ago
        visitMessageElement.textContent = "Back so soon! Awesome!";
    } else {
        // Visited 1 or more days ago
        if (daysDifference === 1) {
            visitMessageElement.textContent = `You last visited 1 day ago.`;
        } else {
            visitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
}

// Update the local storage with today's timestamp for the next time they visit
window.localStorage.setItem('discoverLastVisit', today);