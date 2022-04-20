const request = require('request');

const forecast = (latitude, longitude , callback) => {
    const key = '4580190775d5eb2d92486394927975e4';
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude}, ${longitude}`;

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback( 'Unable to connect to weather service!', undefined );
        }
        else if (body.success ===  false) {
            callback(body.error.info, undefined);
        } else {
            const resp = `${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature} degress out. There is a  ${body.current.precip}% change of rain `
            callback(undefined, resp)
        }
    })


}
module.exports = {
    forecast
};