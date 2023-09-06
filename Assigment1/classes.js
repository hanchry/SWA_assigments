class Event{
    constructor(time, place){
        this.time = time;
        this.place = place;
    }
    getTime(){
        return this.time;
    }
    getPlace(){
        return this.place;
    }
}

class WeatherPrediction extends Event{
    constructor(time, place, type, unit){
        super();
        this.time = time;
        this.place = place;
        this.type = type;
        this.unit = unit;
    }
    matches(data){
        return data instanceof WeatherData;
    }
    getMax(){
        return this.max;
    }
    getMin(){
        return this.min;
    }
    getType(){
        return this.type;
    }
    getUnit(){
        return this.unit;
    }
}

class TemperaturePrediction extends WeatherPrediction{
    constructor(time, place, type, unit, min, max){
        super(time, place, type, unit);
        this.min = min;
        this.max = max;
    }
    convertToF(){
        if(this.unit === "C"){
            this.unit = "F";
            this.min = this.min * 1.8 + 32;
            this.max = this.max * 1.8 + 32;
        }
        return this;
    }
    convertToC(){
        if(this.unit === "F"){
            this.unit = "C";
            this.min = (this.min - 32) / 1.8;
            this.max = (this.max - 32) / 1.8;
        }
        return this;
    }
}

class PrecipitationPrediction extends WeatherPrediction{
    constructor(time, place, type, unit, min, max, expectedTypes){
        super(time, place, type, unit);
        this.min = min;
        this.max = max;
        this.expectedTypes = expectedTypes;
    }
    getExpectedTypes(){
        return this.expectedTypes;
    }
    matches(data){
        return data instanceof PrecipitationData;
    }
    convertToInches(){
        if(this.unit === "MM"){
            this.unit = "Inches";
            this.min = this.min / 25.4;
            this.max = this.max / 25.4;
        }
    }
    convertToMM(){
        if(this.unit === "Inches"){
            this.unit = "MM";
            this.min = this.min * 25.4;
            this.max = this.max * 25.4;
        }
    }
}


class WindPrediction extends WeatherPrediction{
    constructor(time, place, type, unit, min, max, expectedDirections){
        super(time, place, type, unit);
        this.min = min;
        this.max = max;
        this.expectedDirections = expectedDirections;
    }
    getExpectedDirections(){
        return this.expectedDirections;
    }
    matches(data){
        return data instanceof WindData;
    }
    convertToMPH(){
        if(this.unit === "MS"){
            this.unit = "MPH";
            this.min = this.min * 2.23694;
            this.max = this.max * 2.23694;
        }
    }
    convertToMS(){
        if(this.unit === "MPH"){
            this.unit = "MS";
            this.min = this.min / 2.23694;
            this.max = this.max / 2.23694;
        }
    }
}


class CloudCoveragePrediction extends WeatherPrediction{
    constructor(time, place, type, unit, min, max){
        super(time, place, type, unit);
        this.min = min;
        this.max = max;
    }
}
