
const apiKey = 'de10bd538f8d5667b9b453e94921531d'
const apiURL = `https://api.openweathermap.org/data/2.5/weather`
const bgUrl = 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg';

const cityInput = document.querySelector('#cityInput');
const searchBtn = document.querySelector('#search-btn');
const weatherOutput = document.querySelector('#weatherOutput');
const background = document.querySelector('body');
const dateOutput = document.querySelector('#date');
const timeOutput = document.querySelector('#time');
const feelsLike = document.querySelector('#feelsLike');
const pressure = document.querySelector('#pressure');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const visibility = document.querySelector('#visibility');
const clouds = document.querySelector('#clouds');
const description = document.querySelector('#description');
const otherData = document.querySelector('#otherData');
otherData.style.display = 'none'; 

dateOutput.innerText = `Date: ${new Date().toLocaleDateString()}`;
timeOutput.innerText = `Time: ${new Date().toLocaleTimeString()}`;


background.style.backgroundImage = `url(${bgUrl})`; 

async function getWeather(city) {
    try{
        const response = await fetch( apiURL + `?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);


        weatherOutput.innerText = `${(data.main.temp-273.15).toFixed(2)} C`;
        feelsLike.innerText = `Feels Like: ${(data.main.feels_like-273.15).toFixed(2)} C`;
        pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
        humidity.innerText = `Humidity: ${data.main.humidity} %`;
        wind.innerText = `Wind Speed: ${data.wind.speed} m/s`;
        visibility.innerText = `Visibility: ${data.visibility/1000} km`;
        clouds.innerText = `Cloudiness: ${data.clouds.all} %`;
        description.innerText = `Location: ${data.name}`;

    }catch(error){
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the city name and try again.');
    }
    
}
// getWeather('bangalore');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city !== ''){
        getWeather(city);
        otherData.style.display = 'grid';
    }else{
        alert('Please enter a city name');
    }
   
});
