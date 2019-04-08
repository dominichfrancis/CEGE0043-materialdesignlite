var client;

// create point, line and poly
function addPointLinePoly() {

	var uclQuizMarker = L.marker([51.5248, -0.1336]).addTo(mymap)
	.bindPopup("<b>Hello! Welcome to the UCL quiz tour!</b><br />UCL Main Building.").openPopup();
	mymap.setView([51.5248, -0.1336], 12);

// mymap.fitBounds(uclQuizMarker.getBounds());

    //adding a circle
    L.circle([51.5,-0.09],100, {
    	color:'red',
    	fillColor:'#f03',
    	fillOpacity: 0.5
        }).addTo(mymap);


/*	var myLine = L.polygon([
		[51.504, -0.02],
		[51.51, -0.08]
		],{
		color: 'red',
	    fillColor: '#f03',
	    fillOpacity: 0.5
	    }).addTo(mymap).bindPopup("I am a line.");*/

}
var xhrFormData;

function startFormDataLoad() {
	xhrFormData = new XMLHttpRequest();
	var url = 'http://developer.cege.ucl.ac.uk:'+httpPortNumber+'/getQuizPoints/'+httpPortNumber;
	//url = url + '/getGeoJSON/getQuizPoints/'+httpPortNumber;
	xhrFormData.open('GET',url, true);
	xhrFormData.onreadystatechange = formDataResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
	xhrFormData.send();
} 
	// create the code to wait for the response from the data server, and process the response once it isreceived
	// this function listens out for the server to say that the data is ready - i.e. has state 4
function formDataResponse() {

	if (xhrFormData.readyState == 4) {
	var formData = xhrFormData.responseText;
	loadFormData(formData);
	}
}

// keep layer gloabl so we can automatically pop up a pop up menu on a point if necessary

var formLayer;

function loadFormData(formData) {

// convert the text recived from the server to JSON
var formJSON = JSON.parse(formData);

// load the geoJSON layer
formLayer = L.geoJson(formJSON,
{
// use point to layer to create the points
pointToLayer: function (feature, latlng)
{
// in this case we create a div string from the html using the data values
var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>";
htmlString = htmlString + "<h3>"+feature.properties.question_text + "</h3><br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_1'/>"+feature.properties.answer_1+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.answer_4+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_4'/>"+feature.properties.port_id+"<br>";
htmlString = htmlString + "<button onclick='checkAnswer(" +feature.properties.id + ");return false;'>Submit Answer</button>";

// now include a hidden element with the answer
// in this case the answer is always the first choice
// for the assignment this will of course vary - you can use feature.properties.correct_answer
htmlString = htmlString + "<div id=answer" + feature.properties.id +" hidden>1</div>";
htmlString = htmlString + "</div>";
return L.marker(latlng).bindPopup(htmlString);
},
}).addTo(mymap);
}

// add method to process the button click in this pop up
function checkAnswer(questionID) {
	// get the hidden div answer
	// note carefully - do this before pop-up is closed or will destroy the div!
	var answer = document.getElementById("answer"+questionID).innerHTML;

	// now check the question radio buttons
	var correctAnswer = false;
	var answerSelected = 0;
	for (var i=1; i < 5; i++) {
		if (document.getElementById(questionID+"_"+i).checked) {
			answerSelected = i;
		}
		if ((document.getElementById(questionID+"_"+i).checked) && (i == answer)) {
			alert ("Well done");
			correctAnswer = true;
		}
	}
	if (correctAnswer === false) {
		alert("Better luck next time");
	}

	// now to close the popup
	mymap.closePopup();
}

//need to upload using the answer slected variable


	// the code to upload the answer to the server would go here
	// call an AJAX routine using the data
	// the answerSelected variable holds the number of the answer
	//that the user picked

function closestFormPoint() {
	//take leaflet formData layer
	// go through each point once at a time
	// and measure the distance to warren street station
	// for the closest point show the pop up of that point

	var minDistance = 100000000000;
	var closestFormPoint = 0;
	// in this example will use the lat/lng of warrenstreet
	// in the assignment this should be the user's location
	var userlat = 51.524048;
	var userlng = -0.139924;
	formLayer.eachLayer(function(layer) {
		var distance = calculateDistance(userlat,userlng,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
		if (distance < minDistance) {
			minDistance = distance;
			closestFormPoint = layer.feature.properties.id;
		}

	});

	// for this to be a proximity alert, the minDistance must be
	// closer than a given distance - you can check that here
	// using an if statement

	// show the popup for the closest point
	formLayer.eachLayer(function(layer) {
		if (layer.feature.properties.id == closestFormPoint) {
			layer.openPopup();
		}
	});
}


