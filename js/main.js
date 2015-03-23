$(document).ready( function() {
	initAutoScroll();
	updateCountdown();
	detectDevice();
	drawMap();

	function initAutoScroll () {
		$(window)
			.scrollTop(0)
			.on('scroll', _.debounce(function(){
				var screen = $(window).height(),
					scrollPos = $(this).scrollTop(),
					diff = screen - scrollPos;

				if (diff > 0 && diff < screen*0.75) {
		            $('.js-chevron').velocity('scroll', { duration: 400, easing: 'ease-out' });
		        }
			}, 500));
	}

	function updateCountdown () {
		var WEDDING_DATE = new Date(2015, 4, 16),
			DAY = 1000*60*60*24,
			todayDate = new Date(),
			countdown = Math.floor((WEDDING_DATE - todayDate)/DAY) + 1;

		if (countdown > 0) {
			$('.js-day').text(countdown);
			$('.js-day-label').text(pluralizeDayLabel(countdown));
		} else {
			$('.js-countdown').hide();
		}
	}

	function pluralizeDayLabel (countdown) {
		switch (getPluralForm(countdown)) {
			case 1: return 'день';
			case 2: return 'дні';
			case 3: return 'днів';
		}
	}

	// Form 1 - ends in 1, excluding 11: 1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141, 151, 161, 171, 181, 191, 201, 221, 231, 241, 251, 261, 271, 281, 291, …
	// Form 2 - ends in 2-4, excluding 12-14: 2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73, 74, 82, 83, 84, 92, 93, 94, 102, 103, 104, 122, 123, 124, 132, 133, 134, 142, 143, 144, 152, 153, 154, 162, 163, 164, 172, 173, 174, 182, 183, …
	// Form 3 - everything else: 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 35, 36, 37, 38, 39, 40, 45, 46, 47, 48, 49, 50, 55, 56, 57, 58, 59, 60, 65, 66, 67, 68, 69, 70, 75, 76, 77, …

	function getPluralForm (value) {
		if (endsIn(value, 1) && notIn(value, 11)) {
			return 1;
		} else if (endsIn(value, [2, 3, 4]) && notIn(value, [12, 13, 14])) {
			return 2;
		} else {
			return 3;
		}
	}

	function endsIn (value, range) {
		return isIn(getLastDigit(value), range);
	}

	function notIn (value, range) {
		return !isIn(value, range);
	}

	function isIn (value, range) {
		range = _.isArray(range) ? range : [range];
		return _.include(range, value);
	}

	function getLastDigit (number) {
		var numberStr = number.toString();
		return +numberStr[numberStr.length - 1];
	}

	function detectDevice () {
		if (isMobile()) {
			$('html').addClass('mobile');
		}
	}

	function isMobile () {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	// Form elements

	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call( document.querySelectorAll( 'input.input-field' ) ).forEach( function( inputEl ) {
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input-filled' );
		}

		// events:
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );

	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input-filled' );
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input-filled' );
		}
	}

	function drawMap () {
        var mapOptions = {
            center: new google.maps.LatLng(50.4382995,30.1470341),
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
            },
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            scaleControl: true,
            scrollwheel: false,
            panControl: true,
            streetViewControl: true,
            draggable : !isMobile(),
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
        };

        var mapElement = $('.js-map')[0];
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            ['Бабусин сад', 'undefined', 'undefined', 'undefined', 'undefined', 50.4382995, 30.1470341, 'https://mapbuildr.com/assets/img/markers/solid-pin-purple.png']
        ];
        for (i = 0; i < locations.length; i++) {
            if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
            if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
            if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
           	if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
           	if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
            marker = new google.maps.Marker({
                icon: markericon,
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web
            });
		}
	}
});
