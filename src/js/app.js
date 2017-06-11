var socket = io('http://192.168.178.59:8080/');
window.onload = start;

function start(){
	var btn = document.getElementById("btn");
	var keySvg = document.getElementById('key');
	var userCounter = document.getElementById("userCounter");
	
	keySvg.addEventListener("load", function () {
		var svgDoc = keySvg.contentDocument;
		var text = svgDoc.getElementById("text");
	});

	keySvg.onclick = function(){
		socket.emit('click');
		console.log("click");
	};
	socket.on('clicks', function(count){
		text.innerHTML = count; 

		console.log('clicks event: ' + count + " clicks");
	});
	socket.on('users', function(count){
		let users = count < 2 ? " user " : " users ";
		userCounter.innerText = count + users + "online";

		console.log("user event: " + count + users + "online" );
	});
};