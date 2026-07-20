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
// Join Page Logic
// ==========================================

// 1. Set Hidden Timestamp
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    const now = new Date();
    timestampField.value = now.toISOString();
}

// 2. Dialog Modal Logic
const dialogs = {
    np: document.getElementById('dialog-np'),
    bronze: document.getElementById('dialog-bronze'),
    silver: document.getElementById('dialog-silver'),
    gold: document.getElementById('dialog-gold')
};

const buttons = {
    np: document.getElementById('btn-np'),
    bronze: document.getElementById('btn-bronze'),
    silver: document.getElementById('btn-silver'),
    gold: document.getElementById('btn-gold')
};

// Open Dialogs
for (const key in buttons) {
    if (buttons[key]) {
        buttons[key].addEventListener('click', () => {
            dialogs[key].showModal();
        });
    }
}

// Close Dialogs
const closeButtons = document.querySelectorAll('.close-dialog');
closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Find the closest dialog element and close it
        const dialog = e.target.closest('dialog');
        dialog.close();
    });
});