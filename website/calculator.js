let classes = new Map ([
    ["CarType", "Transport"],
    ["CarFuel", "Transport"],
    ["CarSize", "Transport"],
    ["CarKm", "Transport"],
    ["Car", "Transport"],
    ["Flight Loc", "Transport"],
    ["Flight Int", "Transport"],
    ["Bus", "Transport"],
    ["Train", "Transport"],
    ["Cycle", "Transport"],
    ["Walk", "Transport"],
    ["Beef (beef herd)", "Food"],
    ["Dark Chocolate", "Food"],
    ["Lamb & Mutton", "Food"],
    ["Beef (dairy herd)", "Food"],
    ["Coffee", "Food"],
    ["Prawns (farmed)", "Food"],
    ["Cheese", "Food"],
    ["Fish (farmed)", "Food"],
    ["Pig Meat", "Food"],
    ["Poultry Meat", "Food"],
    ["Eggs", "Food"],
    ["Rice", "Food"],
    ["Groundnuts", "Food"],
    ["Cane Sugar", "Food"],
    ["Tofu", "Food"],
    ["Milk", "Food"],
    ["Oatmeal", "Food"],
    ["Tomatoes", "Food"],
    ["Beet Sugar", "Food"],
    ["Other Pulses", "Food"],
    ["Wine", "Food"],
    ["Maize", "Food"],
    ["Wheat & Rye", "Food"],
    ["Berries & Grapes", "Food"],
    ["Cassava", "Food"],
    ["Barley", "Food"],
    ["Other Fruit", "Food"],
    ["Peas", "Food"],
    ["Soy milk", "Food"],
    ["Bananas", "Food"],
    ["Other Vegetables", "Food"],
    ["Brassicas", "Food"],
    ["Onions & Leeks", "Food"],
    ["Potatoes", "Food"],
    ["Nuts", "Food"],
    ["Apples", "Food"],
    ["Root Vegetables", "Food"],
    ["Citrus Fruit", "Food"],
    ["Energy", "Energy"],
    ["Country", "Energy"]
]);

var count = 0;

// g / km
function getTransport(form, transport) {
    let tForm = Object.fromEntries(Object.entries(form).filter(([k,v]) => classes.get(k) == "Transport"));

    let carType = tForm["CarType"];
    let fuel = tForm["CarFuel"];
    let carSize = tForm["CarSize"];
    let km = tForm["CarKm"];

    var qString = "";
    if(carType == "Car") {
        qString = carSize + " " + carType + " " + fuel;
    } else {
        qString = carSize + " " + carType;
    }

    delete tForm["CarType"];
    delete tForm["CarFuel"];
    delete tForm["CarSize"];
    delete tForm["CarKm"];

    tForm = Object.entries(tForm).map(
        ([k,v]) => {
            return [k, (parseInt(transport[k]) * parseInt(v)) / 1000];
        }
    );

    tForm.push(["Car", (km * transport[qString]) / 1000]);

    return tForm;
}

// kg / kg
function getFood(form, food) {
    let tForm = Object.fromEntries(Object.entries(form).filter(([k,v]) => classes.get(k) == "Food"));

    tForm = Object.entries(tForm).map (
        ([k,v]) => {
            return [k, Math.ceil(food[k] * parseInt(v) * 52.0 / 1000.0)];
        }
    );

    return tForm;
}

// kg / KWh
function getEnergy(form, energy) {
    let tForm = Object.fromEntries(Object.entries(form).filter(([k,v]) => classes.get(k) == "Energy"));
    let country = tForm["Country"];

    delete tForm["Country"];

    tForm = Object.entries(tForm).map (
        ([k,v]) => {
            return [k, energy[country] * parseInt(v)];
        }
    );

    return tForm;
}

function cleanForBarChart(form, transport, food, energy) {
    let tr = getTransport(form, transport);
    let fd = getFood(form, food);
    let en = getEnergy(form, energy);

    let cleanForm = tr.concat(fd).concat(en);

    return cleanForm;
}

