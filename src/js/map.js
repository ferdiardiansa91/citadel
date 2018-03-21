/**
* Reference to Firebase database.
* @const
*/
var firebase = new Firebase('https://drazler-map.firebaseio.com/');

/**
* Data object to be written to Firebase.
*/
var data = {
  sender: null,
  timestamp: null,
  lat: null,
  lng: null
};

var dataLocations = [
	{
	  title : 'Leamouth', 
	  lat   : 51.531462, 
	  lang  : -0.094976, 
	  total : 35, 
	  src   : 'https://cdn.londonandpartners.com/visit/general-london/areas/westminster-st-james/100347-433x298-bigben433.jpg'
	},
	{
	  title :'O2 Academy', 
	  lat   : 51.535012, 
	  lang  : -0.106005, 
	  total : 10, 
	  src   :'https://d1wgio6yfhqlw1.cloudfront.net/sysimages/product/resized6/Sundowner_2675_13740.jpg'
	}
]

function makeInfoBox(controlDiv, map) {
	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '2px';
	controlUI.style.marginBottom = '22px';
	controlUI.style.marginTop = '10px';
	controlUI.style.textAlign = 'center';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '100%';
	controlText.style.padding = '6px';
	controlText.textContent = 'The map shows all clicks made in the last 10 minutes.';
	controlUI.appendChild(controlText);
}

/**
* Starting point for running the program. Authenticates the user.
* @param {function()} onAuthSuccess - Called when authentication succeeds.
*/
function initAuthentication(onAuthSuccess) {
	firebase.authAnonymously(function(error, authData) {
	  if (error) {
	    console.log('Login Failed!', error);
	  } else {
	    data.sender = authData.uid;
	    onAuthSuccess();
	  }
	}, {remember: 'sessionOnly'});  // Users will get a new id for every session.
}

/**
* Creates a map object with a click listener and a heatmap.
*/
function initMap() {
	var map   = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    disableDefaultUI: true,
	    styles:
	    [
	      {
	          "featureType": "all",
	          "elementType": "labels.text.fill",
	          "stylers": [
	              {
	                  "saturation": 36
	              },
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 40
	              }
	          ]
	      },
	      {
	          "featureType": "all",
	          "elementType": "labels.text.stroke",
	          "stylers": [
	              {
	                  "visibility": "on"
	              },
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 16
	              }
	          ]
	      },
	      {
	          "featureType": "all",
	          "elementType": "labels.icon",
	          "stylers": [
	              {
	                  "visibility": "off"
	              }
	          ]
	      },
	      {
	          "featureType": "administrative",
	          "elementType": "geometry.fill",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 20
	              }
	          ]
	      },
	      {
	          "featureType": "administrative",
	          "elementType": "geometry.stroke",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 17
	              },
	              {
	                  "weight": 1.2
	              }
	          ]
	      },
	      {
	          "featureType": "landscape",
	          "elementType": "geometry",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 20
	              }
	          ]
	      },
	      {
	          "featureType": "poi",
	          "elementType": "geometry",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 21
	              }
	          ]
	      },
	      {
	          "featureType": "road.highway",
	          "elementType": "geometry.fill",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 17
	              }
	          ]
	      },
	      {
	          "featureType": "road.highway",
	          "elementType": "geometry.stroke",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 29
	              },
	              {
	                  "weight": 0.2
	              }
	          ]
	      },
	      {
	          "featureType": "road.arterial",
	          "elementType": "geometry",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 18
	              }
	          ]
	      },
	      {
	          "featureType": "road.local",
	          "elementType": "geometry",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 16
	              }
	          ]
	      },
	      {
	          "featureType": "transit",
	          "elementType": "geometry",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 19
	              }
	          ]
	      },
	      {
	          "featureType": "water",
	          "elementType": "geometry",
	          "stylers": [
	              {
	                  "color": "#000000"
	              },
	              {
	                  "lightness": 17
	              }
	          ]
	      }
	  ],
	  disableDoubleClickZoom: true,
		  streetViewControl: false,
	});

	// Create the DIV to hold the control and call the makeInfoBox() constructor
	// passing in this DIV.
	var infoBoxDiv = document.createElement('div');

	makeInfoBox(infoBoxDiv, map);

	map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

	// Listen for clicks and add the location of the click to firebase.
	map.addListener('click', function(e) {
	  data.lat = e.latLng.lat();
	  data.lng = e.latLng.lng();
	  addToFirebase(data);
	});

	// Create a heatmap.
	var heatmap = new google.maps.visualization.HeatmapLayer({
	  data: [],
	  map: map,
	  radius: 16
});

