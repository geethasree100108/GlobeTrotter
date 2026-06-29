const API_KEY = "15779d94c30852ee1fb766177affc7e7";

async function fetchAllWeather(citiesArray) {
    if (!citiesArray || citiesArray.length === 0) {
        if (typeof renderWeatherCards === 'function') {
            renderWeatherCards([]);
        }
        return;
    }

    try {
        // 1. Map to an array of promises (Fixed variable name to match)
        const weatherPromises = citiesArray.map(city => {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`;
            
            return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch coordinates: ${city.lat}, ${city.lon}`);
                return response.json();
            });
        });

        // 2. Wait for all requests to finish or fail
        const results = await Promise.allSettled(weatherPromises);

        // 3. Extract successful data payloads (Fixed typo: 'fulfilled')
        const successfulWeatherData = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);

        // 4. Log errors for failed calls out of the way
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.warn(`City index ${index} (${citiesArray[index]?.name || 'Unknown'}) failed to load:`, result.reason);
            }
        });

        // 5. Safely pass data off to Member 4's UI framework
        if (typeof renderWeatherCards === 'function') {
            renderWeatherCards(successfulWeatherData);
        } else {
            console.error("renderWeatherCards function is missing. Check execution order.");
        }

    } // <--- This bracket now properly closes the try block!
    catch (error) {
        console.error("Error executing parallel weather fetch: ", error);
        const container = document.getElementById("weather-container");
        if (container) {
            container.innerHTML = `<p class="error">Failed to synchronize weather data. Try again later.</p>`;
        }
    }
} // <--- This bracket closes the fetchAllWeather function!