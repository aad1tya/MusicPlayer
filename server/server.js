const express = require('express');
const cors = require("cors");
const spotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');


const app = express();  
app.use(cors());
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new spotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientSecret: "1818fdc629c646cca1b6d2d98b609bd3",
        clientId: "f451d1518d4045b88c3c5d5fba242299",
        refreshToken,
    })

    spotifyApi
    .refreshAccessToken()
    .then(data => {
          res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
          })
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400);
        })  
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new spotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientSecret: "1818fdc629c646cca1b6d2d98b609bd3",
        clientId: "f451d1518d4045b88c3c5d5fba242299",
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400);
    })
})

app.listen(3001);