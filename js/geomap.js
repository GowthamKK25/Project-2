// <!--#######################################################################  
//     Author:  Maria Barrera
//     Date: 04/17/2021
//     GeoMap page to display data visualization of housing prices 
//     in Sacramento, CA using an Excel csv input file.
//     ########################################################################-->

// Coding references:
//    1) R17 - Day 1 - Activity 7 -- replace points with house prices
//    2) R17 - Day 2 - Activity 4 -- to add legend

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Note: MB token / API key -- to be used for this web page only
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const API_KEY = "pk.eyJ1IjoibWJhcnJlcmEwMDciLCJhIjoiY2tuMXhkYmZmMTIydTJ2bWx1aGt5bXQ1aSJ9.kglY5P7hJ14rXkgABJIFkg";

// Create a map object
var myMap = L.map("map", {
    center: [38.575764, -121.47885],  // use Sacramento, CA as starting point
    zoom: 10.5                        // zoom 10x so markers can be seen
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// ---------------------------------------------------------------------------
// Use d3 to open and read excel csv file
// Sacramentorealestatetransactions.csv -- full data
// Sacramentorealestatetransactions_sub1.csv -- subset (removed 0 sq ft data)
// ---------------------------------------------------------------------------
  d3.csv("../Resources/Sacramentorealestatetransactions_sub1.csv").then(data =>{
    renderHouses(data)
    console.log(data)
    // var street = data.street;
    // var latitude = data.latitude;
    // var longitude = data.longitude;
  })

  
function renderHouses(houses){
 // Loop through the houses array and create one marker for each house & 
 // add color coding based on price of the house
  for (var i = 0; i <houses.length; i++) {
  
    // Conditionals for house prices
    var color = "";
    if (houses[i].price > 600000) {
      color = "blue";
     }
    else if (houses[i].price > 500000) {
     color = "green";
    }
    else if (houses[i].price > 400000) {
      color = "aquamarine";
    }
    else if (houses[i].price > 300000) {
      color = "orange";
    }
    else if (houses[i].price > 200000) {
      color = "violet";
    }
    else {
      color = "red";
    }
  
    // Add circles to the map and display the street & price
    L.circle([houses[i].latitude, houses[i].longitude], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: houses[i].price / 500   // Adjust radius of circle by dividing the price
    }).bindPopup(
        "<h4>" + houses[i].street + 
        "</h4> <hr> <h4>Price: " + houses[i].price + "</h4>" +
        "<h4>Sq_ft: " + houses[i].sq__ft + "</h4>" +
        "<h4>BR: " + houses[i].beds + 
        "   BA: " + houses[i].baths + "</h4>" +
        "<h5>Date: " + houses[i].sale_date + "</h5>" 
        ).addTo(myMap);
  }  // end of for loop for function

// ``````````````````````````````````````
// insert legend code here
// ``````````````````````````````````````
//-----------------------------------------------------------------------------------------
// ** since legend is not run as a function, put code as part of the Create Map Function
// // *************************************************************************************
// // Map LEGEND code section
// // Reference -- legend code from student activity 17-Day2-Activities4
// // *************************************************************************************
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
var div = L.DomUtil.create("div", "info legend");

var limits = [0, 1, 2, 3, 4, 5];
var colors = ["red", "violet", "orange", "aquamarine", "green", "blue"];

var labels = [];

// Add min & max
var legendInfo = "<h4>Sacramento Home Prices (2008)" + "</h4>" +
  "</h5> <200k, <300k, <400k, <500k ... >600k)" + "</h5>" + "<h5>"
  "<div class=\"labels\">" +
    // "<div class=\"min\">" + limits[0] + "</div>" +
    // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  "</div>";

div.innerHTML = legendInfo;

limits.forEach(function(limit, index) {
  labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
});

// div.innerHTML += "<ul>" + labels.join("") + "</ul>";
div.innerHTML += labels.join("");
return div;
};

// Adding legend to the map
legend.addTo(myMap);

//----------- end of legend code ----------


}  // end of renderHouses function





