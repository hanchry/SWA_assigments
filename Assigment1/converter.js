
function TemperatureConverter(response,place) {
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