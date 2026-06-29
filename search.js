
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const spinner = document.getElementById("loading-spinner");

async function getCoordinates(cityName) {

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch city coordinates");
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            alert("City not found!");
            return null;
        }

        return {
            name: data[0].display_name.split(",")[0],
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };

    } catch (error) {
        console.error("Coordinate Fetch Error:", error);
        alert("Unable to fetch city information.");
        return null;
    }
}

searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const cityName = searchInput.value.trim();

    if (!cityName) {
        return;
    }

    spinner.classList.remove("hidden");

    const cityData = await getCoordinates(cityName);

    spinner.classList.add("hidden");

    if (!cityData) {
        return;
    }

    
    const alreadyTracked = window.trackedCities.some(
        city => city.name.toLowerCase() === cityData.name.toLowerCase()
    );

    if (alreadyTracked) {
        alert(`${cityData.name} is already being tracked.`);
        searchInput.value = "";
        return;
    }

    console.log("City Added:", cityData);

    
    if (typeof handleNewCityAdded === "function") {
        handleNewCityAdded(cityData);
    }

    searchInput.value = "";
});