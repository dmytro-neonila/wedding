$(document).ready( function() {
	$(window).on("scroll", _.debounce(function(){
		var screen = $(window).height(),
			scrollPos = $(this).scrollTop(),
			diff = screen - scrollPos;

		if (diff > 0 && diff < screen*0.75) {
            $(".bg-chevron").velocity("scroll", { duration: 400, easing: "ease-out" });
        }
	}, 500));
});
