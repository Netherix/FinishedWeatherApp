const apiKey = "b486d7dcd0630b3d2852c1056d742501";

const backgroundVideos = {
    'Clear': 'images/sunny-day-moewalls-com.mp4',
    'Clouds': 'images/cloudy.mp4',
    'Rain': 'images/lofi-rainy-cozy-shop-moewalls-com.mp4',
    'Snow': 'images/winter-snow-street-moewalls-com.mp4',
    'Thunderstorm': 'images/thunder.mp4',
    'Fog': 'images/fog.mp4'
};

document.getElementById("search-button").addEventListener("click", getWeatherData);

async function getWeatherData(event) {
    event.preventDefault();

    try {
        const zipCode = document.getElementById("weather-input").value;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Weather data not found.");
        }

        const data = await response.json();

        // Extract the forecast from the response data
        const forecast = data.weather[0].main;

        // Select the background video based on the forecast
        const backgroundVideoUrl = backgroundVideos[forecast];

        // Set the background video source
        document.getElementById("video-background").src = backgroundVideoUrl;

        // Convert temperatures from Kelvin to Fahrenheit
        const temperatureHighKelvin = data.main.temp_max;
        const temperatureLowKelvin = data.main.temp_min;
        const temperatureHighFahrenheit = convertKelvinToFahrenheit(temperatureHighKelvin);
        const temperatureLowFahrenheit = convertKelvinToFahrenheit(temperatureLowKelvin);

        // Display the weather information on the webpage
        document.getElementById("high").textContent = `High: ${temperatureHighFahrenheit}°F`;
        document.getElementById("low").textContent = `Low: ${temperatureLowFahrenheit}°F`;
        document.getElementById("forecast").textContent = `Forecast: ${forecast}`;

    } catch (error) {
        console.log("Error:", error);
        // Display an error message on the webpage
        document.getElementById("weather-details").textContent = "Error fetching weather data.";
    }
}

function convertKelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
}

function changeBackgroundVideo(forecast) {
    const videoElement = document.getElementById("video-background");
    if (backgroundVideos.hasOwnProperty(forecast)) {
        videoElement.src = backgroundVideos[forecast];
    } else {
        // Default video for unknown forecast
        videoElement.src = 'images/default-video.mp4';
    }
}
