/**
 * MAIN CONTROLLER FLOW & CONFIGURATION
 */

// Define trackedCities globally so all other files can access it
window.trackedCities = [];

// 1. Initialization Orchestration (On Page Load)
window.addEventListener('DOMContentLoaded', () => {
    // Safety check: ensure loadCities exists, otherwise default to empty array
    if (typeof loadCities === 'function') {
        window.trackedCities = loadCities() || []; 
    }
    
    if (typeof showLoading === 'function') {
        showLoading();                 
    }
    
    if (typeof fetchAllWeather === 'function') {
        fetchAllWeather(window.trackedCities); 
    }
});

// 2. Intermediary: Handling insertions coming from Member 1
function handleNewCityAdded(newCityObject) {
    window.trackedCities.push(newCityObject);
    
    if (typeof saveCities === 'function') {
        saveCities(window.trackedCities);
    }
    if (typeof fetchAllWeather === 'function') {
        fetchAllWeather(window.trackedCities);
    }
}

// 3. Intermediary: Handling extractions triggered by Member 3's UI
function handleDeleteCity(indexToRemove) {
    window.trackedCities.splice(indexToRemove, 1);
    
    if (typeof saveCities === 'function') {
        saveCities(window.trackedCities);
    }
    if (typeof showLoading === 'function') {
        showLoading();
    }
    if (typeof fetchAllWeather === 'function') {
        fetchAllWeather(window.trackedCities);
    }
}