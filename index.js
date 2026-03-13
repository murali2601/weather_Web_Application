// ─── Config ───────────────────────────────────────────────────────────────────
const CONFIG = {
  apiKey: 'de10bd538f8d5667b9b453e94921531d',
  apiURL: 'https://api.openweathermap.org/data/2.5/weather',
  bgUrl: 'https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg',
  units: 'metric', 
};

// ─── DOM References ───────────────────────────────────────────────────────────
const elements = {
  cityInput:    document.querySelector('#cityInput'),
  searchBtn:    document.querySelector('#search-btn'),
  weatherOutput:document.querySelector('#weatherOutput'),
  dateOutput:   document.querySelector('#date'),
  timeOutput:   document.querySelector('#time'),
  feelsLike:    document.querySelector('#feelsLike'),
  pressure:     document.querySelector('#pressure'),
  humidity:     document.querySelector('#humidity'),
  wind:         document.querySelector('#wind'),
  visibility:   document.querySelector('#visibility'),
  clouds:       document.querySelector('#clouds'),
  description:  document.querySelector('#description'),
  otherData:    document.querySelector('#otherData'),
};

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  document.body.style.backgroundImage = `url(${CONFIG.bgUrl})`;
  elements.otherData.style.display = 'none';
  elements.dateOutput.innerText = `Date: ${new Date().toLocaleDateString()}`;

  // Live clock — updates every second
  updateTime();
  setInterval(updateTime, 1000);

  // Event listeners
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function updateTime() {
  elements.timeOutput.innerText = `Time: ${new Date().toLocaleTimeString()}`;
}

function setLoadingState(isLoading) {
  elements.searchBtn.disabled = isLoading;
  elements.searchBtn.innerText = isLoading ? 'Searching...' : 'Search';
}

// ─── Core Logic ───────────────────────────────────────────────────────────────
async function getWeather(city) {
  const url = `${CONFIG.apiURL}?q=${city}&appid=${CONFIG.apiKey}&units=${CONFIG.units}`;

  const response = await fetch(url);

  if (!response.ok) {
    const message = response.status === 404
      ? `City "${city}" not found. Please check the name and try again.`
      : `Server error (${response.status}). Please try again later.`;
    throw new Error(message);
  }

  return response.json();
}

function updateUI(data) {
  elements.weatherOutput.innerText = `${data.main.temp.toFixed(1)} °C`;
  elements.feelsLike.innerText     = `Feels Like: ${data.main.feels_like.toFixed(1)} °C`;
  elements.pressure.innerText      = `Pressure: ${data.main.pressure} hPa`;
  elements.humidity.innerText      = `Humidity: ${data.main.humidity}%`;
  elements.wind.innerText          = `Wind Speed: ${data.wind.speed} m/s`;
  elements.visibility.innerText    = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;
  elements.clouds.innerText        = `Cloudiness: ${data.clouds.all}%`;
  elements.description.innerText   = `Location: ${data.name}, ${data.sys.country}`;
  elements.otherData.style.display = 'grid';
}

async function handleSearch() {
  const city = elements.cityInput.value.trim();

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  try {
    setLoadingState(true);
    const data = await getWeather(city);
    updateUI(data);
  } catch (error) {
    console.error('Weather fetch failed:', error);
    alert(error.message);
  } finally {
    setLoadingState(false);
  }
}

init();