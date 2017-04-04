var banner = (function($){
	var config = {
		Interval: 3000,
		time: null

	},
	$imgElement,$focusSpan,
	nextChange,clickFcous;

	nextChange = function(){
		var index = null;
		$imgElement.each(function(){
			var This = $(this);
			if(This.hasClass('img-active')){
				index = This.index();
			}
		});
		var $nextItem = $imgElement.eq(index).next().get(0) ? $imgElement.eq(index).next() : $imgElement.eq(0);
		$imgElement.eq(index).fadeOut(1500).removeClass('img-active');
		$nextItem.fadeIn(1500).addClass('img-active');
		$focusSpan.each(function(){
			var This = $(this);
			This.removeClass('focus-active');
		});
		$focusSpan.eq($nextItem.index()).addClass('focus-active');

	}

	clickFcous = function(This){
		var index = This.index();
		$focusSpan.each(function(){
			var This = $(this);
			This.removeClass('focus-active');
		});
		$focusSpan.eq(index).addClass('focus-active');
		$imgElement.each(function(){
			var This = $(this);
			This.fadeOut(1500).removeClass('img-active');
		});
		$imgElement.eq(index).fadeIn(1500).addClass('img-active');
	}

	initModule = function($container){
		$imgElement = $container.find('li');
		$focusSpan = $container.find('.focus>span');
		config.time = setInterval(nextChange,config.Interval);
		$container.hover(function(){
			clearInterval(config.time);
		},function(){
			config.time = setInterval(nextChange,config.Interval);
		});
		$focusSpan.click(function(){
			var This = $(this);
			clickFcous(This);
		})
	};

	return {
		initModule: initModule
	};
}(jQuery));