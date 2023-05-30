// kg of GhG over 100 years / kg of product
function readFood() {
    var foodCsv = {};
    d3.csv("./data/food-footprints.csv", function(d) {
        for(var i = 0; i < d3.keys(d).length; i++) {
            let k = d3.values(d)[i]["Entity"];
            let cost = d3.values(d)[i]["GHG emissions per kilogram (Poore & Nemecek, 2018)"];

            foodCsv[k] = cost;
        }
    });

    return foodCsv;
}

// kg / kWh
function readEnergy() {
    var energyCsv = {};
    d3.csv("./data/energy-footprint.csv", function(d) {
        for(var i = 0; i < d3.keys(d).length; i++) {
            let k = d3.values(d)[i]["Entity"];
            let cost = d3.values(d)[i]["footprint"];

            energyCsv[k] = cost;
        }
    });

    return energyCsv;
}

// g / km
function readTransport() {
    var transportCsv = {};
    d3.csv("./data/carbon-footprint-travel-mode.csv", function(d) {
        for(var i = 0; i < d3.keys(d).length; i++) {
            let k = d3.values(d)[i]["Entity"];
            let cost = d3.values(d)[i]["GHG emissions (gCO2e/km)"];

            transportCsv[k] = cost;
        }
    });

    return transportCsv;
}

