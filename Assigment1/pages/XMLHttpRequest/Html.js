
function Html(){
    function createForcastTable(data) {
        if (document.getElementById("table") !== null) {
            document.getElementById("table").remove();
        }
        if (document.getElementById("forcast") !== null) {
            document.getElementById("forcast").remove();
        }

        let h1 = document.createElement("h1");
        h1.id = "forcast";
        h1.innerText = "Forcast";
        document.getElementById("content").appendChild(h1);

        let table = document.createElement("table");
        table.id = "table";
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let th2 = document.createElement("th");
        th.innerText = "Date Time";
        th2.innerText = "Temperature";
        tr.appendChild(th);
        tr.appendChild(th2);
        table.appendChild(tr);

        if (data === undefined) {
            return;
        }
        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let td2 = document.createElement("td");
            td.innerText = data[i].getTime();
            td2.innerText = data[i].getMax() + " " + data[i].getUnit();
            tr.appendChild(td);
            tr.appendChild(td2);
            table.appendChild(tr);
        }
        document.getElementById("content").appendChild(table);
    }
    function createCurrentWeather(data) {
        if(document.getElementById("weather-container") !== null){
            document.getElementById("weather-container").remove();
        }
        if(document.getElementById("current") !== null){
            document.getElementById("current").remove();
        }
        const weatherContainer = document.createElement('div');
        weatherContainer.id = "weather-container";

        let h2 = document.createElement("h1");
        h2.id = "current";
        h2.innerText = "Current weather";
        document.getElementById("content").appendChild(h2);

        if(data !== undefined) {
            let [time, date] = splitTimeDate(data[0].getTime());

            let p6 = document.createElement("p");
            p6.innerText = data[0].getPlace().name;
            weatherContainer.appendChild(p6);

            let p5 = document.createElement("p");
            p5.innerText = "Date: " + date;
            weatherContainer.appendChild(p5);

            let p4 = document.createElement("p");
            p4.innerText = "Time: " + time;
            weatherContainer.appendChild(p4);

            let p = document.createElement("p");
            p.innerText = "Temperature: " + data[0].getValue() + " " + data[0].getUnit();
            weatherContainer.appendChild(p);

            let p2 = document.createElement("p");
            p2.innerText = "Wind speed: " + data[1].getValue() + " " + data[1].getUnit();
            weatherContainer.appendChild(p2);

            let p3 = document.createElement("p");
            p3.innerText = "Wind direction: " + data[1].getDirection() + "°";
            weatherContainer.appendChild(p3);
        }

        document.getElementById("content").appendChild(weatherContainer);
    }
    function splitTimeDate(data){
        let time = data.split("T")[1];
        let date = data.split("T")[0];
        return [time, date];
    }

    return {createForcastTable, createCurrentWeather};
}