var square = null;
var o = 100; // original box size
var i = 0;
var r = 0; // red value
var g = 0; // green value
var b = 0; // blue value

function moveSquare() {
	square.style.top = i + 'px';
	square.style.left = i + 'px';
	if (i > 42) {
		r++;	
	}
	if (i > 84) {
		g++;	
	}
	square.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	if (i < 100) {
		square.style.width = o + i + 'px';
		square.style.height = o + i + 'px';	
	}
	if (i != 255) {
		i++;
		setTimeout(moveSquare, 20);	
	}
}

function init() {
	square = document.getElementById("square");	
	square.style.position = 'relative';
	square.style.left = '0px';
	square.style.top = '0px';
}

window.onload = init;