var margin = {top: 10, right: 10, bottom: 25, left: 25};
var width = 500 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
var cScale = d3.scaleLinear().domain([0, 100]).range(["gray","blue"]);

var mySVG = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxisGroup = mySVG.append("g")
.attr("class","xAxis")
.attr("transform","translate(0,"+(height)+")");
var xAxis = d3.axisBottom(xScale);
xAxisGroup.call(xAxis);

var yAxisGroup = mySVG.append("g")
.attr("class","yAxis");
var yAxis = d3.axisLeft(yScale);
yAxisGroup.call(yAxis);

var text = d3.select("body").append("p");

randomFunction ()

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomFunction () {
	var n = getRandomInt(2,15);
	var data = new Array();
	for (i = 0; i < n; i++) {
		data.push([Math.random()*100, Math.random()*100, Math.random()*5+1, Math.random()*100]);
	}
	
	var circles = mySVG
	.selectAll("circle")
	.data(data, function(d) { return(d); });
	
	circles.enter()
	.append("circle")
	.attr("cx", function(d){return xScale(d[0])})
	.attr("cy", function(d){return yScale(d[1])})
	.attr("r", function(d){return xScale(d[2])})
	.attr("fill", function(d){return cScale(d[3])});
	
	circles.exit().remove();
	
	text.text("Total: " + n + " circles");
}
