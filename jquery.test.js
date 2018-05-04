(function($){

	var pluginName = "test";

	var methods = {
		init : function(options){
			var scope = this;
			var defaults = {
				data: {},
				testVar: ""

			};

			var options = $.extend(defaults, options);

			//instance variables will end up here
			this.data(pluginName, {
				data: options.data,
				testVar: options.testVar
			});

			console.log(scope);
			console.log(options);

			var container = document.createElement('div');
			$(container).addClass('test-item');
			$(container).css({'color': 'green', 'font-size': '30px'});
			$(container).html($(options.data.items[0].title).text());
			$(container).appendTo( $(scope) );

			$(container).on('touchstart', function(evt) {
				console.log(this);
				$(this).css('color', 'blue');
			});

			this.data(pluginName).testVar = $(container).text();

			//pass in scope "this" so function can get the data object
			methods._internal.call(this);

		},
		reset: function(){
			console.log("RESET");
			this.find('.test-item').css('color', 'red');
			
		},
		destroy: function() {
			console.log("DESTROY!");
			this.find('.test-item').off();
		},
		_internal: function() {
			console.log("_internal");
			console.log(this.data(pluginName).testVar);
		}
	}

	$.fn.extend({

		test: function(options){

			if (options === undefined || typeof options === 'object') {
				//creates a new plugin instance
				return methods.init.apply( this, arguments );
			} else if (methods[options] && options[0] !== '_') {
				//call a public plugin method
				return methods[options].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else {
				//error, there is no public method by that name
				$.error( 'Method ' +  options + ' does not exist in jquery.test' );
			}
			
		}
	});

})(jQuery);
