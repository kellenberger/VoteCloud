function drawScatterPlot(results){
  $("#legend-checkbox").show();
  $("#graph").html("");
  var margin = {top: 10, right: 20, bottom: 40, left: 40},
  width = $("#graph").width() - margin.left - margin.right,
  height = $("#graph").width() - margin.top - margin.bottom;

  /*
  * value accessor - returns the value to encode for a given data object.
  * scale - maps value to a visual display encoding, such as a pixel position.
  * map function - maps from data value to display value
  * axis - sets up axis
  */

  // setup x
  var xValue = function(d) { return d.yesPercentage;}, // data -> value
  xScale = d3.scale.linear().range([0, width]), // value -> display
  xMap = function(d) { return xScale(xValue(d));}, // data -> display
  xAxis = d3.svg.axis().scale(xScale).orient("bottom");

  // setup y
  var yValue = function(d) { return d.voteParticipation;}, // data -> value
  yScale = d3.scale.linear().range([height, 0]), // value -> display
  yMap = function(d) { return yScale(yValue(d));}, // data -> display
  yAxis = d3.svg.axis().scale(yScale).orient("left");

  // setup fill color
  var cValue = function(d) { return d.bezirk;},
  color = d3.scale.category20();

  // add the graph canvas to the body of the webpage
  var svg = d3.select("#graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // add the tooltip area to the webpage
  var tooltip = d3.select("#graph").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute");

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([0, 100]);
  yScale.domain([0, 100]);

  // x-axis
  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .text("Ja-Stimmen (%)");

  // y-axis
  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Stimmbeteiligung (%)");

  //slims down the axis
  svg.selectAll('.axis path')
     .style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '2px'});

  // draw dots
  svg.selectAll(".dot")
  .data(results)
  .enter().append("circle")
  .attr("class", function(d) { return "dot "+d.bezirk.toLowerCase()})
  .attr("r", 3.5)
  .attr("cx", xMap)
  .attr("cy", yMap)
  .style("fill", function(d) { return color(cValue(d));})
  .on("mouseover", function(d) {
    tooltip.transition()
    .duration(200)
    .style("opacity", .9);
    tooltip.html(d.gemeinde + "<br/>Ja: " + xValue(d)
    + "%<br/>Beteil.: " + yValue(d) + "%")
    .style("left", (d3.event.pageX - 40) + "px")
    .style("top", (d3.event.pageY - 75) + "px");
    $(this).attr("r", 7).attr("stroke", "black");
    this.parentNode.appendChild(this);
  })
  .on("mouseout", function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
    $("circle").attr("r", 3.5).removeAttr("stroke");
  });

  var stepSize, textSize, rectSize;
  if($("body").width()<=600){
    stepSize = 15;
    textSize = 13;
    rectSize = 13;
  } else {
    stepSize = 20;
    textSize = 18;
    rectSize = 18;
  }

  // draw legend
  var legend = svg.selectAll(".legend")
  .data(color.domain())
  .enter().append("g")
  .attr("class", "legend")
  .attr("id", function(d) { return d.toLowerCase(); })
  .attr("transform", function(d, i) { return "translate(0," + i * stepSize + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
  .attr("x", width - 18)
  .attr("width", rectSize)
  .attr("height", rectSize)
  .style("fill", color);

  // draw legend text
  legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .style("font-size", textSize+"px")
  .text(function(d) { return d;})
}
