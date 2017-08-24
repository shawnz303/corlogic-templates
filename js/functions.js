;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {

		$('.btn-close').on('click', function(event) {
			event.preventDefault();

			$('.message').toggleClass('hide');
		});

		$(".btn-show").click(function () {
			if ($(".password-show").attr("type") == "password") {
				$(".password-show").attr("type", "text");
			} else {
				$(".password-show").attr("type", "password");
			}
		});

		$('.btn-dropdown').on('click', function(event) {
			event.preventDefault();

			$(this).toggleClass('active');
			$('.nav').toggleClass('active');
		});

	});

})(jQuery, window, document);
