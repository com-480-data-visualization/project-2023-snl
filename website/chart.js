var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


const svg = d3.select("#Data").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", (height + margin.top + margin.bottom))
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

d3.csv('data/food-footprints.csv', createChart);

function createChart(data) {
    var parsed = [];
    var maxVal = 0;

    for(var i = 0; i < d3.keys(data).length; i++) {
        let cost = d3.values(data)[i]["GHG emissions per kilogram (Poore & Nemecek, 2018)"];
        parsed.push([d3.values(data)[i]["Entity"],cost]);

        if(cost > maxVal) {
            maxVal = cost;
        }
    }

    parsed = parsed.sort(function(d0, d1) {return d0[1] - d1[1];}).reverse();

    var x = d3.scaleLinear()
        .domain([0, maxVal + 10])
        .range([ 0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(parsed.map(function(data) { return data[0]; }))
        .padding(.1);

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("bar")
        .data(parsed)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d[0]); })
        .attr("width", function(d) { return x(d[1]); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#985A91");
}
