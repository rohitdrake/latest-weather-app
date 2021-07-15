const request = require('postman-request');

const forecast = ({latitude: lat, longitude: lon}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f2253ba489346a5b7830243976a314a1&query=+' + lat + ',' + lon + '&units=m';
    
    request({url, json: true}, (err, res, body) => {
        // console.log(body);
        if(err) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, body.current);
        }
    });
}

module.exports = forecast;

