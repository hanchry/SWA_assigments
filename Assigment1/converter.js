
function convertForcastData(response, place) {
    let temp = [];
    for (let i = 0; i < response.hourly.time.length; i++) {
        let tempPredictions = TemperaturePrediction(
            response.hourly.time[i],
            place,
            "Temperature",
            response.hourly_units.temperature_2m,
            response.hourly.temperature_2m[i],
            response.hourly.temperature_2m[i]
        );
        temp.push(tempPredictions);
    }
    return temp;
}

function convertWeatherData(response, place) {
    let time = response.current_weather.time;
    let temp = response.current_weather.temperature;
    let wind = response.current_weather.windspeed;
    let windDirection = response.current_weather.winddirection;
    let unit = response.hourly_units.temperature_2m;


    let tempOb = Temperature(time,place,temp,"Temperature",unit);
    let windOb = Wind(time,place,wind,"Wind","m/s",windDirection);

    return [tempOb,windOb];
}