function drawPlot(formData) {
    readData(function (foodCsv, energyCsv, transportCsv) {
        // set the dimensions and margins of the graph
        var margin = {top: 50, right: 100, bottom: 70, left: 200},
            width = 1200 - margin.left - margin.right,
            height = 1000 - margin.top - margin.bottom;

        var maxVal = 0;

        d3.select("#footprint").html("");

        // append the svg object to the body of the page
        var svg = d3.select("#footprint")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        formData = cleanForBarChart(formData, transportCsv, foodCsv, energyCsv);

        for(var i = 0; i < formData.length; i++) {
            if(formData[i][1] > maxVal) {
                maxVal = formData[i][1];
            }
        }

        var sortedData = formData.sort(function(d0, d1) {return d0[1] - d1[1];}).reverse();
        sortedData = sortedData.filter(([k,v]) => v != 0);

        var x = d3.scaleLinear()
            .domain([0, maxVal + 10])
            .range([ 0, width]);

        var y = d3.scaleBand()
            .range([ 0, height ])
            .domain(sortedData.map(function(data) { return data[0]; }))
            .padding(.1);

        var colors = new Map([["Transport", "#51afef"], ["Food", "#da8548"], ["Energy", "#98be65"]]);

        svg.selectAll("bar")
            .data(sortedData)
            .enter()
            .append("rect")
            .style("fill", function(d) {
                return colors.get(classes.get(d[0]));
            })
            .attr("x", x(0) )
            .attr("y", function(d) {
                return y(d[0]);
            })
            .attr("width", function(d) { return x(d[1]); })
            .attr("height", y.bandwidth() );

        svg.append("g")
            .attr("class", "axisDoom")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("fill", doomOne.foreground)
            .style("font-size", "20px");

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "axisDoom")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("fill", doomOne.foreground)
            .style("font-size", "20px");

        svg.append("rect").attr("x", width - margin.right).attr("y", height / 2 - 18).attr("width", 25)
            .attr("height", 25).style("fill", "#da8548");
        svg.append("rect").attr("x", width - margin.right).attr("y", height / 2 + 12).attr("width", 25)
            .attr("height", 25).style("fill", "#51afef");
        svg.append("rect").attr("x", width - margin.right).attr("y", height / 2 + 42).attr("width", 25)
            .attr("height", 25).style("fill", "#98be65");

        svg.append("text").attr("x", width - margin.right + 30).attr("y", height / 2).text("Food")
            .style("font-size", "25px").attr("alignment-baseline","middle").style("fill", doomOne.foreground);
        svg.append("text").attr("x", width - margin.right + 30).attr("y", height / 2 + 30).text("Transport")
            .style("font-size", "25px").attr("alignment-baseline","middle").style("fill", doomOne.foreground);
        svg.append("text").attr("x", width - margin.right + 30).attr("y", height / 2 + 60).text("Energy")
            .style("font-size", "25px").attr("alignment-baseline","middle").style("fill", doomOne.foreground);

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "35px")
            .style("font-weight", "bold")
            .style("text-decoration", "underline")
            .style("fill", doomOne.color5)
            .text("Personalized Carbon Footprint");

    });
}

function setTotal(form) {
    readData(function (foodCsv, energyCsv, transportCsv) {
        let tForm  = Object.fromEntries(cleanForBarChart(form, transportCsv, foodCsv, energyCsv));
        let sum = Math.ceil(Object.values(tForm).reduce((a, b) => a + b, 0));

        document.getElementById("Total").innerHTML = "<text style=\"color: " + doomOne.color10
            + "; font-size: 30px;"
            + "text-align: center;"
            +"\">Total: " + sum + " kg of Co2 per year.</text>";
    });
}

function getData(form) {
    var formD = new FormData(form);
    var formData = Object.fromEntries(formD);

    drawPlot(formData);
    setTotal(formData);
}

function init() {
    big();
    document.getElementById("submit").click();
}


function big() {
    let form = document.getElementById("form");

    for (const [key, value] of Object.entries(bigD)) {
        document.getElementById(key).value = value;
    }

    document.getElementById("submit").click();
}

function medium() {
    let form = document.getElementById("form");

    for (const [key, value] of Object.entries(mediumD)) {
        document.getElementById(key).value = value;
    }

    document.getElementById("submit").click();
}

function small() {
    let form = document.getElementById("form");

    for (const [key, value] of Object.entries(smallD)) {
        document.getElementById(key).value = value;
    }

    document.getElementById("submit").click();
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
});

init();

