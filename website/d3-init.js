d3.queue()
    .defer(d3.json, 'https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    .defer(d3.csv, './data/co2-per-unit-energy_with_country_code.csv', row => ({
        country: row.Entity,
        countryCode: row.Country_Code,
        year: +row.Year,
        emissions: +row.Emissions
    }))
    .await((error, mapData, populationData) => {
        if (error) throw error;
        let geoData = topojson.feature(mapData, mapData.objects.countries).features;

        let minYear = d3.min(populationData, d => d.year);
        let maxYear = d3.max(populationData, d => d.year);
        let yearSelect = d3.select("#year-select")
            .property("min", minYear)
            .property("max", maxYear)
            .property("value", minYear);

        yearVal = +yearSelect.property("value");
        emissionType = "emissions";

        // Map functions
        const mapScalefn = mapColorScale(populationData);
        const mapTooltipfn = makeMapTooltip(idCountryMap(geoData, populationData));
        const mapColorfn = setMapColor(geoData, populationData);

        // Map init
        drawMap(geoData);
        mapTooltipfn(emissionType);
        mapColorfn(yearVal, mapScalefn, emissionType);

	// you can store the return of the funcion
	/* var legendElement = legend({
    		color: mapColorScale),
    		title: "Emissions in kg per kWh",
    		tickSize: 0,
	});

	// and then append to some element
	document.getElementById("legend").append(legendElement); */

        // TODO: Init Chart
        // const chartDrawfn = drawLine(populationData);
        let chartDrawfn;

        function updateChart(country) {
          d3.selectAll(".country").style("stroke", "none");
          d3.select(this).style("stroke", "black");
          chartDrawfn = drawLine(populationData);
          chartDrawfn(country.properties.country, emissionType);
        }
    
        function removeChart() {
          d3.selectAll(".country").style("stroke", "none");
          d3.select("#line-chart").selectAll("svg").remove();
        }

        yearSelect
            .on("change", d => {
                yearVal = +d3.event.target.value;
                mapColorfn(yearVal, mapScalefn, emissionType);
                // cleaning up
                d3.selectAll(".country").style("stroke", "none");
                // TODO: Clean Chart
            });

        d3.selectAll(".country")
            .on("mouseenter", function (d) {
                updateChart.call(this, d);
            })
            .on("mouseleave", function () {
                removeChart();
            });
            // .on("click", function(d) {
            //     d3.selectAll(".country").style("stroke", "none");
            //     d3.select(this).style("stroke", "black");
            //     let countryData = d;
            //     // TODO: Draw the Chart
            //     chartDrawfn(countryData.properties.country, emissionType);
            // });
    });

// d3.queue()
//   .defer(d3.json, 'https://unpkg.com/world-atlas@1.1.4/world/50m.json')
//   .defer(d3.csv, './data/co2-per-unit-energy_with_country_code.csv', row => ({
//     country: row.Entity,
//     countryCode: row.Country_Code,
//     year: +row.Year,
//     emissions: +row.Emissions
//   }))
//   .await((error, mapData, populationData) => {
//     if (error) throw error;
//     let geoData = topojson.feature(mapData, mapData.objects.countries).features;

//     let minYear = d3.min(populationData, d => d.year);
//     let maxYear = d3.max(populationData, d => d.year);
//     let yearSelect = d3.select("#year-select")
//       .property("min", minYear)
//       .property("max", maxYear)
//       .property("value", minYear);

//     let yearVal = +yearSelect.property("value");
//     let emissionType = "emissions";

//     // Map functions
//     const mapScalefn = mapColorScale(populationData);
//     const mapTooltipfn = makeMapTooltip(idCountryMap(geoData, populationData));
//     const mapColorfn = setMapColor(geoData, populationData);

//     // Map init
//     drawMap(geoData);
//     mapTooltipfn(emissionType);
//     mapColorfn(yearVal, mapScalefn, emissionType);

//     // Initialize Chart
//     let chartDrawfn;

//     function updateChart(country) {
//       d3.selectAll(".country").style("stroke", "none");
//       d3.select(this).style("stroke", "black");
//       chartDrawfn = drawLine(populationData);
//       chartDrawfn(country.properties.country, emissionType);
//     }

//     function removeChart() {
//       d3.selectAll(".country").style("stroke", "none");
//       d3.select("#line-chart").selectAll("svg").remove();
//     }

//     yearSelect.on("change", () => {
//       yearVal = +d3.event.target.value;
//       mapColorfn(yearVal, mapScalefn, emissionType);
//     });

//     d3.selectAll(".country")
//       .on("mouseenter", function (d) {
//         updateChart.call(this, d);
//       })
//       .on("mouseleave", function () {
//         removeChart();
//       });
//   });


