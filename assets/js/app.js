// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 75
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read csv
d3.csv("assets/data/data.csv").then(function(healthData){

    healthData.forEach(function(data){

        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
    });

    // Create Scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d=> d.poverty) *0.8,d3.max(healthData, d=> d.poverty)*1.2])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0,d3.max(healthData, d => d.healthcare)])
        .range([height,0]);

    //create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale); 

    //Append x axis
    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    //Append y axis
    var yAxis = chartGroup.append("g")
        .call(leftAxis);


    var circles = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("g");
        
    //Append initial circles
    var circlesGroup = circles.append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d=> yLinearScale(d.healthcare))
        .attr("r",10)
        .classed('stateCircle', true);
    
    var circlesText = circles.append("text")
        .text(d => d.abbr)
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d=> yLinearScale(d.healthcare) +5)
        .classed('stateText', true);

    
    // Step 1: Initialize Tooltip
    var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br> Poverty ${d.poverty}`);
    });

    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
    toolTip.show(d, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
      toolTip.hide(d);
    });

     // Create axes labels
     chartGroup.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 40)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .attr("class", "aText")
     .text("Lacks Healthcare (%)");

    chartGroup.append("text")
     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
     .attr("class", "aText")
     .text("In Poverty (%)");
});