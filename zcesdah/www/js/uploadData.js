function startDataUpload() {
	//call the getPort for the upload
	getPort();

	var param1 = document.getElementById("question_title").value;
	var param2 = document.getElementById("question_text").value;
	var param3 = document.getElementById("answer_1").value;
	var param4 = document.getElementById("answer_2").value;
	var param5 = document.getElementById("answer_3").value;
	var param6 = document.getElementById("answer_4").value;      
    var param8 =document.getElementById("correct_answer").value; ; 

	var postString = "&question_title="+param1+"&question_text="+param2+"&answer_1="+param3+"&answer_2="+param4+"&answer_3="+param5+"&answer_4="+param6+"&correct_answer="+param8;
	alert (postString);

	// now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	alert(postString)
	processData (postString);
}

var client;

function processData(postString) {
	client = new XMLHttpRequest();
	postString = postString + "&port_id=" + 30279;
	var url = 'http://developer.cege.ucl.ac.uk:'+ 30279 + "/uploadQuestion";
	alert(url);
	client.open('POST', url, true);
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString);
}

function dataUploaded() {// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) { // change the DIV to show the response
		alert(client.responseText);
		document.getElementById("dataUploadResult").innerHTML =  client.responseText;
	    }
}