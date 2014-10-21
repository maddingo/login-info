var http = require('http');
var UtmpParser = require('utmp');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Tpye': 'application/json'});
        var p = new UtmpParser('/var/log/wtmp');
	var wtmpList = [];
	p.on('data', function(d) {
		wtmpList.push(d);
	});
	p.on('end', function() {
		res.end(JSON.stringify(wtmpList[0]));
	});
	p.run();
}).listen(8088, "0.0.0.0");
console.log('Server running at 0.0.0.0:8088');
