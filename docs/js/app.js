const options = {
    cellSizeX: 10,
    cellSizeY: 5
};

let plotter = new Plotter.Map(options);

document.addEventListener("DOMContentLoaded", function (event) {
    let curentDate = new Date();
    let latitude = 55.95;
    let longitude = 37.85;

    let clearButton = document.getElementById('clear');
    clearButton.onclick = clear;

    let runButton = document.getElementById('run');
    runButton.onclick = run;

    let latitudeInput = document.getElementById('get-data');
    latitudeInput.onclick = calc;

    let citys = document.getElementById('citys-body');
    citys.onkeyup = citySelector;

    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;

    dateUpdate(curentDate);
    getData(curentDate, latitude, longitude);
});

function clear() {
    plotter.ClearMap();
}

function run() {
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;
    let date = document.getElementById('date').value;
    getData(new Date(date), latitude, longitude);
    plotter.Run();
}

function getData(date, latitude, longitude) {
    fetch(`https://astronav.ru/condition/date/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/latitude/${latitude}/longitude/${longitude}`)
        .then(response => response.json())
        .then(data => dataFetched(data));
}

function dataFetched(data) {
    plotter.ClearMap();
    plotter.UpdateDataset = data;
}

function dateUpdate(date) {
    let dateInput = document.getElementById('date');
    let monthStr = date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth()+1}`
    let dateStr = date.getDate() >= 9 ? date.getDate() : `0${date.getDate()}`
    // let hourStr = date.getHours() >= 9 ? date.getHours() : `0${date.getHours()}`
    // let minuteStr = date.getMinutes() >= 9 ? date.getMinutes() : `0${date.getMinutes()}`

    let strDate = `${date.getFullYear()}-${monthStr}-${dateStr}` //T${hourStr}:${minuteStr}`
    dateInput.value = strDate;
}

function calc() {
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;
    let date = document.getElementById('date').value;
    getData(new Date(date), latitude, longitude);

}

function citySelector(text) {
    let a = text.target.value;
    if (a.length < 3) {
        return;
    }
    setTimeout(() => {
        fetch(`https://nominatim.openstreetmap.org/search/${a}?format=json&addressdetails=1`)
            .then(response => response.json())
            .then(data => townFetched(data));
    }, 1500);
}

function townFetched(data) {
    console.log(data)
    let c = data.map(x => ({
        class: x.class,
        city: x.address.city,
        country: x.address.country,
        lat: x.lat,
        lon: x.lon
    }));
    let opt = c.map((x) => `<option value="${x.country}, ${x.city}">`).join('');
    console.log(c)
    // let eblo = document.createElement('option');
    // eblo.value = "wwwwww";
    // document.getElementById('citys').appendChild(eblo);
    document.getElementById('citys').innerHTML = opt;
}