$(function(){
    $('#defaultCountdown').countdown({
        date: "October 17, 2014 19:00:00"
    });

    document.l10n.addEventListener('ready', function(a,b){
      if(document.l10n.supportedLocales.length){
        $('[data-lang]').removeClass('lang-active')
        .on('click', function(){
          document.l10n.requestLocales($(this).data('lang'));
        })
        .filter('[data-lang='+document.l10n.supportedLocales[0]+']').addClass('lang-active');

      }
    });


    // map
    markerImage = "../images/marker.png";

    var markerImage1 = new google.maps.MarkerImage(markerImage, null, null, new google.maps.Point(15,40), new google.maps.Size(25,40));

    var  initialize = function() {
        var mapOptions = {
            center: new google.maps.LatLng(53.8907667,27.5372905),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            scrollwheel: false
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(53.8907667,27.5372905),
            map: map,
            icon: markerImage1
        });
    }

    initialize();

    var expandLink = $('.expand-link');
    var move = false;
    var heightSection = 0;

    expandLink.click(function(e){
        e.preventDefault();
        if(!move){
            move = true;
            var nextSection = $(this).parent().parent().next();

            if(nextSection.hasClass('open')){
                nextSection.animate({height : 0},600,function(){
                   $(this).removeClass('open');
                   move = false;
                });
            } else{
                heightSection = nextSection.find('.no-inside').outerHeight();
                nextSection.animate({height : heightSection},600,function(){
                    $(this).addClass('open');
                    move = false;
                });
            }
        }
    });

    $(window).resize(function(){
        var section = $('.section.open');
        if(section.length){
            $.each(section,function(){
                $(this).height($(this).find('.no-inside').outerHeight());
            });
        }
    });
});
