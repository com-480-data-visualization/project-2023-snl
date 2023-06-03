function drawLine(data) {
    let axisSize = 60;
    let padding = 20;
    let barPadding = 10;
  
    const margin = {top: 40, right: 80, bottom: 400, left: 80},
      width = 1000 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
  
    let years = [...new Set(data.map(d => d.year))].sort();
    let yearRange = d3.extent(data, d => d.year);
  
    const element = document.getElementById('line-chart');
  
    // Appending svg to a selected element
    const svg = d3.select(element)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .attr("viewBox", `0 40 ${width + 80} ${height}`)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    svg.append('text')
        .attr("x", width / 2 - 220)
        .attr("y", padding)
        .classed("chart-title", true)
        .text("Please click on a country on the map")
        .style("fill", doomOne.foreground)
        .style("font-size", "25px");

  
    function update(country, option) {
        let newData = data
            .filter(d => d.country === country)
            .sort((a, b) => a.year - b.year);
        
        let cntryData = fixMissingYear(newData, years);
        console.log(cntryData);
        
        const lineData = cntryData.map( item => (
            {
                emissions: item.emissions,
                year: item.year
            })); 
        
        console.log(lineData);
        
        const parsedData = [{values: lineData}];
        
        console.log(parsedData);
        
        svg.html("");
        
        svg.selectAll(".yearly-emission") .attr("height", 0);
  
        // Setting X,Y scale ranges
        const xScale = d3.scaleTime()
              .domain([
                  d3.min(parsedData, (d) => d3.min(d.values, (v) => v.year)),
                  d3.max(parsedData, (d) => d3.max(d.values, (v) => v.year))
              ])
              .range([0, width]);
        
        const yScale = d3.scaleLinear()
              .domain([
                  d3.min(parsedData, (d) => d3.min(d.values, (v) => v.emissions)),
                  d3.max(parsedData, (d) => d3.max(d.values, (v) => v.emissions))
              ])
              .range([height, 0]);
        
        const chartSvg = svg.selectAll('.line')
              .data(parsedData)
              .enter();
        
        // Drawing line with inner gradient and area
        // Adding functionality to make line and area curved
        const line = d3.line()
              .x(function(d) {
                  return xScale(d.year);
              })
              .y(function(d) {
                  return yScale(d.total);
              })
              .curve(d3.curveCatmullRom.alpha(0.5));
        
        // Defining initial area, which appear on chart load
        const zeroArea = d3.area()
              .x(function(d) { return xScale(d.year); })
              .y0(height)
              .y1(function() { return 0; })
              .curve(d3.curveCatmullRom.alpha(0.5));
        
        // Defining the area, which appear after animation ends
        const area = d3.area()
              .x(function(d) { return xScale(d.year); })
              .y0(height)
              .y1(function(d) { return yScale(d.emissions); })
              .curve(d3.curveCatmullRom.alpha(0.5));
        
        // Defining the line path
        const path = chartSvg.append('path')
              .attr('d', function(d) {
                  return line(d.values);
              })
              .attr('stroke-width', '2')
              .style('fill', 'none')
              .attr('stroke', doomOne.color3);
        
        console.log(path);
        
        const length = path.node().getTotalLength(); // Get line length
        
        console.log(length);
        
        // Drawing animated line
        /* path.attr("stroke-dasharray", length + " " + length)
           .attr("stroke-dashoffset", length)
           .transition()
           .ease(d3.easeLinear)
           .attr("stroke-dashoffset", 0)
           .delay(1500)
           .duration(3000) */
        
        // Drawing animated area
        chartSvg.append("path")
            .attr("d", function(d) {
                return zeroArea(d.values);
            })
            .style('fill', doomOne.color4)
            .transition()
            .duration(1500)
            .attr("d", function(d) {
                return area(d.values);
            })
            .style('fill', doomOne.color4);
        
        // Adding the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "axisDoom")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("fill", doomOne.foreground)
            .style("font-size", "25px");
        
        // Adding the y Axis
        svg.append("g")
            .attr("class", "axisDoom")
            .call(d3.axisLeft(yScale));
        
        svg
            .select(".chart-title")
            .text(`${option} history for ${country}`);
        
    }
    
    return update;
}

function fixMissingYear(data, years) {
    let fixedData = [];
    let { country, continent, countryCode } = data[0];
    years
        .forEach(year => {
            let [row] = data.filter(d => d.year === year);
            if(row) {
                fixedData.push(row);
            } else {
                fixedData.push({
                    year,
                    country,
                    countryCode,
                    continent,
                    emissions: 0,
                    emissionsPerCapita: 0
                });
            }
        });

    return fixedData;
  }

  
