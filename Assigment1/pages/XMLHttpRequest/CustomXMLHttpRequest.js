
function CustomXMLHttpRequest(){
    var xhr = new XMLHttpRequest();
    function requestData(place){
        var url = "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + place.latitude +
            "&longitude=" + place.longitude +
            "&hourly=temperature_2m" +
            "&current_weather=true" +
            "&precipitation_unit=inch" +
            "&timezone=Europe%2FBerlin" +
            "&start_date=2023-09-07" +
            "&end_date=2023-09-08";

        xhr.open("GET", url, true);
        xhr.send();
    }
    function addListener(method){
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                method();
            }
            else if (xhr.readyState === 4) {
                console.log("Request failed with status: " + xhr.status);
            }
        });
    }
    return {requestData, addListener};

}
