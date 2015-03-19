$(document).ready( function() {
	var screen = $(window).height();

	$(window).on("scroll", function(){
		var screen = $(window).height(),
			scrollPos = $(this).scrollTop();

		if(scroll_pos >= 100) {
        	$('.lettering').addClass("is-animated");
            $('html, body').animate({
		        scrollTop: screen
		    }, 300);
        } else {
        	$('.lettering').removeClass("is-animated");
            // $('.bg-chevron').animate({scrollTop: screen}, 300);
        }
	})
});
