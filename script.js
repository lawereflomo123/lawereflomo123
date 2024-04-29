const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
const weatherInfo = document.getElementById('weather-info');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value;
    fetchWeatherData(cityInput);
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherInfo.innerHTML = '<p>City not found. Please try again.</p>';
            } else {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const cityName = data.name;
                
                weatherInfo.innerHTML = `
                    <h2>${cityName}</h2>
                    <p>${weatherDescription}</p>
                    <p>Temperature: ${temperature}°C</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
        });
}
