console.log('Starting Twitch integration server for OpenRCT2...');

const tmi = require("tmi.js");

Client = new tmi.client({
  identity:
  {
      username: process.env.USERNAME,
      password: process.env.OAUTH
  },
  connection:
  {
      reconnect: true,
      reconnectInterval: 250,
      reconnectDecay: 2.0
  }
});

Client.connect().then(function ()
    {
        console.log('Connected with Twitch.');

        const HTTP = require('http');
        const API = require('./scripts/API.js');
        API.Initialise(Client);

        console.log('Server initialised.');

        var App = HTTP.createServer(function (Req, Res)
        {
            Res.writeHead(200, {'Content-Type': 'application/json'});
        
            API.Request(Req.url, function (ReturnValue)
                {
                    Res.write(JSON.stringify(ReturnValue));
                    Res.end();
                }
            );
        });

        App.listen(process.env.PORT, function()
        {
          console.log('\nServer started at *:' + process.env.PORT);
        });
    }
);