var carrierCount = d3.nest()
	.key(function(d) { return d.carrier; })
	.rollup(function(v) { return v.length; })
	.entries(trips);

var margin = {top: 10, right: 30, bottom: 40, left: 40},
	width = 1000,
	height = 500,
	padding = width/200;

var x = d3.scaleBand()
	.domain(carrierCount.map(function(d){return d.key;}))
	.rangeRound([0, width - margin.left - margin.right])
	.padding(0.2);
	
var y = d3.scaleLinear([0, d3.max(carrierCount, function(d){return d.value;})])
	.range([height - margin.top - margin.bottom, 0]);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.selectAll("rect")
    .data(carrierCount)
    .enter()
	.append("rect")
    .attr("class", "bar")
    .attr("x", function(d,i){return i*((width - margin.left - margin.right)/carrierCount.length + padding);})
	.attr("y", function(d) { return (height - margin.top - margin.bottom) - ((height - margin.top - margin.bottom)*d.value/d3.max(carrierCount, function(d){return d.value;})); })
    .attr("width", (width - margin.left - margin.right)/carrierCount.length-padding)
    .attr("height", function(d) { return (height - margin.top - margin.bottom)*d.value/d3.max(carrierCount, function(d){return d.value;}); })
	.attr("fill", "steelblue");
	
svg.append("g")
	.attr("transform", "translate(0," + (height-margin.bottom) + ")")
	.call(d3.axisBottom(x));
