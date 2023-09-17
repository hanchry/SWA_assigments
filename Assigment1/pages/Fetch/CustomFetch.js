function CustomFetch() {
    function requestData(place) {
      var url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" +
        place.latitude +
        "&longitude=" +
        place.longitude +
        "&hourly=temperature_2m,windspeed_10m,precipitation_probability,cloudcover,precipitation" +
        "&current_weather=true" +
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
  