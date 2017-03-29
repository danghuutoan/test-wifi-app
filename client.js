var net = require('net');

var TestSSID = 'OLLI_VNPT';
var TestPassword = 'olli-ai2016';

function wifiConfig(server, ssid, password)
{
	var jsonData = {
	    'event': 'WifiSetup',
        'data':{   
            'ssid': ssid,   
            'password': password,    
        }
	};

	server.write(JSON.stringify(jsonData));
}
var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	// client.write('Hello, server! Love, Client.');
	wifiConfig(client, TestSSID, TestPassword);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});