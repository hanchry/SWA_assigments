function Event(time, place) {
    function getTime() {
        return time;
    }

    function getPlace() {
        return place;
    }

    return {getTime, getPlace};
}
// function WeatherData(time, place, value, type, unit) {
//     Event.call(time,place)
//     this.value = value
//     this.type = type
//     this.unit = unit
// }
// WeatherData.prototype = Object.create(Event.prototype)
// WeatherData.prototype.constructor = WeatherData
// WeatherData.prototype.getValue = function() {
//     return this.value
// }
// WeatherData.prototype.getType = function() {
//     return this.type
// }
function WeatherData(time, place, value, type, unit) {
    let event = Event(time, place);

    function getValue() {
        return value;
    }

    function getType() {
        return type;
    }

    function getUnit() {
        return unit;
    }

    return {getValue, getType, getUnit, ...event};
}
// class WeatherData extends Event {
//     constructor(time, place, value, type, unit) {
//         super(time, place);
//         this.value = value;
//         this.type = type;
//         this.unit = unit;
//     }
//
//     getValue() {
//         return this.value;
//     }
//
//     getType() {
//         return this.type;
//     }
//
//     getUnit() {
//         return this.unit;
//     }
// }

function WeatherPrediction(time, place, type, unit, min, max) {
    let event = Event(time, place);

    function matches(data) {
        return data.getType() === type && data.getUnit() === unit && data.getValue() >= min && data.getValue() <= max && data.getTime() === time && data.getPlace() === place;
    }

    function getMax() {
        return max;
    }

    function getMin() {
        return min;
    }

    function getType() {
        return type;
    }

    function getUnit() {
        return unit;
    }

    return {matches, getMax, getMin, getType, getUnit, ...event};
}

function TemperaturePrediction(time, place, type, unit, min, max) {
    let weatherPrediction = WeatherPrediction(time, place, type, unit, min, max);

    function convertToF() {
        if (unit.includes("C")) {
            unit = "F";
            min = ((min * 1.8) + 32).toFixed(3);
            max = ((max * 1.8) + 32).toFixed(3);
        }
        return this;
    }

    function convertToC() {
        if (unit.includes("F")) {
            unit = "C";
            min = ((min - 32) / 1.8).toFixed(3);
            max = ((max - 32) / 1.8).toFixed(3);
        }
        return this;
    }

    return {convertToF, convertToC,  ...weatherPrediction, getUnit: () => unit, getMin: () => min, getMax: () => max};
}

function WindPrediction(time, place, type, unit, min, max, expectedDirections) {
    let weatherPrediction = WeatherPrediction(time, place, type, unit, min, max);

    function getExpectedDirections() {
        return expectedDirections;
    }

    function matches(data) {
        return data.getType() === type && data.getUnit() === unit && data.getValue() >= min && data.getValue() <= max && data.getTime() === time && data.getPlace() === place && expectedDirections.includes(data.getDirection());
    }

    function convertToMPH() {
        if (unit.includes("s")) {
            unit = "mph";
            min = (min * 2.237).toFixed(3);
            max = (max * 2.237).toFixed(3);
        }
        return this;
    }

    function convertToMS() {
        if (unit.includes("P")) {
            unit = "m/s";
            min = (min / 2.237).toFixed(3);
            max = (max / 2.237).toFixed(3);
        }
        return this;
    }
    return {
        ...weatherPrediction, 
        getExpectedDirections, 
        matches, 
        convertToMPH, 
        convertToMS, 
        getUnit: function() { return unit; }, 
        getMin: function() { return min; }, 
        getMax: function() { return max; }
    };
}


function PrecipitationPrediction(time, place, value, type, unit, precipitationTypes) {
    let weatherData = WeatherData(time, place, value, type, unit);

    function getExpectedTypes() {
        return precipitationTypes;
    }

    function matches(data) {
        return data.getType() === type && data.getUnit() === unit && data.getValue() === value && data.getTime() === time && data.getPlace() === place && data.getExpectedTypes() === precipitationTypes;
    }

    function convertToInches() {
        if (unit === "mm") {
            unit = "Inches";
            value = value / 25.4;
        }
    }

    function convertToMM() {
        if (unit === "Inches") {
            unit = "mm";
            value = value * 25.4;
        }
    }

    return {
        getExpectedTypes,
        convertToInches,
        convertToMM,
        matches, ...weatherData,
        getUnit: () => unit,
        getValue: () => value
    };
}

function CloudCoveragePrediction(time, place, type, unit, min, max) {
    let weatherPrediction = WeatherPrediction(time, place, type, unit, min, max);
    return {...weatherPrediction};
}

function Temperature(time, place, value, type, unit) {
    let weatherData = WeatherData(time, place, value, type, unit);

    function convertToF() {
        if (unit.includes("C")) {
            unit = "F";
            value = value * 1.8 + 32;
        }
        return this;
    }

    function convertToC() {
        if (unit.includes("F")) {
            unit = "C";
            value = (value - 32) / 1.8;
        }
        return this;
    }

    return {convertToF, convertToC, ...weatherData, getUnit: () => unit, getValue: () => value};
}

function Precipitation(time, place, value, type, unit, precipitationType) {
    let weatherData = WeatherData(time, place, value, type, unit);

    function getPrecipitationType() {
        return precipitationType;
    }

    function convertToInches() {
        if (unit === "MM") {
            unit = "Inches";
            value = value / 25.4;
        }
        return this;
    }

    function convertToMM() {
        if (unit === "Inches") {
            unit = "MM";
            value = value * 25.4;
        }
        return this;
    }

    return {
        getPrecipitationType,
        convertToInches,
        convertToMM, ...weatherData,
        getUnit: () => unit,
        getValue: () => value
    };
}

function Wind(time, place, value, type, unit, direction) {
    let weatherData = WeatherData(time, place, value, type, unit);

    function getDirection() {
        return direction;
    }

    function convertToMPH() {
        if (unit.includes("s")) {
            unit = "mph";
            value = (value * 2.237).toFixed(3);
        }
        return this;
    }

    function convertToMS() {
        if (unit.includes("p")) {
            unit = "m/s";
            value = (value / 2.237).toFixed(3);
        }
        return this;
    }

    return {getDirection, convertToMPH, convertToMS, ...weatherData, getUnit: () => unit, getValue: () => value};
}

function CloudCoverage(time, place, value, type, unit) {
    let weatherData = WeatherData(time, place, value, type, unit);
    return {...weatherData};
}

// function CloudCoverage(time, place, value, type, unit) {
//     let weatherData = WeatherData(time, place, value, type, unit);
//     return {...weatherData};
// }
