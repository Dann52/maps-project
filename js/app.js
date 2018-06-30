//create initial venues
var asburyVenues = [
        {
            title : 'The Stone Pony',
            location : {lat: 40.22000, lng: -74.0009},
            website : 'http://www.stoneponyonline.com/',
            infowindow : '',
            urlId : '4aab0148f964a5207f5820e3'
        },
        {
            title : 'Langosta Lounge',
            location : {lat: 40.2205798, lng: -74.0009478},
            website : 'https://www.langostalounge.com/',
            infowindow : '',
            urlId : '4ae5f327f964a52070a321e3'
        },
        {
            title : 'Wonder Bar',
            location : {lat: 40.2223824, lng: -74.0006963},
            website : 'http://wonderbarasburypark.com/',
            infowindow : '',
            urlId : '4b367e79f964a520b63625e3'
        },
        {
            title : 'Paramount Theatre',
            location : {lat: 40.223689, lng: -73.9986552},
            website : 'http://www.apboardwalk.com/portfolio/paramount-theatre/',
            infowindow : '',
            urlId : '4b74aba1f964a52083eb2de3'
        },
        {
            title : 'Porta',
            location : {lat: 40.2202, lng: -74.0023},
            website : 'https://pizzaporta.com/',
            infowindow : '',
            urlId : '4dea6b8db0fb8293f7d412d3'
        }
    ];


var Venue = function(data) {
    //set this data based on the data/object literal that will be passed in below in the viewmodel
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
    this.website = ko.observable(data.website);
    this.infowindow = ko.observable(data.infowindow);
    this.urlId = ko.observable(data.urlId);
}

//client id and secret for foursquare app
var client_id = 'WURVWWIXUCBOFRGJPZVKO0QG2DMNEW5IIUWFZA12WOKURI22';
var client_secret = 'T4N5NCARC5KS3WJKKQICXIHCUK2PA5T1CQXRBC5CHCZ23UMJ';



