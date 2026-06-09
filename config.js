
const AppState = {
    
    trackedCities: [],
    
    isCityTracked(cityName) {
        return this.trackedCities.some(city => city.name.toLowerCase() === cityName.toLowerCase());
    }
};