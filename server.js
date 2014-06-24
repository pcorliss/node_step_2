var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var memjs = require('memjs');
var mc = memjs.Client.create(null, {expires: 15});
var h = require('http');

var enabled = function(cb, fail) {
  mc.get('features', function(err, valBuff) {
    var features, rawJSON;
    if(valBuff){
      rawJSON = valBuff.toString('utf-8');
      features = JSON.parse(rawJSON);
    }
    if(features && features.step2){
      cb()
    } else {
      var options = {
        host: 'vuln.alttab.org',
        port: 80,
        path: '/features'
      };

      h.get(options, function(res) {
        var output = '';
        res.on('data', function (chunk) {
          output += chunk;
        });

        res.on('end', function() {
          var newFeatures = JSON.parse(output);
          mc.set('features', output, function(){});
          if(newFeatures && newFeatures.step2){
            cb();
          } else {
            fail();
          }
        });
      });
    }
  });
};

app.get('/', function(req, res){
  enabled(function(){
    res.sendfile('index.html');
  },function(){
    res.sendfile('fail.html');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    enabled(function(){
      io.emit('chat message', msg);
    }, function(){
      io.emit('chat message', 'Lost to the ether');
    });
  });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:5000');
});
