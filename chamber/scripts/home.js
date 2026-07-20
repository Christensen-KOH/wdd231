// Automatically update footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger Menu Toggle
const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#primary-nav');

// Set initial button icon
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
// Membership Spotlight Logic
// ==========================================
const membersUrl = 'data/members.json';
const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        const members = await response.json();
        
        // Filter out Level 1 members (Keep only Silver and Gold)
        const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        
        // Randomly shuffle the qualified members array
        const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
        
        // Select the first 3 members from the shuffled array
        const selectedMembers = shuffledMembers.slice(0, 3);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function displaySpotlights(members) {
    // Clear any loading text or fallback content
    spotlightContainer.innerHTML = '';

    members.forEach(member => {
        // Determine the text to show based on the level number
        const membershipTier = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';

        // Create the card element
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');
        
        // Inject the HTML template
        spotlightCard.innerHTML = `
            <h4>${member.name}</h4>
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <p class="tier">${membershipTier}</p>
            <hr>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        
        spotlightContainer.appendChild(spotlightCard);
    });
}

// Initialize the fetch
getSpotlightMembers();

// ==========================================
// OpenWeatherMap API Logic (Abidjan)
// ==========================================

// Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API Key
const myKey = 'fcde11b7b5853a30022d668ad539808c'; 

// Coordinates for Abidjan, Ivory Coast
const myLat = '5.30966';
const myLon = '-4.01266';

// API Endpoints
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&units=metric&appid=${myKey}`;

// Fetch Current Weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching current weather:", error);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherDesc = document.querySelector('#weather-desc');
    const iconDiv = document.querySelector('#weather-icon');

    // Set Temperature
    currentTemp.innerHTML = `<strong>${Math.round(data.main.temp)}&deg;C</strong>`;
    
    // Capitalize each word in the description
    const description = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    weatherDesc.textContent = description;

    // Set Icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconDiv.innerHTML = `<img src="${iconUrl}" alt="${description} icon" width="100" height="100">`;
}

// Fetch 3-Day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

// Display 3-Day Forecast
function displayForecast(data) {
    const forecastList = document.querySelector('#forecast-list');
    forecastList.innerHTML = ''; // Clear previous items

    // Filter the array to only grab readings from 12:00:00 PM each day
    // Then slice the array to only keep the first 3 days
    const dailyData = data.list.filter(reading => reading.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyData.forEach(day => {
        // Convert the Unix timestamp to a readable day of the week
        const date = new Date(day.dt * 1000);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        
        const temp = Math.round(day.main.temp);
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;C`;
        forecastList.appendChild(listItem);
    });
}

// Initialize the API calls
fetchCurrentWeather();
fetchForecast();