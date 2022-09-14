const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email_address = req.body.email_address;
    const data = {
        members: [
            {
                email_address: email_address,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData= JSON.stringify(data);

    const url = 'https://us14.api.mailchimp.com/3.0/lists/a4f31c49a5'

    const options = {
        method: 'POST',
        auth: "joao1:e865afa2e7837cbefc737298ae297845-us14"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect('/')
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Server is running on port 8080")
});

// API Key
// e865afa2e7837cbefc737298ae297845-us14

// List ID
// a4f31c49a5