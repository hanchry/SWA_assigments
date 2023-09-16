function CustomFetch() {
    function requestData(place) {
      var url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" +
        place.latitude +
        "&longitude=" +
        place.longitude +
        "&hourly=temperature_2m" +
        "&current_weather=true" +
        "&precipitation_unit=inch" +
        "&timezone=Europe%2FBerlin" +
        "&start_date=2023-09-07" +
        "&end_date=2023-09-08";
  
      return fetch(url)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Request failed with status: " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          return data;
        });
    }
  
    return { requestData };
  }
  