webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(6);
__webpack_require__(7);

// Nav sticky scroll
$(document).ready(function() {
  // (function() {

  function stickyNavbar() {
    var element = document.getElementById("nav"),
        offset  = element.offsetTop;

      // window.addEventListener("scroll", function() {
        if (offset < window.pageYOffset) {
          element.classList.add("on-scroll");
        } else {
          element.classList.remove("on-scroll");
        }
      // }, false);
  }
  stickyNavbar();

  window.addEventListener("scroll", function() {
    stickyNavbar();
  }, false);


  // Slide Gallery
  $("#gallery-slide").lightGallery();

  // slider middle content
  var _elSlick = $('.slider-box').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      arrows : false,
      centerPadding: '0px',
      // dots: false,
      autoplay: true,
      // draggable: false,
      responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1008,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 781,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 460,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }

        ]
    });
  
    upBox();

    $('.left-controls').on('click', function() {
      clearUpBox();
      
      _elSlick.slick('slickPrev');

      setTimeout(function() { upBox(); }, 50);
   })

   $('.right-controls').on('click', function() {
      clearUpBox();
      
      _elSlick.slick('slickNext');
      
      setTimeout(function() { upBox(); }, 50);
   })

   _elSlick.on('beforeChange', function(event, slick, currentSlide) {
      clearUpBox();
      
      setTimeout(function() { upBox(); }, 50);
   })

   function upBox() {
      $('.slick-list .slick-current.slick-active').css({
        marginTop: '-50px',
        // transition: '.4s all ease'
      })
    }

    function clearUpBox() {
      $('.slick-list .slick-current.slick-active').css({
        marginTop: '0px',
        // transition: '.2s all ease'
      }) 
    }


    // date picker
     $('.check-in-date').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
      });

      $('.check-out-date').datepicker({
        format: 'mm/dd/yyyy',
        startDate: '-3d'
      });

})
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {	/**
	* Reference to Firebase database.
	* @const
	*/
	// var firebase = new Firebase('https://drazler-map.firebaseio.com/');

	/**
	* Data object to be written to Firebase.
	*/
	var data = {
	  	sender 		: null,
	  	timestamp 	: null,
	  	lat 		: null,
	  	lng 		: null
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
	];

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

		// makeInfoBox(infoBoxDiv, map);

		map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

		// Listen for clicks and add the location of the click to firebase.
		map.addListener('click', function(e) {
		  	data.lat = e.latLng.lat();
		  	data.lng = e.latLng.lng();
		  	// addToFirebase(data);
		});

		// Create a heatmap.
		var heatmap = new google.maps.visualization.HeatmapLayer({
		  	data: [],
		  	map: map,
		  	radius: 16
		});

		// init Markers
		setMarkers(map, dataLocations);
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

  // init Map
  window.initMap = initMap;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
],[2]);