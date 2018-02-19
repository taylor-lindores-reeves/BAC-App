var volume = document.getElementById('volume');
var content = document.getElementById('content');
var submit = document.getElementById('btn');
var ondelete = document.getElementById('delete');
var vol = document.getElementById('vol');
var per = document.getElementById('per');

submit.addEventListener('click', function() {
    location.reload(true); 
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
    }
    if (volume.value && content.value) {
        localStorage.setItem(`drink-${localStorage.clickcount}`, volume.value);
        localStorage.setItem(`percentage-${localStorage.clickcount}`, content.value);
    }
})

for (var k in localStorage){
    if (typeof localStorage[k] !== 'function') {
        if (k === 'clickcount' || k === 'length') {
        } else if (k.substr(0, 5) === 'drink') {
            vol.innerHTML += `<li class="c-vol-ul__item">${k.split('-').join(' ')}: ${localStorage[k]}ml`;
        } else if (k.substr(0, 10) === 'percentage') {
            per.innerHTML += `<li class="c-vol-ul__item">${localStorage[k]}%`;
        }
    }
}

ondelete.addEventListener('click', function() {
    localStorage.clear();
    location.reload(true);
})

var volumeValues = [];
var percentValues = [];

document.querySelectorAll('#vol li').forEach(i => {
    var volumes = i.innerText;
    var reduced = volumes.substr(volumes.length - 6).match(/\d+/g).map(Number);
    volumeValues.push(reduced[0]);
})

document.querySelectorAll('#per li').forEach(i => {
    var percentages = i.innerText;
    var reduced = percentages.match(/\d+/g).map(Number);
    percentValues.push(reduced[0]);
})

var CalculateAlcohol = function(measurement) {
    var weight = document.getElementById("weight");
    var drinks = Number(document.querySelectorAll('#vol li').length);
    
    var percentages = percentValues.reduce(function(a, b) {return a + b});
    percentages = Math.round(percentages / percentValues.length);
    var volumes = volumeValues.reduce(function(a, b) {return a + b});
    var time = document.getElementById("time");
    var gender = document.getElementById("gender");

    weight.addEventListener('input', calculateMetric);
    time.addEventListener('input', calculateMetric);
    gender.addEventListener('change', calculateMetric);

    function calculateMetric() {
        var result = document.getElementById('result');
        var mls = volumes * 0.035195;
        var kgs = weight.value * 2.20462;
        var A = mls * percentages;
        A = A /= 100;
        const BAC = (A * 5.14)/(kgs * (gender.value == "male" ? 0.73 : 0.66)) - (.015 * time.value);
        result.innerHTML = `Blood Alcohol Content (BAC) = ${Number(BAC.toFixed(3))}`;
    }
}

module.exports = CalculateAlcohol; 