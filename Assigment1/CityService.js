

function CityService(){
    const cities = [
        {
            name: "Horsens",
            latitude: 55.860916,
            longitude: 9.850000
        },
    ]

    function getAll(){
        return cities;
    }
    function get(name){
        return cities.find(city => city.name === name);
    }
    return {getAll, get};
}