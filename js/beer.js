var apiKey = require('./../.env').apiKey;

function User() {
}

function LngLat(lng, lat) {
  this.lng = lng;
  this.lat = lat;
}

var lngLatArray = [];
var locationArray = [];

User.prototype.getBeerWithZip = function(location, displayBreweries) {
  $.get('http://api.brewerydb.com/v2/locations?key=' + apiKey + '&postalCode=' + location)
    .then(function(response) {

      response.data.forEach(function(element) {
        displayBreweries('<li>' + element.name + '<br>' + element.streetAddress + '<br>' + element.phone + '<br>' + element.website + '<br>' + element.hoursOfOperation + '</li>');
        var newLngLat = new LngLat(parseFloat(element.longitude), parseFloat(element.latitude));
        lngLatArray.push(newLngLat);
      });
    });
    return lngLatArray;
  };

User.prototype.getBeerWithCity = function(location, displayBreweries) {
  locationArray = location.split(", ");
  console.log(location);
  $.get('http://api.brewerydb.com/v2/locations?key=' + apiKey + '&locality=' + locationArray[0] + '&region=' + locationArray[1])
    .then(function(response) {
      console.log(response);
      response.data.forEach(function(element) {
        element.forEach(function(item) {
          if (element.item !== undefined) {
            return element.item;
          } else {
            return "No information available";
          }
        }); //THIS DOESN'T WORK
        //WHAT ABOUT ZIPS WITH HYPHENS
        //WHAT ABOUT NON-STANDARD ADDRESSES? WHAT ABOUT STATE ABBREVS?

        displayBreweries('<li>' + element.name + '<br>' + element.streetAddress + '<br>' + element.phone + '<br>' + element.website +  '<br>' + element.hoursOfOperation + '</li>');
        // var newLngLat = new LngLat(parseFloat(element.longitude), parseFloat(element.latitude));
        // lngLatArray.push(newLngLat);
      });
    });
    // return lngLatArray;
  };


exports.userModule = User;
