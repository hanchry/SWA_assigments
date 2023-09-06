
function Event(time, place){
    function getTime(){
        return time;
    }
    function getPlace(){
        return place;
    }
    return {getTime, getPlace};
}
function WeatherData(time, place, value, type, unit){
    let event = Event(time, place);
    function getValue(){
        return value;
    }
    function getType(){
        return type;
    }
    function getUnit(){
        return unit;
    }
    return {getValue,getType,getUnit, ...event};
}
function Temperature(time, place, value, type, unit){
    let weatherData = WeatherData(time, place, value, type, unit);
    function convertToF(){
        if(unit === "C"){
            unit = "F";
            value = value * 1.8 + 32;
        }
        return this;
    }
    function convertToC(){
        if(unit === "F"){
            unit = "C";
            value = (value - 32) / 1.8;
        }
        return this;
    }
    return {convertToF, convertToC, ...weatherData, getUnit:()=>unit, getValue:()=>value};
}
function Precipitation(time, place, value, type, unit, precipitationType){
    let weatherData = WeatherData(time, place, value, type, unit);
    function getPrecipitationType(){
        return precipitationType;
    }
    function convertToInches(){
        if(unit === "MM"){
            unit = "Inches";
            value = value / 25.4;
        }
        return this;
    }
    function convertToMM(){
        if(unit === "Inches"){
            unit = "MM";
            value = value * 25.4;
        }
        return this;
    }
    return {getPrecipitationType,convertToInches,convertToMM, ...weatherData, getUnit:()=>unit, getValue:()=>value};
}
function Wind(time, place, value, type, unit, direction){
    let weatherData = WeatherData(time, place, value, type, unit);
    function getDirection(){
        return direction;
    }
    function convertToMPH(){
        if(unit === "MS"){
            unit = "MPH";
            value = value * 2.237;
        }
        return this;
    }
    function convertToMS(){
        if(unit === "MPH"){
            unit = "MS";
            value = value / 2.237;
        }
        return this;
    }
    return {getDirection,convertToMPH,convertToMS, ...weatherData, getUnit:()=>unit, getValue:()=>value};
}
function CloudCoverage(time, place, value, type, unit){
    let weatherData = WeatherData(time, place, value, type, unit);
    return {...weatherData};
}


function WeatherPrediction(time, place, type, unit, min, max){
    let event = Event(time, place);
    function matches(data){
        return data.getValue() === 10;
    }
    function getMax(){ return max; }
    function getMin(){ return min; }
    function getType(){ return type; }
    function getUnit(){ return unit; }
    return {matches, getMax, getMin, getType, getUnit, ...event};
}
//
// let weatherData = WeatherData("2018-04-26T08:00:00", "Horsens", 10, "Temperature", "C");
// let weatherPrediction = WeatherPrediction("2018-04-26T08:00:00", "Horsens", "Temperature", "C", 10, 20);
// console.log(weatherPrediction.matches(weatherData));

// let temperature = Temperature("2018-04-26T08:00:00", "Horsens", 15, "Temperature", "C");
// console.log(temperature.convertToF().getValue());
// console.log(temperature.convertToC().getValue());