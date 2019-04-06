
function trackLocation() {

	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	} else {
		document.getElementById('showLocation').innerHTML = "Geolocation not supported by browser";
	}
}

	var userMarker
	function showPosition(position) {
		if (userMarker){
			mymap.removelayer(userMarker);
	}
    userMarker = L.marker([position.coords.latitude, position.coords.longitude])
    .addTo(mymap).bindPopup("<b>Tracking!</b><br />Current location.").openPopup();
    getDistance();
    mymap.setView([position.coords.latitude.position.coords.longitude],14)
}

/*
function getDistance() {
	alert('getting distance');
	// getDistanceFromPoint is the function called once the distance has been found
	navigator.geolocation.getCurrentPosition(getDistanceFromMultiplePoints);
}

function getDistanceFromPoint(position) {
	// find the coordinates of a point using this website:https://itouchmap.com/latlong.html
	// these are the coordinates for Warren Street
	var lat = 51.512974;
	var lng = -0.193565;
	// return the distance in kilometers
	var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
	if (dist < 0.1){
		L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
		.bindPopup("<b>less than 100m proximity alert</b>").openPopup();
		mymap.setView([position.coords.latitude.position.coords.longitude],2)
}
}

function getDistanceFromMultiplePoints(position) {
	var minDistance = 100000000000; //min distance
	var closestQuake = ""; //varibale to store nearestquake
	for(var i = 0; i < earthquakes.features.length; i++){
		var obj = earthquakes.features[i]; //creating variable to hold earthquake properties from data
		        var distance = calculateDistance(position.coords.latitude,position.coords.longitude,obj.geometry.coordinates[0],obj.geometry[1], 'K'); //using geometry coordinates for points to measure distance
		        if (distance < minDistance){
		        	       minDistance = distance;
		        	       closestQuake = obj.properties.place;
		        }
	}
	alert("Earthquake: " + closestQuake + "is distance" + minDistance + "away");
}


// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI;
	// convert the degree value returned by acos back to degrees from radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
	// where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
	if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
	return dist;
}
*/