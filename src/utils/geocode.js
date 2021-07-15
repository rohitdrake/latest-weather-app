const request = require('postman-request');

const geoCode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9oaXRkcmFrZSIsImEiOiJja3F1czYwaDMwN2dnMzFxcDRvZ2xrNWV1In0.wsLMdenpOO27NXef3tWOIg&limit=1';
    request({url: geocodeURL, json: true}, (err, res, body) => {
        if(err) {
            callback("Unable to connect to geolocation service!", undefined);
        } else if(body.message) {
            callback("No matches found!", undefined);
        } else {
            callback(undefined, body.features[0]);
        }
    });
}

// {
//     latitude: body.features[0].center[1],
//     longitude: body.features[0].center[0],
//     location: body.features[0].place_name
// }

module.exports = geoCode;
