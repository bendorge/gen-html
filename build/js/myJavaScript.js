// JavaScript Document
function addHTML() {
	/*
	for (i = 1; i < 11; i++) {
		var myText = document.getElementById("newCode").innerHTML;
		myText = myText + "<p>The number is at: " + i + "</p>";
		document.getElementById("newCode").innerHTML = myText;	
	}
	*/
	var bookCar = true; 
	var newHTML = "";
	
	if (bookCar == true) { 
		newHTML = "<p>Car booking section goes here</p>";	
	} else {
		newHTML = "<p>You decided not to book a car</p>";	
	}
	newHTML = newHTML + "<p>Checkout button goes here</p>";
	
	document.getElementById("newCode").innerHTML = newHTML;
}






