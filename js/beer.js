var apiKey = require('./../.env').apiKey;
var stateHash = require('./../state_hash.json');
var mapApiKey = require('./../.env').mapApiKey;


function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru,
    mapTypeId: "terrain"
  });
  return map;
}

function User() {
}

function LngLat(lng, lat) {
  this.lng = lng;
  this.lat = lat;
}

function Brewery(name, streetAddress, phone, website, hoursOfOperation) {
  this.name = name;
  this.streetAddress = streetAddress;
  this.phone = phone;
  this.website = website;
  this.hoursOfOperation = hoursOfOperation;
}

var breweryArray = [];
var lngLatArray = [];
var locationArray = [];

User.prototype.getBeerWithZip = function(location, displayBreweries) {
  locationArray = location.split("-");
  $.get('http://api.brewerydb.com/v2/locations?key=' + apiKey + '&postalCode=' + locationArray[0])
    .then(function(response) {
      response.data.forEach(function(element) {
        var newBrewery = new Brewery(element.name, element.streetAddress, element.phone, element.website, element.hoursOfOperation);
        breweryArray.push(newBrewery);

        breweryArray.forEach(function(brewery) {
          if (brewery.streetAddress != undefined) {
            brewery.streetAddress = brewery.streetAddress;
          } else {
            brewery.streetAddress = "Street Address: N/A";
          }
          if (brewery.phone != undefined) {
            brewery.phone = brewery.phone;
          } else {
            brewery.phone = "Phone: N/A";
          }
          if (brewery.website != undefined) {
            brewery.website = brewery.website;
          } else {
            brewery.website = "Website: N/A";
          }
          if (brewery.hoursOfOperation != undefined) {
            brewery.hoursOfOperation = brewery.hoursOfOperation;
          } else {
            brewery.hoursOfOperation = "Hours of Operation: N/A";
          }
        });
      var newLngLat = new LngLat(parseFloat(element.longitude), parseFloat(element.latitude));
      lngLatArray.push(newLngLat);
    });
    displayBreweries(breweryArray);
  });
    return lngLatArray;
};

User.prototype.getBeerWithCity = function(location, displayBreweries) {
  locationArray = location.split(", ");
  $.get('http://api.brewerydb.com/v2/locations?key=' + apiKey + '&locality=' + locationArray[0] + '&region=' + stateHash[locationArray[1]])
    .then(function(response) {
      response.data.forEach(function(element) {
        var newBrewery = new Brewery(element.name, element.streetAddress, element.phone, element.website, element.hoursOfOperation);
        breweryArray.push(newBrewery);

        breweryArray.forEach(function(brewery) {
          if (brewery.streetAddress != undefined) {
            brewery.streetAddress = brewery.streetAddress;
          } else {
            brewery.streetAddress = "Street Address: N/A";
          }
          if (brewery.phone != undefined) {
            brewery.phone = brewery.phone;
          } else {
            brewery.phone = "Phone: N/A";
          }
          if (brewery.website != undefined) {
            brewery.website = brewery.website;
          } else {
            brewery.website = "Website: N/A";
          }
          if (brewery.hoursOfOperation != undefined) {
            brewery.hoursOfOperation = brewery.hoursOfOperation;
          } else {
            brewery.hoursOfOperation = "Hours of Operation: N/A";
          }
        });
        var newLngLat = new LngLat(parseFloat(element.longitude), parseFloat(element.latitude));
        lngLatArray.push(newLngLat);
      });
      displayBreweries(breweryArray);
    });
    return lngLatArray;
  };

User.prototype.dropPin = function(location, lngLatArray) {
  lngLatArray.forEach(function(lngLat) {
    var position = new google.maps.LatLng(parseFloat(lngLat.latitude), parseFloat(lngLat.longitude));
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: location,
      mapTypeId: "terrain"
    });
    return map;
    var marker = new google.maps.Marker({
      map: map,
      position: position
    });
  });
};

exports.initMapModule = initMap;
exports.userModule = User;