var ViewModel = function() {
    // create self reference to this so that we can easily refer to ViewModel
    var self = this;

    // create a venue list that will store all the venues above
    this.venueList = ko.observableArray([]);

    //push all venues from asburyVenues above into the venueList
    asburyVenues.forEach(function(venueItem) {
        self.venueList.push( new Venue(venueItem));
    });



    // create foursquare function
    self.foursquare = function(venueURL, marker) {
        var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + marker.urlIdMarker + '?client_id=' + client_id + '&client_secret=' + client_secret + '&v=20180323';
        // use ajax to download data from foursquare
        $.ajax({
          url: foursquareUrl,
          cache: true,
          dataType: 'jsonp'
          // use .done and pass in results to function 
          }).done(function(results) {
            var venueDetails = results.response.venue;
            var name = venueDetails.name;
            var rating = venueDetails.rating;
            // if the venu has an hours property that has a status property, save status to hours variable.  This will allow us to display if the venue is currently open or not, and when the venue will open/close
            var hours = venueDetails.hasOwnProperty('hours') ? venueDetails.hours : '';
            if (hours.hasOwnProperty('status')) {
              var hours = venueDetails.hours.status;
            }
            var contact = venueDetails.hasOwnProperty('contact') ? venueDetails.contact : '';
            if (contact.hasOwnProperty('formattedPhone')) {
              var phone = venueDetails.contact.formattedPhone; 
            }
            var address = venueDetails.hasOwnProperty('location') ? venueDetails.location : '';
            if (address.hasOwnProperty('formattedAddress')) {
              var address = venueDetails.location.address + '<br>' + venueDetails.location.city + ', ' + venueDetails.location.state + ' ' + venueDetails.location.postalCode;
            }
            var photo = (venueDetails.bestPhoto.prefix + '125x125' + venueDetails.bestPhoto.suffix);
            self.contentString = ('<div class="infoTitle">' + name + '</div>' + '<div> Rating: ' + rating + '</div>' + '<div>' + hours + '</div>' + '<hr>' + '<img src="' + photo + '">' + '<hr>' + '<div>' + phone + '</div>' + '<div class="address">' + address + '</div>');
            self.populateInfoWindow(marker, largeInfowindow);
          }).fail(function(jqXHR, textStatus) {
            alert('Nothing Found!');
          });
    };


      //create map variable that will store the google maps object
      var map;
      // Create a new blank array for all the listing markers.
      var markers = [];

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

      }
      
      // intialize the initMap function 
      initMap()


      // create largeInfowindow object that is an instance of the google maps infowindow object. 
      // this gets passed into the populate info window function, which is called inside foursquare
      var largeInfowindow = new google.maps.InfoWindow();

      // Style the markers. 
      var defaultIcon = makeMarkerIcon('7B3234');
      // Create a "highlighted" marker color for when the user mouses over the marker.
      var highlightedIcon = makeMarkerIcon('EEA222');

      // The following loop uses the location array to create an array of markers on initialize.
      for (var i = 0; i < asburyVenues.length; i++) {
        // Get the position from the location array.
        var position = asburyVenues[i].location;
        var title = asburyVenues[i].title;
        var urlId = asburyVenues[i].urlId;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          icon: defaultIcon,
          urlIdMarker: urlId,
          id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        //self.venueList()[i].marker.push(marker);
        self.venueList()[i].marker = marker;

        // add a listener to each marker so that foursquare function is executed, which in turn opens the info window
        marker.addListener('click', function() {
            // execute foursquare function, pass in the urlId to the associated marker for this venue, as well as the marker
            self.foursquare(this.urlIdMarker, this);
            toggleBounce(this);
        });

        // toggle bounce function taken from google's documentation 
        function toggleBounce(marker) {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function(){ marker.setAnimation(null); }, 1000);
            }
          }
    
        // Two event listeners - one for mouseover, one for mouseout, to change the colors back and forth.
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultIcon);
        });
      }

      // This function populates the infowindow when the marker is clicked. We'll only allow one infowindow which will open at the marker that is clicked, and populate based on that markers position.
      self.populateInfoWindow = function(marker, infowindowpassed) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindowpassed.marker != marker) {
          // set content to viewmodel variable contentstring, which is populated inside the foursquare function
          infowindowpassed.setContent(self.contentString);
          infowindowpassed.marker = marker;
          // Make sure the marker property of the infowindow is cleared if the infowindow is closed.
          infowindowpassed.addListener('closeclick', function() {
            infowindowpassed.marker = null;
          });

          infowindowpassed.open(map, marker);
        }
      }


      // This function will loop through the markers array and display them all.
      self.showListings = function() {
        bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      } 

      //show all the listings when page loads
      self.showListings();


      this.selectOneMarker = function(oneVenue) {
        google.maps.event.trigger(oneVenue.marker, 'click');
      }

      // query that will be used in search function 
      self.query = ko.observable("");
      // set content string that will be used in foursquare function 
      self.contentString = " ";

      // venueListResult function returns a list of venues
      this.venueListResult = ko.computed(function() {
        //value of query set in search box set to lowercase
        var query = self.query().toLowerCase();
        //set the marker to visible if a venue is in the venue list
        for (var i = 0; i < self.venueList().length; i++) {
          if (self.venueList()[i].marker) {
            self.venueList()[i].marker.setVisible(true);
          }
        }
        // If query doesn't have a value, return the venue list
        if (!query) {
          return self.venueList();
        } else
        //if query does have a value, return a filtered venue list that takes the venue list and an anonymous function as arguments. The anon function takes as an argument each item in the venue list, and compares it agains the value of query, and confirms that query has a value.
        {
          return ko.utils.arrayFilter(self.venueList(), function(item) {
            var result = item.title().toLowerCase().indexOf(query) != -1;
            item.marker.setVisible(result);

            return result;
          });
  } })


      // This function takes in a COLOR, and then creates a new marker icon of that color. The icon will be 21 px wide by 34 high, have an origin of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

     
      //  jquery function that toggles all classes necessary to hide/show sidebar
    self.sidebarToggled = function() {
        $("#map").toggleClass("map-sidebar");
        $("#map").toggleClass("map-no-sidebar");
        $("#sidebar").toggleClass("sidebar-no-visible");
    }

    // executes when hamburger button is clicked, and toggles sidebar
    self.hamburgerClicked = function() {
        $("#hamburger").click(function() {
            self.sidebarToggled();
        })
    }

    self.hamburgerClicked();


    // toggles sidebar if width is less than 500 and sidebar is visible. toggles sidebar on if window is resized above 500px and sidebar is not visible
    $(window).resize(function () {
    if(($(window).width() <= 500) && ($("#map").hasClass("map-sidebar"))) {
        self.sidebarToggled();
    
        } else if(($(window).width() > 500) && ($("#map").hasClass("map-no-sidebar"))) {
            self.sidebarToggled();
        } 
    })


}

// apply bindings to the above ViewModel
ko.applyBindings(new ViewModel());