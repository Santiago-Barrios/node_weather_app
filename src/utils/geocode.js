const request = require('request');

const geocode = (address, callback) => {
    const token = 'pk.eyJ1Ijoic2FudGlhZ29icnMiLCJhIjoiY2t6a2U2N29sMzMybzJva3VhMXc5eW9vMyJ9.9TcmkRVWCEE6rdB6A_UbUg';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback( 'Unable to connect to location service!', undefined );
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const resp = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, resp)
        }
    })


}
module.exports = {
    geocode
};