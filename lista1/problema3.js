var margin = {top: 35, right: 10, bottom: 50, left: 10};
var width = 700 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%b");

var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
var xAxisScale = d3.scaleLinear().domain([0, 11]).range([xScale(15), xScale(90)]);
var yAxisScale = d3.scaleLinear().domain([10, 30]).range([yScale(10), yScale(90)]);
var monthScale = d3.scaleTime().domain([parseTime("Jan"), parseTime("Dec")]).range(xAxisScale.range());

var dataHigh  = [ 27.3, 28.0, 27.2, 25.1, 23.0, 21.8, 21.8, 23.3, 23.9, 24.8, 25.9, 26.3 ];
var dataDaily = [ 22.1, 22.4, 21.8, 19.7, 17.4, 16.3, 15.8, 17.1, 17.9, 19.0, 20.2, 21.1 ];
var dataLow   = [ 18.7, 18.8, 18.2, 16.3, 13.8, 12.4, 11.7, 12.8, 13.9, 15.3, 16.6, 17.7 ];


var mySVG = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.axisTop(monthScale).tickFormat(d3.timeFormat("%b")).tickSizeInner(0);
var xAxisGroup = mySVG.append("g")
.attr("class","xAxis")
.attr("transform","translate(0,"+yScale(92)+")")
.call(customXAxis);

var yAxis = d3.axisLeft(yAxisScale).ticks(5).tickSizeInner(-xScale(85)).tickPadding(10);
var yAxisGroup = mySVG.append("g")
.attr("class","yAxis")
.attr("transform","translate(" + xScale(10) + ",0)")
.call(customYAxis);


function customXAxis(g) {
	g.call(xAxis);
	g.select(".domain").remove();
}

function customYAxis(g) {
	g.call(yAxis);
	g.select(".domain").remove();
}



mySVG.append("text")
.attr("transform", "translate(" + (width/2) + " ," + (0) + ")")
.style("text-anchor", "middle")
.style("font-family", "sans-serif")
.text("Sao Paulo, Annual Temperature");

mySVG.append("text")
.attr("transform", "rotate(-90)")
.attr("y", xScale(5))
.attr("x",0 - (height / 2))
.style("text-anchor", "middle")
.style("font-family", "sans-serif")
.text("Temp deg C");


mySVG.append("text")
.attr("transform", "translate(" + (width/2-80) + " ," + (height) + ")")
.style("text-anchor", "left")
.style("font-family", "sans-serif")
.text("Average Daily temp C");

mySVG.append("text")
.attr("transform", "translate(" + (width/2-80) + " ," + (height+20) + ")")
.style("text-anchor", "left")
.style("font-family", "sans-serif")
.text("Mean daily maximum temp C");

mySVG.append("text")
.attr("transform", "translate(" + (width/2-80) + " ," + (height+40) + ")")
.style("text-anchor", "left")
.style("font-family", "sans-serif")
.text("Mean daily minimum temp C");

var rectangle = mySVG.append("rect")
.attr("x", (width/2 - 130))
.attr("y", (height-5))
.attr("width", xScale(5))
.attr("height", 1)
.attr("fill", "none")
.attr("stroke-width", 1)
.attr("stroke", "black");

var rectangle = mySVG.append("rect")
.attr("x", (width/2 - 130))
.attr("y", (height-5+20))
.attr("width", xScale(5))
.attr("height", 1)
.attr("fill", "none")
.attr("stroke-width", 1)
.attr("stroke", "red");

var rectangle = mySVG.append("rect")
.attr("x", (width/2 - 130))
.attr("y", (height-5+40))
.attr("width", xScale(5))
.attr("height", 1)
.attr("fill", "none")
.attr("stroke-width", 1)
.attr("stroke", "blue");



var linePath = d3.line()
.x(function(d,i) { return xAxisScale(i); })
.y(function(d,i) { return yAxisScale(d); });

var line = mySVG.append("path")
.attr("stroke", "red")
.attr("stroke-width", 2)
.attr("fill", "none")
.attr("d", linePath(dataHigh));
	
var line = mySVG.append("path")
.attr("stroke", "black")
.attr("stroke-width", 2)
.attr("fill", "none")
.attr("d", linePath(dataDaily));

var line = mySVG.append("path")
.attr("stroke", "blue")
.attr("stroke-width", 2)
.attr("fill", "none")
.attr("d", linePath(dataLow));


