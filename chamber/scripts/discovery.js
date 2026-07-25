// Import the JSON data module
import { discoverItems } from '../data/discover.mjs';

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
        visitMessageElement.textContent = "Welcome back!";
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

// ==========================================
// Dynamic Card Generation
// ==========================================
const gallery = document.querySelector('.gallery');

// Loop through each item in the data file
discoverItems.forEach((item, index) => {
    // Create the main card container
    const card = document.createElement('article');
    // Assign a unique class to each card (card-1, card-2, etc.) so we can target them with grid-areas later
    card.className = `discover-card card-${index + 1}`; 

    // Create the Title
    const title = document.createElement('h2');
    title.textContent = item.title;

    // Create the Figure and Image (with lazy loading)
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.photo;
    img.alt = item.title;
    img.loading = 'lazy'; // Rubric requirement
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    // Create the Address
    const address = document.createElement('address');
    address.textContent = item.address;

    // Create the Description
    const desc = document.createElement('p');
    desc.textContent = item.description;

    // Create the Learn More Button
    const btn = document.createElement('button');
    btn.textContent = 'Learn More';
    btn.className = 'learn-more-btn';

    // Append all elements to the card
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(btn);

    // Append the finished card to the gallery section
    gallery.appendChild(card);
});