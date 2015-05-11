(function($) {
	var page = {
		swipe: function(element, callback, effect) {
			var next;
			this.current = $(element);
			this.index = new RegExp(this.tag + "(.)").exec(this.current.attr('id'))[1];
			callback(this);
			next = $('#' + this.tag + this.index);
			this.current.hide();
			next.show();
			next.addClass('animated ' + effect);
		},
		swipeRight: function(ev) {
			this.swipe(ev.currentTarget, function(page) {
				if (++page.index > page.length)
					page.index = 1;
			}, "slideInLeft");
		},
		swipeLeft: function(ev) {
			this.swipe(ev.currentTarget, function(page) {
				if (--page.index < 1)
					page.index = page.length;
			}, "slideInRight");
		}
	}

	$.fn.swipeInit = function(page_tag) {
		var tag = 'page_',
			length = this.length;
		if (typeof page_tag != 'undefined')
			tag = page_tag;

		touch.on(this, 'swipeRight', $.proxy(page.swipeRight, page));
		touch.on(this, 'swipeLeft', $.proxy(page.swipeLeft, page));

		for (var index = 0; index < this.length; index++) {
			var currentElement = this[index];
			if (index != 0)
				$(currentElement).hide();
			currentElement.addEventListener('webkitAnimationEnd', function() {
				$(this).removeClass('animated slideInLeft slideInRight');
			});
		}
		page.tag = tag;
		page.length = length;
		page.current = this[0];
	};
})($);

$(document).ready(function() {
	$('li.page').swipeInit();
});