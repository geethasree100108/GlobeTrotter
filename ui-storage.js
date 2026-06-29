
let data;
const card = document.getElementById("weather-container");
function saveCities(cities){
    localStorage.setItem("data",JSON.stringify(cities));
}

window.onload = function(){
    let stored = localStorage.getItem("data");
    let parsed;
    if(stored){
        parsed = JSON.parse(stored);

        displayWeather(parsed);
    }
    else{
       parsed = []; 
    }
};

function showLoading(){
     card.innerHTML = `
     <div class = "loading-spinner-container>
        <div class="spinner"></div>
        <p>Syncing climate records...</p>
     </div>`;   
}

function displayWeather(parsed){
   
    card.innerHTML = "";

    if(!parsed || parsed.length ===0){
        card.innerHTML = `
            <div class="empty-state">
                <p>No locations selected. Use the search field above to track metrics.</p>    
            </div>`;
            return;
    }
    parsed.forEach((item,index)=>{
        const cardHTML = `
            <div class="weather-card">
                <button class="delete-btn" onclick="handleDeleteCity(${index})">&times;</button>
                <h3>${item.name}</h3>
                <div class="temp-display">${Math.round(item.main.temp)}°C</div>
                <div class="details">
                    <p>Humidity: ${item.main.humidity}%</p>
                    <p>Wind: ${item.wind.speed}m/s</p>
                    <p class="condition">${item.weather[0].description}</p>
                </div>
            </div>`;

        let div = document.createElement("div");
        div.textContent = item;
        card.appendChild(div);
    });
}

