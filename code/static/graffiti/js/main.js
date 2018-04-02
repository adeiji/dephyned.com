$(function () {
    "use strict";

    var promoCode = "BETA" + (Math.floor(Math.random()*90000) + 10000);
    var promoPhrase = "https://dephyned.com/graffiti?id=" + promoCode
    var referralCode;

    $(document).ready(function () {      
      $("#share").hide();
      $(".promo").append(promoPhrase)
      $('#cp-notification').hide()      
      referralCode = getUrlVars()["id"];
    });

    $(".copy-button").click(function () {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($($(".promo")).text()).select();
      document.execCommand("copy");
      $temp.remove();            
      $('#cp-notification').hide().html('<span class="success"><i class="fa fa-envelope"></i>' + "Promo phrase copied to clipboard" + '</span>').fadeIn("slow");
      $('#mc-notification').hide();
    })        

    function getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
      });
      return vars;
    }

    /* ==========================================================================
   onscroll animation
   ========================================================================== */
		
		if ($(window).width() > 992) {
			$(window).fadeThis({
					'reverse': false
			});
		};
		
    /* ==========================================================================
   features slider
   ========================================================================== */

    $('.features-slider').slick({
        dots: true,
        arrows: false,
				infinite: false
    });


    /* ==========================================================================
   tool tip
   ========================================================================== */

    $('.nav a').tooltip();

    /* ==========================================================================
   Team-slider
   ========================================================================== */


    $('.team-slider').slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
                arrows: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            }
        }]
    });

    /* ==========================================================================
   sub form
   ========================================================================== */

    var $form = $('#mc-form');
    
    $('#mc-subscribe').on('click', function(event) {
        if (event)
            event.preventDefault();
        register($form);
    });
    
    function register($form) {

        var formContent = $form.serializeArray();
        var values = {};
        for (var i=0; i < formContent.length; i ++) {
          if (formContent[i].name == "email") {
            var fieldValue = formContent[i].value.replace('%40', '@');
            values.contactEmailField = fieldValue;
          }
        }
        
        if (referralCode) {
          values.contactMessageTextarea = referralCode;
        }
        

        if (!values.contactMessageTextarea) {
          values.contactMessageTextarea = "NO PROMO CODE";
        }        
        values.personalPromoCode = promoCode;

        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: JSON.stringify(values),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function(err) {
                $('#mc-notification').hide().html('<span class="alert">Could not connect to server. Please try again later.</span>').fadeIn("slow");
            
            },
            success: function(data) {
                
                if (data.status != "200") {
                    var message = data.message;
                    $('#mc-notification').hide().html('<span class="alert"><i class="fa fa-exclamation-triangle"></i>' + message + '</span>').fadeIn("slow");
                
                } else {
                    var message = data.message;
                    $('#mc-notification').hide().html('<span class="success"><i class="fa fa-envelope"></i>' + 'Awesome! Thanks for signing up!  An introductory email was just sent to you!' + '</span>').fadeIn("slow");
                    $("#share").fadeIn("slow");                
                }
            }
        });
    }

    /* ==========================================================================
   ScrollTop Button
   ========================================================================== */


    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });


    $('.scroll-top a').click(function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    /* ==========================================================================
   Smooth Scroll
   ========================================================================== */

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
  

});