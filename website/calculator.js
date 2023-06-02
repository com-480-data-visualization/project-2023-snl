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
    ["Citrus Fruit", "Food"]
]);

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

    console.log(tForm);

    delete tForm["CarType"];
    delete tForm["CarFuel"];
    delete tForm["CarSize"];
    delete tForm["CarKm"];

    console.log("deleted: ");
    console.log(tForm);
    console.log(transport);

    tForm = Object.entries(tForm).map(
        ([k,v]) => {
            return parseInt(transport[k]) * parseInt(v);
        }
    );

    tForm["Car"] = km * transport[qString];

    return tForm;
}

function getFood(form, food) {
    let tForm = Object.fromEntries(Object.entries(form).filter(([k,v]) => classes.get(k) == "Food"));

    tForm = Object.entries(tForm).map(
        ([k,v]) => {
            return parseInt(food[k]) * parseInt(v) * 52;
        }
    );

    return tForm;
}

function getEnergy(form, energy) {
    let tForm = Object.fromEntries(Object.entries(form).filter(([k,v]) => classes.get(k) == "Energy"));



    return tForm;
}

function cleanForBarChart(form, transport, food, energy) {
    let tr = getTransport(form, transport);
    let fd = getFood(form, food);

    console.log(fd);

    throw new Error();
}

function getData(form) {
    var formD = new FormData(form);
    var formData = Object.fromEntries(formD);

    let foodCsv = readData(function (foodCsv, energyCsv, transportCsv) {
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 20, left: 50},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#footprint")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

        console.log(formData);
        formData = cleanForBarChart(formData, transportCsv, foodCsv, energyCsv);

        // List of subgroups = header of the csv files = soil condition here
        var classes = ["Food", "Transport", "Energy"];

        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(d3.entries(data), function(d) {
            console.log(d.key);
            return classes[d.key];
        }).keys();

        console.log(groups);

        return;

        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 60])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c','#377eb8','#4daf4a']);

        //stack the data? --> stack per subgroup
        var stackedData = d3.stack()
            .keys(subgroups)(data);

        // Show the bars
        svg.append("g")
            .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
            .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return x(d.data.group); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width",x.bandwidth());
    });
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
});
