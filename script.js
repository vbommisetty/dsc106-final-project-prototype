document.addEventListener('DOMContentLoaded', function() {
    const width = 800;
    const height = 600;
    const projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2])
        .scale(1000);
    const path = d3.geoPath().projection(projection);
    const svg = d3.select("#map");
    const tooltip = d3.select("#tooltip");

    Promise.all([
        d3.json('us-states.geojson'),
        d3.json('states_data.json')
    ]).then(function([geojsonData, stateData]) {
        geojsonData.features.forEach(feature => {
            const stateInfo = stateData[feature.properties.name];
            if (stateInfo) {
                feature.properties.going_to_california = +stateInfo.going_to_california; 
            }
        });

        const maxMigration = d3.max(geojsonData.features, d => d.properties.going_to_california);
        const colorScale = d3.scaleLinear()
            .domain([0, maxMigration])
            .range(["#4280eb", "#013b11"]); 

        svg.selectAll("path")
            .data(geojsonData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => d.properties.name === "California" ? "#8953fc" : colorScale(d.properties.going_to_california))
            .attr("stroke", "white")
            .attr("stroke-width", "2.5")
            .on("mouseover", function(event, d) {
                d3.select(this).attr("fill", "#ff9ee7");
                tooltip
                    .style("left", (event.pageX + 20) + "px")
                    .style("top", (event.pageY - 20) + "px")
                    .style("visibility", "visible")
                    .html(`State: ${d.properties.name}<br>Coming from California: ${d.properties.going_to_california}`);
            })
            .on("mousemove", function(event, d) {
                tooltip
                    .style("left", (event.pageX + 20) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function(event, d) {
                d3.select(this).attr("fill", d.properties.name === "California" ? "#8953fc" : colorScale(d.properties.going_to_california));
                tooltip.style("visibility", "hidden"); 
            });
    });
});