// init Markers
setMarkers(map, dataLocations);

initAuthentication(initFirebase.bind(undefined, heatmap));
}

function contentString(title, src, total) {
  return (
   '<div id="iw-container">' +
        '<div class="iw-title"><img src="'+src+'" style="width:100%;height:96px;"></div>'+
        '<div class="iw-content" style="text-align:center;">' +
          '<div class="iw-subTitle">'+
          	'<h3 style="font-size: 18px;font-weight: 600;">'+ title +'</h3>'+
          	'<h6 style="font-size: 12px;font-weight: 400;color: #dadade;">Number of Apartments.</h3>'+
          '</div>'+
          '<div class="iw-subTitle d-flex justify-content-center"><i class="icon-building"></i><span style="font-size: 12px;font-weight: 400;margin-left:10px;">'+ total +' Apartment</span></div>' +
        '</div>' +
        '<div class="iw-bottom-gradient"></div>'+
    '</div>'
  );
}

function setMarkers(map, locations) {
	var marker, i, gMarkers = [];
	for (i = 0; i < locations.length; i++) {

	  	var title = locations[i].title,
	      	lat   = locations[i].lat,
	      	lang  = locations[i].lang,
	      	total = locations[i].total,
	      	src   = locations[i].src,
	      	markers = [], normalIcon, activeIcon;

	  	var latlngset = new google.maps.LatLng(lat, lang);

  		normalIcon = { url: 'assets/img/dot-nonactive.png'},
    	activeIcon = { url: 'assets/img/dot-active.png'};
	  	
	  	marker = new google.maps.Marker({
	        map       : map,
	        title     : title,
	        position  : latlngset,
	        icon      : normalIcon,
	  	});

	  	// push marker to array gMarkers
	  	gMarkers.push(marker);
	  	map.setCenter(marker.getPosition());

	  	// Build htmlm content
	  	var content     = contentString(title, src, total),
	      	infowindow  = new google.maps.InfoWindow({content:content,maxWidth: 350}),
	      	prevWindow  = false;

	  	// Event google marker -> on click
		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
		    return function() {

		        // auto close, if info window is equal true
		        if(prevWindow)
		          prevWindow.close(); 

		        // set all marker to default icon
		        for (var j = 0; j < gMarkers.length; j++) {
		          	gMarkers[j].setIcon(normalIcon);
		        }
		        // set html content
		        infowindow.setContent(content);

		        // set prevwindow to infowindow object
		        prevWindow = infowindow;

		        infowindow.open(map,marker);

		        // set current marker to active
		        this.setIcon(activeIcon);

		        // *
		        // START INFOWINDOW CUSTOMIZE.
		        // The google.maps.event.addListener() event expects
		        // the creation of the infowindow HTML structure 'domready'
		        // and before the opening of the infowindow, defined styles are applied.
		        // *
		        google.maps.event.addListener(infowindow, 'domready', function() {

		          // Reference to the DIV that wraps the bottom of infowindow
		          var iwOuter = $('.gm-style-iw');

		          /* Since this div is in a position prior to .gm-div style-iw.
		           * We use jQuery and create a iwBackground variable,
		           * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
		          */
		          var iwBackground = iwOuter.prev();

		          // Removes background shadow DIV
		          iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		          // Removes white background DIV
		          iwBackground.children(':nth-child(4)').css({'display' : 'none'});

		          // Moves the infowindow 115px to the right.
		          // iwOuter.parent().parent().css({left: '115px'});

		          // Moves the shadow of the arrow 76px to the left margin.
		          // iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 0px !important;'});

		          // Moves the arrow 76px to the left margin.
		          // iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 0px !important;'});

		          // Changes the desired tail shadow color.
		          iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

		          // Reference to the div that groups the close button elements.
		          var iwCloseBtn = iwOuter.next();

		          // Apply the desired effect to the close button
		          // iwCloseBtn.css({display: 'none'});
		          iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

		          // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		          if($('.iw-content').height() < 140){
		            $('.iw-bottom-gradient').css({display: 'none'});
		          }

		          // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
		          iwCloseBtn.mouseout(function(){
		            $(this).css({opacity: '1'});
		          });
		        });
		      }
		      google.maps.event.addDomListener(window, 'load', initialize);
		})(marker,content,infowindow)); 


		google.maps.event.addListener(infowindow,'closeclick',function(){
		   for (var j = 0; j < gMarkers.length; j++) {
	          	gMarkers[j].setIcon(normalIcon);
	        }
		});
	}
}

