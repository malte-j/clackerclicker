var socket = io('http://localhost:8080/');
var app = {
    el: '#app',
    data: {

    }
}
var btn = document.getElementById("btn");
var clickCounter = document.getElementById("clickCounter");
var userCounter = document.getElementById("userCounter");

btn.onclick = function(){
    socket.emit('click');
};
socket.on('clicks', function(count){
    clickCounter.innerText = count + " clicks";
});
socket.on('users', function(count){
    userCounter.innerText = count + " users online";
});