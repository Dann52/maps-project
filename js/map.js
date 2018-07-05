// added map definition and initMap function to separate js file to allow for asynchronous loading of google maps
var map;


//initmap function contains the styles that will be used in the map, as well as asigning a google maps object to the map variable
var initMap = function() {
  // Create a styles array to use with the map.
  // styles taken from https://snazzymaps.com/style/14814/vintage-simple-blue-and-yellow
  var styles = [
{
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#0096aa"
      },
      {
          "weight": "0.30"
      },
      {
          "saturation": "-75"
      },
      {
          "lightness": "5"
      },
      {
          "gamma": "1"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "color": "#0096aa"
      },
      {
          "saturation": "-75"
      },
      {
          "lightness": "5"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "labels.text.stroke",
  "stylers": [
      {
          "color": "#ffe146"
      },
      {
          "visibility": "on"
      },
      {
          "weight": "6"
      },
      {
          "saturation": "-28"
      },
      {
          "lightness": "0"
      }
  ]
},
{
  "featureType": "administrative",
  "elementType": "labels.icon",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#e6007e"
      },
      {
          "weight": "1"
      }
  ]
},
{
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [
      {
          "color": "#ffe146"
      },
      {
          "saturation": "-28"
      },
      {
          "lightness": "0"
      }
  ]
},
{
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "all",
  "stylers": [
      {
          "color": "#0096aa"
      },
      {
          "visibility": "simplified"
      },
      {
          "saturation": "-75"
      },
      {
          "lightness": "5"
      },
      {
          "gamma": "1"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.text",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#ffe146"
      },
      {
          "weight": 8
      },
      {
          "saturation": "-28"
      },
      {
          "lightness": "0"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#0096aa"
      },
      {
          "weight": 8
      },
      {
          "lightness": "5"
      },
      {
          "gamma": "1"
      },
      {
          "saturation": "-75"
      }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
},
{
  "featureType": "transit",
  "elementType": "all",
  "stylers": [
      {
          "visibility": "simplified"
      },
      {
          "color": "#0096aa"
      },
      {
          "saturation": "-75"
      },
      {
          "lightness": "5"
      },
      {
          "gamma": "1"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [
      {
          "visibility": "on"
      },
      {
          "color": "#0096aa"
      },
      {
          "saturation": "-75"
      },
      {
          "lightness": "5"
      },
      {
          "gamma": "1"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.text",
  "stylers": [
      {
          "visibility": "simplified"
      },
      {
          "color": "#ffe146"
      },
      {
          "saturation": "-28"
      },
      {
          "lightness": "0"
      }
  ]
},
{
  "featureType": "water",
  "elementType": "labels.icon",
  "stylers": [
      {
          "visibility": "off"
      }
  ]
}
];

  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.2207149, lng: -74.006913},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });

  var script   = document.createElement("script");
  script.type  = "text/javascript";
  script.src   = "./js/app.js";    // use this for linked script
  document.body.appendChild(script);

}

// created function to be ran when google maps is not functioning (onerror)

function googleError() {
    alert("There was an error loading Google Maps. Please try again later.");
}
