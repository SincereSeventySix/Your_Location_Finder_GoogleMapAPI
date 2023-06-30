

let map = null;
const ourCoords =  {
	latitude: 22.249769,
	longitude: 113.921303
};

window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(
			displayLocation, 
			displayError);
	}
	else {
		alert("Oops, no geolocation support");
	}
}

function displayLocation(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

	let div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

	let km = computeDistance(position.coords, ourCoords);
	let distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from Lantau Peak.";

	showMap(position.coords);
}



// Uses the Spherical Law of Cosines to find the distance
// between two lat/long points

function computeDistance(startCoords, destCoords) {
	let startLatRads = degreesToRadians(startCoords.latitude);
	let startLongRads = degreesToRadians(startCoords.longitude);
	let destLatRads = degreesToRadians(destCoords.latitude);
	let destLongRads = degreesToRadians(destCoords.longitude);

	let Radius = 6371; // radius of the Earth in km
	let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees) {
	radians = (degrees * Math.PI)/180;
	return radians;
}

// ------------------ End Ready Bake -----------------

function showMap(coords) {
	let googleLatAndLong = new google.maps.LatLng(coords.latitude, 
												  coords.longitude);
	let mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	let mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
}

function displayError(error) {
	let errorTypes = {
		0: "Unknown error",
		1: "Permission denied",
		2: "Position is not available",
		3: "Request timeout"
	};
	let errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	let div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

