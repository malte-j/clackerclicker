console.log('Clacker Clicker v0.0.1')
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//Database for storing the click count
console.log('loading database...');
var data = fs.readFileSync(__dirname + '/db.json');
var db = JSON.parse(data);
console.log(db);

var users = 0;

//write clicks to file every hour
setInterval(saveDataToFile, 3600000);

//serves index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
	//app.use(express.static('public'));
});

io.on('connection', function(socket){
  console.log('a user connected');
	//send click count to users
	io.emit('clicks', db.clicks);
	users++;
	io.emit('users', users);
	//click event incoming, send click count to all
  socket.on('click', function(){
    console.log('click');
		db.clicks++;
		io.emit('clicks', db.clicks);
	});
	
  socket.on('disconnect', function(){
    console.log('user disconnected');
		users--;
		io.emit('users', users);
  });
});

http.listen(8080, function(){
  console.log('listening on port 8080');
});

//Saves data to file, in sync or async mode
function saveDataToFile (sync) {
	console.log('saving data to file');

	var data = JSON.stringify(db, null, 2);
	if(sync){
		console.log('saving data synchronous');
		fs.writeFileSync(__dirname + '/db.json', data);
		console.log('data saved succefully');
	} else {
		fs.writeFile(__dirname + '/db.json', data, function(err){
		if(err)
			console.log(err);
		else
			console.log('data saved succesfully')
	});
	}
}

//exit handler
process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit){
			saveDataToFile(true);
			process.exit();
		};
}

process.on('exit', exitHandler.bind(null,{cleanup:true})); //do something when app is closing
process.on('SIGINT', exitHandler.bind(null, {exit:true})); //catches ctrl+c event
process.on('uncaughtException', exitHandler.bind(null, {exit:true})); //catches uncaught exceptions