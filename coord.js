// location of data file
let csv = 'fulldata.csv';

// function to convert into date
// try: parseRowDate('197912');
let parseRowDate = d3.timeParse('%Y%m');

// configuration of svg/plot area
let config = {
  'svg': {},
  'margin': {},
  'plot': {}
};

config.svg.height = 450;
config.svg.width = config.svg.height * 1.618; // golden ratio

config.margin.top = 10;
config.margin.right = 10;
config.margin.bottom = 30;
config.margin.left = 10;

config.plot.x = config.margin.left;
config.plot.y = config.margin.top;
config.plot.width = config.svg.width - config.margin.left - config.margin.right;
config.plot.height = config.svg.height - config.margin.top - config.margin.bottom;

// setup svg
let svg = d3.select('body').select('#coord-chart');
svg.attr('width', config.svg.width);
svg.attr('height', config.svg.height);


d3.csv(csv, convertRow).then(drawChart);

// function to convert each row
// we need sum of passengers && activity period in days
// https://github.com/d3/d3-fetch/blob/master/README.md#csv
function convertRow(row, index) {
  let out = {};
  out.date = new Date()
  out.num = 0;

  for (let col in row) {
    switch (col) {
      case 'Activity Period':
        out.date = parseRowDate(row[col]);
        break;

      case 'Passenger Count':
        out.num = parseInt(row[col]);
        break;
    }
  }
  return out;
}

function drawChart(inputData) {
  //https://www.d3-graph-gallery.com/graph/parallel_basic.html

}


// helper method to make translating easier
function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}
