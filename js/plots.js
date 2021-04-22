/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
 
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


// Submit Button handler
function handleSubmit() {
  // @TODO: YOUR CODE HERE
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value;
  // clear the input value
  d3.select("#stockInput").node().value="";
  // Build the plot with the new stock 
buildPlot(stock)

}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
// @TODO: YOUR CODE HERE
buildPlots(stock);

   // @TODO: Grab Name, Stock, Start Date, and End Date from the response json object to build the plots
   var name = data.dataset.name;
   var stock = data.dataset.dataset_code;
   var startDate = data.dataset.start_date;
   var endDate = data.dataset.end_date;
   // @TODO: Unpack the dates, open, high, low, and close prices
   var dates = unpack(data.dataset.data, 0);
   var openingPrices= unpack(data.dataset.data, 1);
   var highPrices = unpack(data.dataset.data, 2);
   var lowPrices = unpack(data.dataset.data, 3);
   var closingPrices = unpack(data.dataset.data, 4); 
   var volume = unpack(data.dataset.data, 5);

   getMonthlyData();

function buildPlot(stock) {
  var apiKey = "7LUKdL78CJHGZeGdZj11";

  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2018-01-01&api_key=${apiKey}`;

  d3.json(url).then(function(data) {
    // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date; 

    var dates = unpack(data.dataset.data, 0);
    var openingPrices= unpack(data.dataset.data, 1);
    var highPrices = unpack(data.dataset.data, 2);
    var lowPrices = unpack(data.dataset.data, 3);
    var closingPrices = unpack(data.dataset.data, 4); 
  
    // Print the names of the columns
    console.log(data.dataset.column_names);
    // Print the data for each day
    console.log(data.dataset.data);
    var dates = data.dataset.data.map(row => row[0]);
    // console.log(dates);
    var closingPrices = data.dataset.data.map(row => row[4]);
    // console.log(closingPrices);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };
    var trace2 = {
      type: "candlestick",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };


    var data = [trace1,trace2];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      },
      showlegend: false
    };


    Plotly.newPlot("plot", data, layout);

  });

} 
buildPlot();