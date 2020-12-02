import { Plotter } from './lib/index.js'

const options = {
    cellSizeX: 10,
    cellSizeY: 5
};

let plotter = new Plotter(options);
let dataSet = null;
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

    let testButton = document.getElementById('test');
    testButton.onclick = test;

    var frameSelector = document.getElementById('frame-selector');
    frameSelector.oninput = test;

    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;

    document.getElementById('date').value = dateToString(curentDate);

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
    console.log()
    fetch(`https://astronav.ru/condition/date/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}/latitude/${latitude}/longitude/${longitude}`)
        .then(response => response.json())
        .then(data => dataFetched(data));
}

function dataFetched(data) {
    dataSet = data;
    document.getElementById('frame-selector').setAttribute("max", data.length - 1);
    
    const id = data.map(x => timeToString(new Date(x.time)).substring(0, 4)).indexOf(timeToString(new Date()).substring(0, 4));
    document.getElementById('frame-selector').value = id;
    document.getElementById('time-display').innerText = timeToString(new Date(dataSet[id].time));
    
    plotter.UpdateDataset = data;
    plotter.DataFrameSelect(id);
}

function calc() {
    let latitude = document.getElementById('latitude').value;
    let longitude = document.getElementById('longitude').value;
    let date = document.getElementById('date').value;
    getData(new Date(date), latitude, longitude);
}

function test(e) {
    const date = new Date(dataSet[e.target.value].time);
    plotter.DataFrameSelect(e.target.value);
    document.getElementById('time-display').innerText = timeToString(date);
}

function dateToString(date) {
    let monthStr = date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    let dateStr = date.getDate() >= 9 ? date.getDate() : `0${date.getDate()}`

    let strDate = `${date.getFullYear()}-${monthStr}-${dateStr}`;
    return strDate;
}

function timeToString(date) {
    let hoursStr = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    let dateStr = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`

    let strDate = `${hoursStr}:${dateStr}`;
    return strDate;
}