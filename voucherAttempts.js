(function() { 

const container = $("#voucherAttempts");

data = [
    { year: "2023", count: 15 },
    { year: "2021", count: 0 },
    { year: "2019", count: 0 },
    { year: "2017", count: 1 },
    { year: "2015", count: 1 },
    { year: "2013", count: 2 },
    { year: "2011", count: 2 },
    { year: "2009", count: 1 },
    { year: "2007", count: 1 },
    { year: "2005", count: 2 },
    { year: "2003", count: 1 },
    { year: "2001", count: 1 },
    { year: "1999", count: 1 },
    { year: "1997", count: 0 },
    { year: "1995", count: 1 },
    { year: "1993", count: 1 },
];

// Declare the chart dimensions and margins.
const width = container.width();
const height = width * 1/3;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 40;
const marginLeft = 30;

 // Declare the x (horizontal position) scale.
 const x = d3.scaleLinear(
    d3.extent(data, d => d.year),
    [marginLeft, width - marginRight]
);

 // Declare the y (vertical position) scale.
 const y = d3.scaleLinear(
    [0, d3.max(data, d => d.count)],
    [height - marginBottom, marginTop]
);

 // Declare the line generator.
 const line = d3.line()
     .x(d => x(d.year))
     .y(d => y(d.count));

 // Create the SVG container.
 const svg = d3.create("svg")
     .attr("width", width)
     .attr("height", height)
     .attr("viewBox", [0, 0, width, height])
     .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

 // Add the x-axis.
 svg.append("g")
     .attr("transform", `translate(0,${height - marginBottom})`)
     .call(d3.axisBottom(x).tickFormat(d => d3.timeYear(new Date(d + "-08-01")).getFullYear()).ticks(width / 80).tickSizeOuter(0));

 // Add the y-axis, remove the domain line, add grid lines and a label.
 svg.append("g")
     .attr("transform", `translate(${marginLeft},0)`)
     .call(d3.axisLeft(y).ticks(height / 40))
     .call(g => g.select(".domain").remove())
     .call(g => g.selectAll(".tick line").clone()
         .attr("x2", width - marginLeft - marginRight)
         .attr("stroke-opacity", 0.1))
     .call(g => g.append("text")
         .attr("x", -marginLeft)
         .attr("y", 10)
         .attr("fill", "currentColor")
         .attr("text-anchor", "start")
         .text("↑ Voucher bills"));

 // Append a path for the line.
 svg.append("path")
     .attr("fill", "none")
     .attr("stroke", "#c99C9C")
     .attr("stroke-width", 2.5)
     .attr("d", line(data));

// Append the SVG element.
container.append(svg.node());

})();
