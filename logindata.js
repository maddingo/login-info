var http = require('http');
var UtmpParser = require('utmp');
var url = require('url');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
  var reqUrl = url.parse(req.url, true, false);
  if (!reqUrl.query.user) {
    res.end();
    return;
  }

	var wtmpList = [];
  var p = new UtmpParser('/var/log/wtmp');
 	p.on('data', function(d) {
 	    if (d.user == reqUrl.query.user && d.type == "USER_PROCESS") {
 	      wtmpList.push(d);
 	    }
	});
	p.on('end', function() {
		res.end(JSON.stringify(wtmpList));
	});
	p.run();
}).listen(8088, "0.0.0.0");
console.log('Server running at 0.0.0.0:8088');
