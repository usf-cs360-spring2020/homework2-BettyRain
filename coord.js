function drawParallelCoord(data) {

  let config = {
    'svg': {},
    'margin': {},
    'plot': {}
  };

  config.svg.height = 470;
  config.svg.width = 950;

  config.margin.top = 20;
  config.margin.right = 10;
  config.margin.bottom = 30;
  config.margin.left = 10;

  let svg = d3.select('body').select('#coord');
  svg.attr('width', config.svg.width);
  svg.attr('height', config.svg.height + config.margin.bottom);

  dimensions = ["par_mean", "k_mean", "female", "ktop1pc_cond_parq1", "ktop1pc_cond_parq5"];
  let color = d3.scaleOrdinal()
    .domain(["1", "2", "3"])
    .range(["#111f9e", "#23bd16", "#eb0d0d"]);

  let yAxis = {}
  for (i in dimensions) {
    name = dimensions[i]
    yAxis[name] = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return +d[name];  }))
      .range([config.svg.height, config.margin.top])
  }

  let xAxis = d3.scalePoint()
    .range([0, config.svg.width])
    .padding(0.25)
    .domain(dimensions);

  function path(d) {
    return d3.line()(dimensions.map(function(p) {
      return [xAxis(p), yAxis[p](d[p])];
    }));
  }

  svg
    .selectAll("lines")
    .data(data)
    .enter().append("path")
    .attr("d", path)
    .style("fill", "none")
    .style("stroke", function(d) {
      return (color(d.iclevel))
    })
    .style("opacity", 0.5)
    .attr("transform", function(d) {
      return translate(0, config.margin.top);
    })

  svg.selectAll("x-axis")
    .data(dimensions).enter()
    .append("g")
    .style("stroke", "black")
    .attr("transform", function(d) {
      return translate(xAxis(d), config.margin.top);
    })
    .style("fill", "none")
    .style("opacity", 0.6)
    .each(function(d) {
      d3.select(this).call(d3.axisLeft().scale(yAxis[d]));
    })

    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -1)
      .text(function(d) {return d;});

    // helper method to make translating easier
    function translate(x, y) {
      return 'translate(' + x + ',' + y + ')';
    }
}
