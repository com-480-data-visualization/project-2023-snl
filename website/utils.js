// Food: kg of GhG over 100 years / kg of product
// Energy: kg / kWh
// Transport: g / km
function readData(callback) {
    d3.csv("./data/food-footprints.csv", function(d0) {
        foodCsv = {};

        for(var ifood = 0; ifood < d3.keys(d0).length; ifood++) {
            let kf = d3.values(d0)[ifood]["Entity"];
            let costf = d3.values(d0)[ifood]["GHG emissions per kilogram (Poore & Nemecek, 2018)"];

            foodCsv[kf] = costf;
        }

        d3.csv("./data/energy-footprint.csv", function(d1) {
            energyCsv = {};

            for(var ie = 0; ie < d3.keys(d1).length; ie++) {
                let ke = d3.values(d1)[ie]["Entity"];
                let coste = d3.values(d1)[ie]["footprint"];

                energyCsv[ke] = coste;
            }

            d3.csv("./data/carbon-footprint-travel-mode.csv", function(d2) {
                transportCsv = {};

                for(var it = 0; it < d3.keys(d2).length; it++) {
                    let kt = d3.values(d2)[it]["Entity"];
                    let costt = d3.values(d2)[it]["ghg"];

                    transportCsv[kt] = costt;
                }

                callback(foodCsv, energyCsv, transportCsv);
            });
        });
    });
}
