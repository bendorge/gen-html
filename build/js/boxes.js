function displayAlert(num) {
	
	if (num == 1) {
		alert("You clicked the red box.");
	}
	if (num == 2) {
		alert("You clicked the green box.");
	}
	if (num == 3) {
		alert("You clicked the blue box.");
	}
}// JavaScript Document

var clickedText = $("p.changeMe");
clickedText.on("click", function (event) {
	clickedText.hide();
});
