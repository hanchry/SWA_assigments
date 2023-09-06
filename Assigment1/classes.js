function Event(time, place){
    function getTime(){ return time; }
    function getPlace(){ return place; }
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

function WeatherPrediction(time, place, type, unit, min, max){
    let event = Event(time, place);
    function matches(data){ return data.getType() === type && data.getUnit() === unit && data.getValue() >= min && data.getValue() <= max && data.getTime() === time && data.getPlace() === place; }
    function getMax(){ return max; }
    function getMin(){ return min; }
    function getType(){ return type; }
    function getUnit(){ return unit; }
    return {matches, getMax, getMin, getType, getUnit, ...event};
}

function TemperaturePrediction(time, place, type, unit, min, max){
    let weatherPrediction = WeatherPrediction(time, place, type, unit, min, max);
    function convertToF(){
        if(this.unit === "C"){
            this.unit = "F";
            this.min = this.min * 1.8 + 32;
            this.max = this.max * 1.8 + 32;
        }
    }
    function convertToC(){
        if(this.unit === "F"){
            this.unit = "C";
            this.min = (this.min - 32) / 1.8;
            this.max = (this.max - 32) / 1.8;
        }
    }
    return {convertToF, convertToC, getUnit: ()=> unit, getValue: ()=> value, ...weatherPrediction};
}

function PrecipitationPrediction(time, place, value, type, unit, precipitationTypes){
    let weatherData = WeatherData(time, place, value, type, unit);
    function getExpectedTypes(){
        return precipitationTypes;
    }

    function matches(data){
        return data.getType() === type && data.getUnit() === unit && data.getValue() === value && data.getTime() === time && data.getPlace() === place && data.getExpectedTypes() === precipitationTypes;
    }

    function convertToInches(){
        if(unit === "MM"){
            unit = "Inches";
            value = value / 25.4;
        }
    }
    function convertToMM(){
        if(unit === "Inches"){
            unit = "MM";
            value = value * 25.4;
        }
    }

    return {getExpectedTypes,convertToInches,convertToMM, matches, ...weatherData,getUnit: ()=> unit, getValue: ()=> value};
}

function WindPrediction(time, place, type, unit, min, max, expectedDirections){
    let weatherPrediction = WeatherPrediction(time, place, type, unit, min, max);
    function getExpectedDirections(){
        return expectedDirections;
    }
    function matches(data){
        return data.getType() === type && data.getUnit() === unit && data.getValue() >= min && data.getValue() <= max && data.getTime() === time && data.getPlace() === place && expectedDirections.includes(data.getDirection());
    }
    function convertToMPH(){
        if(this.unit === "MS"){
            this.unit = "MPH";
            this.min = this.min * 2.23694;
            this.max = this.max * 2.23694;
        }
    }
    function convertToMS(){
        if(this.unit === "MPH"){
            this.unit = "MS";
            this.min = this.min / 2.23694;
            this.max = this.max / 2.23694;
        }
    }
    return {getExpectedDirections, matches, convertToMPH, convertToMS, ...weatherPrediction};
}

function CloudCoveragePrediction(time, place, type, unit, min, max){
    let weatherPrediction = WeatherPrediction(time, place, type, unit, min, max);
    return {...weatherPrediction};
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
    return {convertToF, convertToC, ...weatherData};
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
    return {getPrecipitationType,convertToInches,convertToMM, ...weatherData};
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
    return {getDirection,convertToMPH,convertToMS, ...weatherData};
}

function CloudCoverage(time, place, value, type, unit){
    let weatherData = WeatherData(time, place, value, type, unit);
    return {...weatherData};
}
