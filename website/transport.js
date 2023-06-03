d3.csv('./data/carbon-footprint-travel-mode.csv', createChart);

function createChart(data) {
    var margin = {top: 50, right: 100, bottom: 100, left: 300},
        width = 1200 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    const svg = d3.select("#Transport").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", (height + margin.top + margin.bottom))
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    var parsed = [];
    var maxVal = 0;

    for(var i = 0; i < d3.keys(data).length; i++) {
        let cost = d3.values(data)[i]["ghg"];
        parsed.push([d3.values(data)[i]["Entity"],cost]);

        if(cost > maxVal) {
            maxVal = cost;
        }

        console.log(cost + " " + maxVal);
    }

    maxVal = 260;

    parsed = parsed.sort(function(d0, d1) {return d0[1] - d1[1];}).reverse();

    var x = d3.scaleLinear()
        .domain([0, maxVal + 10])
        .range([ 0, width]);

    svg.append("g")
        .attr("class", "axisDoom")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", doomOne.foreground)
        .style("font-size", "25px");

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(parsed.map(function(data) { return data[0]; }))
        .padding(.25);

    svg.append("g")
        .attr("class", "axisDoom")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("fill", doomOne.foreground)
        .style("font-size", "25px");

    svg.selectAll("bar")
        .data(parsed)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d[0]); })
        .attr("width", function(d) { return x(d[1]); })
        .attr("height", y.bandwidth() )
        .attr("fill", doomOne.color4);

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", height + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "25px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .style("fill", doomOne.foreground)
        .text("g of Co2 per Passenger Km");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "35px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .style("fill", doomOne.color5)
        .text("Transport Carbon Footprint");

}
