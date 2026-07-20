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
// URL Parameter Parsing Logic
// ==========================================

// Grab the entire URL string
const currentUrl = window.location.href;

// Create a URL object and extract just the search parameters (everything after the '?')
const urlParams = new URL(currentUrl).searchParams;

// Function to safely extract a parameter or return a fallback string
function getParam(paramName) {
    return urlParams.get(paramName) || "Not provided";
}

// Map the URL parameters to the specific HTML span elements
document.getElementById('display-fname').textContent = getParam('fname');
document.getElementById('display-lname').textContent = getParam('lname');
document.getElementById('display-business').textContent = getParam('business');
document.getElementById('display-email').textContent = getParam('email');
document.getElementById('display-phone').textContent = getParam('phone');

// Map the membership value to a more readable string
let membershipTier = getParam('membership');
if (membershipTier === 'np') membershipTier = 'Non Profit';
if (membershipTier === 'bronze') membershipTier = 'Bronze';
if (membershipTier === 'silver') membershipTier = 'Silver';
if (membershipTier === 'gold') membershipTier = 'Gold';
document.getElementById('display-membership').textContent = membershipTier;

// Format the timestamp nicely if it exists
const timestampRaw = getParam('timestamp');
if (timestampRaw !== "Not provided") {
    // Convert the ISO string back to a readable date
    const dateObj = new Date(timestampRaw);
    document.getElementById('display-timestamp').textContent = dateObj.toLocaleString();
} else {
    document.getElementById('display-timestamp').textContent = "Unknown time";
}