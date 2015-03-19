$(document).ready( function() {
	var prevPos = 0;

	$(window).on("scroll", function(){
		var screen = $(window).height(),
			scrollPos = $(this).scrollTop();

		if (prevPos < 100 && scrollPos >= 100) {
            $(".bg-chevron").velocity("scroll", { duration: 300, easing: "ease-in-out" });
        }

        prevPos = scrollPos;
	})
});
