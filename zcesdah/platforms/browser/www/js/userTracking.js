var client;


function trackLocation() {

	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation not supported by browser";
	}
	}

	var userMarker
	function showPosition(position) {
    userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
    .bindPopup("<b>You were here</b>");
    mymap.setView([position.coords.latitude.position.coords.longitude],13)}
