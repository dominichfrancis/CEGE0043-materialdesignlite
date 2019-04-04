function trackAndCircle() {
	trackLocation();
	addPointLinePoly();
	getFormData();
	loadW3HTML();
}

function startup() {
	document.addEventListener('DOMContentLoaded',function() {
		getPort();
		trackAndCircle ();
	}, false);
}

function loadW3HTML() {
	w3.includeHTML();
}