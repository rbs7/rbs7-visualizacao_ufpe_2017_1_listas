var margin = {top: 10, right: 10, bottom: 25, left: 25};
var width = 500 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
var xAxisScale = d3.scaleLinear().domain([0, 11]).range([xScale(15), xScale(90)]);
var yAxisScale = d3.scaleLinear().domain([10, 30]).range([yScale(10), yScale(90)]);
var monthScale = d3.scaleOrdinal().domain(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]).range([xScale(15), xScale(90)]);

var dataHigh  = [ 27.3, 28.0, 27.2, 25.1, 23.0, 21.8, 21.8, 23.3, 23.9, 24.8, 25.9, 26.3 ];
var dataDaily = [ 22.1, 22.4, 21.8, 19.7, 17.4, 16.3, 15.8, 17.1, 17.9, 19.0, 20.2, 21.1 ];
var dataLow   = [ 18.7, 18.8, 18.2, 16.3, 13.8, 12.4, 11.7, 12.8, 13.9, 15.3, 16.6, 17.7 ];


var mySVG = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxisGroup = mySVG.append("g")
.attr("class","xAxis")
.attr("transform","translate(0,0)");
var xAxis = d3.axisBottom(xAxisScale);
xAxisGroup.call(xAxis);

var yAxisGroup = mySVG.append("g")
.attr("class","yAxis");
var yAxis = d3.axisLeft(yAxisScale);
yAxisGroup.call(yAxis);


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



