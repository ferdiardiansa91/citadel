// Nav sticky scroll
$(document).ready(function() {
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

  // slider middle content
  var _elSlick = $('.slider-box').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      arrows : false,
      centerPadding: '0px',
      // dots: false,
      draggable: false,
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
            breakpoint: 800,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
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

   function upBox() {
      $('.slick-list .slick-active:eq(0)').css({
        marginTop: '-50px',
        transition: '.4s all ease'
      })
    }

    function clearUpBox() {
      $('.slick-list .slick-active:eq(0)').css({
        marginTop: '0px',
        transition: '.2s all ease'
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