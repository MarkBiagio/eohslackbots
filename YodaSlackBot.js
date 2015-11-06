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
        // These code snippets use an open-source library. http://unirest.io/nodejs
        var  x = unirest.get("https://yoda.p.mashape.com/yoda?sentence=we+must+look+to+the+future")
                                .header("X-Mashape-Key", "olQfyZcLGqmshkyCJBPRg4XdAOWXp1vBR9bjsnrUJVOfinuwjR")
                                .header("Accept", "text/plain");
        x.proxy("http://eohproxy.eoh.co.za:8080");

        x.end(function (result) {
            //console.log(result);
            //console.log(result.status, result.headers, result.body);

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





//var server = http.createServer(function (req, res) {
//    req.setEncoding('utf8')
//    var slackObject = null;
//    var responseText = "";

//    console.log('created: ');
//    var userName = req.body.user_name;
//    console.log(userName);
//    //res.writeHead(200, {"Content-Type": "text/html"});
//    //res.write("<!DOCTYPE 'html'>");
//    //res.write("<html>");
//    //res.write("<head>");
//    //res.write("<title>Hello World Page</title>");
//    //res.write("</head>");
//    //res.write("<body>");
//    //res.write("Hello World!");
//    //res.write("</body>");
//    //res.write("</html>");
//    //res.end();


//    //xoxp-13077508598-13085168672-14025404871-034c03b3d2

//    req.on('data', function (data) {

//        console.log('doing: ' + data);
//        console.log('doing: ' + data.user_name);

//        slackObject = JSON.parse(data);

//        console.log(slackObject);

//        if (slackObject.trigger_word === "yoda:")
//        {
//            var t = slackObject.trigger_word.replace("yoda:", "");

//            console.log(t);

//            //do yoda call
//            // These code snippets use an open-source library. http://unirest.io/nodejs
//            unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + slackObject.text)
//            .header("X-Mashape-Key", "lYQCNpXXJnmshrvzhBeprTywRNaEp1OcF1ijsnrP23ZkRhwqYm")
//            .header("Accept", "text/plain")
//            .end(function (result) {
//                responseText = result.body;
//                console.log("as yoda wold say: " + responseText);
//                //return response.status(200).json(responseSettings);
//                //console.log(result.status, result.headers, result.body);
//            });
//        } else {
//            return response.status(200).end();
//        }
//    });

//    //req.on('end', function () {
//    //    console.log('POSTed: ' + body);
//    //    res.status(200).json(responseText);
//    //    res.end();
//    //});

//});

//server.listen(port);

////if (baseHost == 'localhost') {
////    server.listen(port, 'localhost', function () {
////        console.log(port);
////        console.log('local server running...');
////    });
////} else {
////    server.listen(port, baseHost, function () {
////        console.log('azure server running...');
////    });
////}


