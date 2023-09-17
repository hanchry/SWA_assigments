

function CityService(){
    const cities = [
        {
            name: "Horsens",
            latitude: 55.860916,
            longitude: 9.850000
        },
        {
            name: "Copenhagen",
            latitude: 55.676098,
            longitude: 12.568337
        },
        {
            name: "Tokyo",
            latitude: 35.652832,
            longitude: 139.839478
        }
    ]

    function getAll(){
        return cities;
    }
    function get(name){
        return cities.find(city => city.name === name);
    }
    return {getAll, get};
}