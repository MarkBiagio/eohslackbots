var port = process.env.PORT||1337;
var baseHost = process.env.WEBSITE_HOSTNAME || 'localhost';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var unirest = require('unirest');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

// test route
app.get('/', function (req, res) { res.status(200).send('!!yoda!!') });

app.post('/yoda', function (req, res, next) {
    //console.log(req.body);

    var userName = req.body.user_name;
    var text = req.body.text;
    var trigger_word = req.body.trigger_word;
    var yoda = "";

    if (trigger_word == "yoda:") {
        var t = text.replace(trigger_word, "");
        var t2 = t.replace(/ /g, "+");
        console.log(t2);
        var x = unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + t2)
                                .header("X-Mashape-Key", "olQfyZcLGqmshkyCJBPRg4XdAOWXp1vBR9bjsnrUJVOfinuwjR")
                                .header("Accept", "text/plain");

       // x.proxy("http://eohproxy.eoh.co.za:8080");

        x.end(function (result) {
           
            var botPayload = {
                text: result.body
            };

            // avoid infinite loop
            if (userName !== 'slackbot') {
                return res.status(200).json(botPayload);
            } else {
                return res.status(200).end();
            }
        });
    } else {
        
            return res.status(200).end();
        
    }
    
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});

