const mymap = L.map('issMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {attribution});
tiles.addTo(mymap);

const issIcon = L.icon({
    iconUrl: 'images/iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
const URL = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true; 

async function getData() {
    const response = await fetch(URL);
    const data = await response.json();
    const {
        latitude,
        longitude
    } = data;
    console.log(latitude, longitude);
    marker.setLatLng([latitude, longitude]);
    if(firstTime){
        mymap.setView([latitude, longitude], 3);
        firstTime = false;
    }
    document.getElementById('lat').textContent = latitude.toFixed(5);
    document.getElementById('lon').textContent = longitude.toFixed(5);
}

getData();
setInterval(getData, 1500); // Not ideal in case of slow connection.