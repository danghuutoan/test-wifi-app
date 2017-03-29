var net = require('net');


var TestSSID = 'OLLI_VNPT';
var TestPassword = 'olli-ai2016';

function SendResponse(Client, status)
{
	var jsonData = {
	    'Response': 'WifiSetup',
        'data':{   
            'status': status   
        }
	};

	Client.write(JSON.stringify(jsonData));
}
function WifiHandler(Client, WifiData){
	console.log(WifiData.ssid);
	console.log(WifiData.password);

	if(WifiData.ssid == TestSSID && WifiData.password == TestPassword)
	{
		SendResponse(Client, 'successful');
	}
	else
	{
		SendResponse(Client, 'failed');
	}

}

function EventHandler(Client, EventData){
	console.log(EventData.event);
	if(EventData.event == 'WifiSetup')
	{
		WifiHandler(Client, EventData.data);
	}
}

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.on('data', function(data){
		console.log(data.toString());
		var jsonData = JSON.parse(data);
		EventHandler(socket, jsonData);
	})
});

server.listen(1337, '127.0.0.1');

