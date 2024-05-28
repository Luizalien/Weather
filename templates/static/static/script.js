document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    const response = await fetch('/get_weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
    });
    const data = await response.json();

    if (response.status === 200) {
        updateWeather(data);
    } else {
        alert('City not found');
    }
}

function updateWeather(data) {
    document.getElementById('temperature').textContent = `Temperature: ${data.temperature}°C`;
    document.getElementById('condition').textContent = `Condition: ${data.description}`;
    document.getElementById('location').textContent = `Location: ${data.location}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;

    document.querySelector('.weather-info').classList.add('active');
}
