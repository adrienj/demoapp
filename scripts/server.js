const express = require('express');
const path = require('path');
const request = require('request');
const md5 = require('md5');
const bodyParser = require('body-parser');
const args = process.argv.slice(2);
const port = process.env.PORT || args[0];
const app = express();

const getAuthParams = () => {
    let ts = Date.now();
    return 'apikey=f94fc8e1a3fc8c05a76d4383e6a45212&ts='+ts+'&hash=' + md5(
        ts +
        'd6418f3775518e28a14faf5dabc9b256995958bc' +
        'f94fc8e1a3fc8c05a76d4383e6a45212'
    );
};

app.use(express.static(path.resolve(process.cwd(), args[1])));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/marvel', function (req, res){
    request(req.query.route + getAuthParams(), function(err, body, response) {
        if (!err && body) {
            res.send(body);
            res.end();
        }
    });
});

app.get('*', function (request, response){
    response.sendFile(path.resolve(process.cwd(), args[1], 'index.html'));
})

app.listen(port);
console.log("server started. Go to http://localhost:" + port);
