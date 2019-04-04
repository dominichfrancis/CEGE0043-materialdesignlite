var client;

var forms;

// create point, line and poly
function addPointLinePoly() {

	L.marker([51.5, -0.09]).addTo(mymap)
	.bindPopup("<b>Hello!</b><br />Point of interest.").openPopup();


    //adding a circle
    L.circle([51.5,-0.09],100, {
    	color:'red',
    	fillColor:'#f03',
    	fillOpacity: 0.5
        }).addTo(mymap);


	var myLine = L.polygon([
		[51.504, -0.02],
		[51.51, -0.08]
		],{
		color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.5
	    }).addTo(mymap).bindPopup("I am a line.");

}

var formdatalayer;

function getFormData() {
	client = new XMLHttpRequest();
	var url = 'http://developer.cege.ucl.ac.uk:'+ 30279 + '/getGeoJSON/'+'london_poi'+'/geom';
	client.open('GET',url);
	client.onreadystatechange = formdataResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
	client.send();
} 
	// create the code to wait for the response from the data server, and process the response once it isreceived
	// this function listens out for the server to say that the data is ready - i.e. has state 4
function formdataResponse() {
	if (client.readyState == 4) {
	var formdata = client.responseText;
	loadFormdatalayer(formdata);
	}
} 

	// convert the received data - which is text - to JSON format and add it to the map
function loadFormdatalayer(formdata) {
	// convert the text to JSON
	var formjson = JSON.parse(formdata);
	// new line to call global variable
	forms = formjson;
	// add the JSON layer onto the map - it will appear using the default icons
	formdatalayer = L.geoJson(formjson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(formdatalayer.getBounds());
}