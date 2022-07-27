var search = document.getElementById('search');
var button = document.getElementById('button');
var idAddress = document.getElementById('id-address');
var locationId = document.getElementById('location');
var timezone = document.getElementById('timezone');
var isp = document.getElementById('isp');

var map = L.map('map');

var setMap = (lat, lng) => {
  map.setView([lat, lng], 15);

  var locationIcon = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    
}).addTo(map);


  L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};

  function fetchLocation(domain) {
    var url = `https://geo.ipify.org/api/v1?apiKey=at_YhHOdr5TCf0bEza7uDKAd0OaRcCtP`;
    if (domain) url = url.concat(`&domain=${domain}`);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        idAddress.innerText = data.ip;
        locationId.innerText = `${data.location.city}, ${data.location.region}`;
        timezone.innerText = `UTC ${data.location.timezone}`;
        isp.innerText = data.isp;
      
        var lat = data.location.lat;
        var lng = data.location.lng;
      
        setMap(lat, lng); 
      });
 }

  window.addEventListener('load', () => {
    fetchLocation();
  });

    button.addEventListener('click', e => {
        e.preventDefault();
        fetchLocation(search.value);
    }
    );

    search.addEventListener('keyup', e => {
        if (e.keyCode === 15) {
            e.preventDefault();
            fetchLocation(search.value);
        }
    }
    );
