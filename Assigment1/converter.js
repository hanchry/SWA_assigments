
function Converter(){
    function convertToForcastData(response, place) {
        let temp = [];
        let wind = [];
        let precipitation_probability = [];
        let cloudcover = [];
        for (let i = 0; i < response.hourly.time.length; i++) {
            let tempPredictions = TemperaturePrediction(
                response.hourly.time[i],
                place,
                "Temperature",
                response.hourly_units.temperature_2m,
                response.hourly.temperature_2m[i],
                response.hourly.temperature_2m[i]
            );
            let windPredictions = WindPrediction(
                response.hourly.time[i],
                place,
                "Wind",
                "m/s",
                response.hourly.windspeed_10m[i],
                response.hourly.windspeed_10m[i],
                "m/s"
            );
            let precipitation_probabilityPredictions = PrecipitationPrediction(
                response.hourly.time[i],
                place,
                response.hourly.precipitation_probability[i],
                "Precipitation",
                "mm",
                response.hourly.precipitation_probability[i]
            );
            let cloudcoverPredictions = CloudCoveragePrediction(
                response.hourly.time[i],
                place,
                "Cloud coverage",
                response.hourly_units.cloudcover,
                response.hourly.cloudcover[i],
                response.hourly.cloudcover[i]
            );
            temp.push(tempPredictions);
            wind.push(windPredictions);
            precipitation_probability.push(precipitation_probabilityPredictions);
            cloudcover.push(cloudcoverPredictions);
        }
        return [temp, wind, precipitation_probability, cloudcover];
    }

    function convertToWeatherData(response, place) {
        let time = response.current_weather.time;
        let temp = response.current_weather.temperature;
        let wind = response.current_weather.windspeed;
        let windDirection = response.current_weather.winddirection;
        let unit = response.hourly_units.temperature_2m;


        let tempOb = Temperature(time,place,temp,"Temperature",unit);
        let windOb = Wind(time,place,wind,"Wind","ms",windDirection);

        return [tempOb,windOb];
    }

    return {convertToForcastData,convertToWeatherData};
}
