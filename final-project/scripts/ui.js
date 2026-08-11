// State variables to track the current card
let currentIndex = 0;
let idiomsData = [];

export function displayIdioms(idioms, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; 

    idiomsData = idioms; // Save the fetched data to our local state

    // 1. Build the carousel structure with buttons
    container.innerHTML = `
        <div class="carousel-container">
            <button id="prev-btn" class="carousel-btn" aria-label="Previous Idiom">&#10094;</button>
            <div id="idiom-display"></div>
            <button id="next-btn" class="carousel-btn" aria-label="Next Idiom">&#10095;</button>
        </div>
    `;

    // 2. Render the first idiom
    renderSingleIdiom();

    // 3. Attach Event Listeners to the buttons
    document.getElementById('prev-btn').addEventListener('click', () => {
        // Go back 1, or loop to the end if we are at the beginning
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : idiomsData.length - 1;
        renderSingleIdiom();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        // Go forward 1, or loop to the beginning if we are at the end
        currentIndex = (currentIndex < idiomsData.length - 1) ? currentIndex + 1 : 0;
        renderSingleIdiom();
    });
}

// Helper function to inject the current idiom into the display div
function renderSingleIdiom() {
    const display = document.getElementById('idiom-display');
    const item = idiomsData[currentIndex];
    
    display.innerHTML = `
        <div class="learning-card">
            <h3>${item.idiom}</h3>
            <p class="tag"><strong>Level:</strong> ${item.level}</p>
            <p><strong>Meaning:</strong> ${item.meaning}</p>
            <blockquote>"${item.example}"</blockquote>
            <p style="margin-top: 15px; font-size: 0.8rem; color: gray;">
                Card ${currentIndex + 1} of ${idiomsData.length}
            </p>
        </div>
    `;
}