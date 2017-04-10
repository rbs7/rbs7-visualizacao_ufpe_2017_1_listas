var parseTime = d3.timeParse("%d/%m/%Y");

var priceData = trips.map(function(d) {
		return [Math.round(((new Date(parseTime(d.start))) - (new Date(parseTime(d.post))))/(1000*60*60*24)), d.price];
	}
)



var margin = {top: 10, right: 30, bottom: 40, left: 40},
	width = 1000,
	height = 500;

var x = d3.scaleLinear([0, d3.max(priceData, function(d){return d[0];})])
	.range([0, width - margin.left - margin.right]);
	
var y = d3.scaleLinear([0, d3.max(priceData, function(d){return d[1];})])
	.range([height - margin.top - margin.bottom, 0]);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("circle")
	.data(priceData)
	.enter().append("circle")
	.attr("r", 5)
	.attr("cx", function(d) { return d[0];})
	.attr("cy", function(d) { return d[1];})
	.style("fill", "steelblue");

	
svg.append("g")
	.attr("transform", "translate(0," + (height-margin.bottom) + ")")
	.call(d3.axisBottom(x));

svg.append("g")
	.attr("transform", "translate(0," + (0) + ")")
	.call(d3.axisLeft(y));