/**
* Set up a Firebase with deletion on clicks older than expirySeconds
* @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
* which points are added from Firebase.
*/
function initFirebase(heatmap) {

	// 10 minutes before current time.
	var startTime = new Date().getTime() - (60 * 10 * 1000);

	// Reference to the clicks in Firebase.
	var clicks = firebase.child('clicks');

	// Listener for when a click is added.
	clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
	  function(snapshot) {

	    // Get that click from firebase.
	    var newPosition = snapshot.val();
	    var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
	    var elapsed = new Date().getTime() - newPosition.timestamp;

	    // Add the point to  the heatmap.
	    heatmap.getData().push(point);

	    // Requests entries older than expiry time (10 minutes).
	    var expirySeconds = Math.max(60 * 10 * 1000 - elapsed, 0);
	    // Set client timeout to remove the point after a certain time.
	    window.setTimeout(function() {
	      // Delete the old point from the database.
	      snapshot.ref().remove();
	    }, expirySeconds);
	  }
);

// Remove old data from the heatmap when a point is removed from firebase.
clicks.on('child_removed', function(snapshot, prevChildKey) {
  var heatmapData = heatmap.getData();
  var i = 0;
  while (snapshot.val().lat != heatmapData.getAt(i).lat()
    || snapshot.val().lng != heatmapData.getAt(i).lng()) {
    i++;
  }
  heatmapData.removeAt(i);
});
}

/**
* Updates the last_message/ path with the current timestamp.
* @param {function(Date)} addClick After the last message timestamp has been updated,
*     this function is called with the current timestamp to add the
*     click to the firebase.
*/
function getTimestamp(addClick) {
	// Reference to location for saving the last click time.
	var ref = firebase.child('last_message/' + data.sender);

	ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.

	// Set value to timestamp.
	ref.set(Firebase.ServerValue.TIMESTAMP, function(err) {
	  if (err) {  // Write to last message was unsuccessful.
	    console.log(err);
	  } else {  // Write to last message was successful.
	    ref.once('value', function(snap) {
	      addClick(snap.val());  // Add click with same timestamp.
	    }, function(err) {
	      console.warn(err);
	    });
	  }
	});
}

/**
* Adds a click to firebase.
* @param {Object} data The data to be added to firebase.
*     It contains the lat, lng, sender and timestamp.
*/
function addToFirebase(data) {
	getTimestamp(function(timestamp) {
	  // Add the new timestamp to the record data.
	  data.timestamp = timestamp;
	  var ref = firebase.child('clicks').push(data, function(err) {
	    if (err) {  // Data was not written to firebase.
	      console.warn(err);
	    }
	  });
	});
}
