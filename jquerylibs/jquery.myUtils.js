(function($) {
	$.fn.center = function() {
		return this.each(function() {
			$(this).css({
				'top': ($(window).height() - $(this).height())/2 + $(window).scrollTop()+"px",
				'left': ($(window).width() - $(this).width())/2 + $(window).scrollLeft()+"px"
			});
		});
	}
	
	$.fadePage = function(param) {
		var defaults = {
			action: 'fadein',
			opacity: 0.5,
			color: '#000',
			zindex: 99999,
			speed: 100,
			effect: 'linear',
			onclick: function() {},
			complete: function() {}
		};
		
		var options = $.extend(defaults, param);
		if(options.action == 'fadein') {
			var $fader = $('<div>')
					.attr('id', 'MyPageFaderLayer')
					.css({
						'opacity': options.opacity,
						'width': $(document).width(),
						'height': $(document).height(),
						'background-color': options.color,
						'position': 'absolute',
						'left': '0px',
						'top': '0px',
						'z-index': options.zindex,
						'cursor': 'pointer',
						'display': 'none'
					})
					.click(options.onclick)
					.appendTo($('body'))
					.fadeIn(options.speed, options.effect, options.complete);
		} else if(options.action == 'fadeout') {
			$('div#MyPageFaderLayer')
				.fadeOut(options.speed, options.effect, function(){
					$(this)
						.unbind('click')
						.remove();
				})
		}
	}
})(jQuery);

