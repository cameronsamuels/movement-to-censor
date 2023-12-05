(function() { 
    
const container = $("#studentsByRace");

dataSchools = [
    { race: "African American", proportion: .128 },
    { race: "American Indian", proportion: .003 },
    { race: "Asian", proportion: .048 },
    { race: "Hispanic", proportion: .528 },
    { race: "Pacific Islander", proportion: .002 },
    { race: "White", proportion: .263 },
    { race: "Two or more races", proportion: .029 },
];

dataState = [
    { race: "African American", proportion: .117 },
    { race: "American Indian", proportion: .002 },
    { race: "Asian", proportion: .054 },
    { race: "Hispanic", proportion: .402 },
    { race: "Pacific Islander", proportion: .001 },
    { race: "White", proportion: .389 },
    { race: "Two or more races", proportion: .032 },
];

// Declare the chart dimensions and margins.
const width = container.width();
const height = width * 2/3;
const marginTop = 0;
const marginRight = 20;
const marginBottom = 40;
const marginLeft = 90;

// Declare the race scale.
const y = d3.scaleBand()
    .domain(d3.groupSort(dataSchools, ([d]) => d.proportion, (d) => d.race)) // descending proportion
    .range([height - marginBottom, marginTop])
    .padding(0.1);

// Declare the proportion scale.
const x = d3.scaleLinear()
    .domain([0, .6])
    .range([marginLeft, width - marginRight]);
let greatestBarSize = x(d3.max(dataSchools, (d) => d.proportion));

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add a rect for each bar.
svg.append("g")
    .attr("class", "chartSeries")
    .attr("fill", "#777777")
    .selectAll()
    .data(dataSchools)
    .join("rect")
    .attr("y", (d) => y(d.race))
    .attr("x", (d) => marginLeft)
    .attr("width", (d) => x(d.proportion) - x(0))
    .attr("height", y.bandwidth()/2);

// Add data labels for each bar (%).
svg.append("g")
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .selectAll()
    .data(dataSchools)
    .join("text")
    .attr("class", "dataLabel")
    .attr("y", (d) => y(d.race) + y.bandwidth()/2)
    .attr("x", greatestBarSize + 50)
    .text((d) => Math.round(d.proportion*100) + "%");

// Add a rect for each bar.
svg.append("g")
    .attr("class", "chartSeries")
    .attr("fill", "#c0c0c0")
    .selectAll()
    .data(dataState)
    .join("rect")
    .attr("y", (d) => y(d.race) + y.bandwidth()/2)
    .attr("x", (d) => marginLeft)
    .attr("width", (d) => x(d.proportion) - x(0))
    .attr("height", y.bandwidth()/2);

// Add data labels for each bar (%).
svg.append("g")
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .selectAll()
    .data(dataState)
    .join("text")
    .attr("class", "dataLabel")
    .attr("y", (d) => y(d.race) + y.bandwidth()/2)
    .attr("x", greatestBarSize + 50)
    .text((d) => Math.round(d.proportion*100) + "%");

// Add the x-axis and label.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat((y) => (y * 100).toFixed()))
    .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginBottom-5)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("Proportion (%) →"));

// Add the y-axis and label, and remove the domain line.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickSizeInner(0))
    .call(g => g.select(".domain").remove());

// Append the SVG element.
container.append(svg.node());

})();