var User = require('./../js/beer.js').userModule;
var initMap = require('./../js/beer.js').initMapModule;


var displayBreweries = function(array) {
  array.forEach(function(data) {
    $(".showBreweries").append('<li>' + data.name + '<br>' + data.streetAddress + '<br>' + data.phone + '<br>' + data.website +  '<br>' + data.hoursOfOperation + '</li>');
  });
};

$(document).ready(function() {
  initMap();
  $("#user-form").submit(function(event) {
    event.preventDefault();
    $(".showBreweries").empty();



    var currentUserObject = new User();
    var location = $("#location").val();
    var lngLatArray;
    if (isNaN(parseFloat(location))) {
      lngLatArray = currentUserObject.getBeerWithCity(location, displayBreweries);
    } else {
      lngLatArray = currentUserObject.getBeerWithZip(location, displayBreweries);
    }
    currentUserObject.dropPin(location, lngLatArray);
    // var radius = $("#radius").val();
    // console.log(location);
    // console.log(currentUserObject);
  });
});
