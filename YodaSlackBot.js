var port = process.env.PORT || 1337;
var baseHost = process.env.WEBSITE_HOSTNAME || 'localhost';

var http = require('http');

var server = http.createServer(function (req, res) {
    req.setEnvoding('utf8')
    var slackObject = null;
    var responseText = "";


    //xoxp-13077508598-13085168672-14025404871-034c03b3d2

    req.on('data', function (data) {

        slackObject = JSON.parse(data);

        if (slackObject.trigger_word === "yoda")
        {
            var t = text.replace("yoda", "");
            //do yoda call
            // These code snippets use an open-source library. http://unirest.io/nodejs
            unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + slackObject.text)
            .header("X-Mashape-Key", "lYQCNpXXJnmshrvzhBeprTywRNaEp1OcF1ijsnrP23ZkRhwqYm")
            .header("Accept", "text/plain")
            .end(function (result) {
                responseText = result.body;
                console.log(responseText);
                //return response.status(200).json(responseSettings);
                //console.log(result.status, result.headers, result.body);
            });
        } else {
            return response.status(200).end();
        }
    });

    req.on('end', function () {
        console.log('POSTed: ' + body);
        res.status(200).json(responseText);
        res.end();
    });

});

if (baseHost == 'localhost') {
    server.listen(port, 'localhost', function () {
        console.log('local server running...');
    });
} else {
    server.listen(port, baseHost, function () {
        console.log('azure server running...');
    });
}


