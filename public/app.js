var socket = io();
window.onload = function(){
	alert('hi');	
	window.document.body.onload = function(){
		alert('hi'); }
};
var clickBuffer = 0;
var clacks = 0;

var app = new Vue({
	el: '#app',
	data: {
		clacks: 0
	}
}); 

function start(){
	alert('hex');
	var keySvg = document.getElementById('key');
	var keySvgDoc = document.getElementById('key').contentDocument;
	var keyText = keySvgDoc.getElementById('text');

	var userCounter = document.getElementById("userCounter");
	var clackCounter = document.getElementById("clacks");
	

	keySvg.addEventListener("load", function () {
		console.log("load keysvg");
	}); 

	keySvg.onclick = function(){
		clickBuffer++;
		app.clacks++;
		console.log("click");
	};

	setInterval(emitClicks, 100);

	socket.on('clicks', function(count){
		keyText.innerHTML = count; 

		console.log('clicks event: ' + count + " clicks");
	});

	function emitClicks() {
		if(clickBuffer > 0){
			socket.emit('click', {amount: clickBuffer})
			clickBuffer = 0;
		}
	}
	/*
	socket.on('users', function(count){
		let users = count < 2 ? " user " : " users ";
		userCounter.innerText = count + users + "online";

		console.log("user event: " + count + users + "online" );
	});
	*/
};