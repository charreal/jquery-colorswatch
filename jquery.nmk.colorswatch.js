(function($) {

$.widget('nmk.colorswatch', {
	
	options: {
		colors: [
			'#000000',
			'#993300',
			'#333300',
			'#000080',
			'#333399',
			'#333333',
			'#800000',
			'#FF6600',
			'#808000',
			'#008000',
			'#008080',
			'#0000FF',
			'#666699',
			'#808080',
			'#FF0000',
			'#FF9900',
			'#99CC00',
			'#339966',
			'#33CCCC',
			'#3366FF',
			'#800080',
			'#999999',
			'#FF00FF',
			'#FFCC00',
			'#FFFF00',
			'#00FF00',
			'#00FFFF',
			'#00CCFF',
			'#993366',
			'#C0C0C0',
			'#FF99CC',
			'#FFCC99',
			'#FFFF99',
			'#CCFFFF',
			'#99CCFF',
			'#FFFFFF'
		],
		rowSize: 6,
		value: null
	},
	
	isInput: false,
	
	_create: function() {
		this.swatch = (this.element.is(':input') ? this._initFromInput() : this.element)
			.addClass('nmk-colorswatch');
			
		var self = this;
		this.swatch
			.addClass("ui-widget-content")
			.mouseover(function(event) {
				$(event.target).closest(".nmk-colorswatch-color").addClass("nmk-colorswatch-hover");
			})
			.mouseout(function(event) {
				$(event.target).closest(".nmk-colorswatch-color").removeClass("nmk-colorswatch-hover");
			})
			.click(function(event) {
				var target = $(event.target).closest(".nmk-colorswatch-color");
				if (target.length) {
					self.swatch.children().removeClass("nmk-colorswatch-selected");
					target.addClass("nmk-colorswatch-selected");
					self.value(target.data("colorswatch"));
					if (self.isInput) {
						self.hide();
					}
				}
			});
		
		this._render();
	},
	
	_initFromInput: function() {
		this.isInput = true;
		
		if (this.options.value === null) {
			this.options.value = this.element.val();
		}
		
		var self = this;
		this.element
			.bind('click.colorswatch', function() {
				self.show();
			})
			.bind('change.colorswatch', function() {
				self.value(this.value);
			});
		
		return $('<div></div>')
			.hide()
			.addClass("nmk-colorswatch-popup")
			.insertAfter(this.element);
	},
	
	_render: function() {
		var row,
			rowSize = this.options.rowSize,
			swatch = this.swatch.empty(),
			self = this;

		$.each(this.options.colors, function(i, color) {
			$('<div></div>')
				// TODO highlight selected
				.addClass('nmk-colorswatch-color')
				.css('backgroundColor', color)
				.data('colorswatch', color)
				.appendTo(swatch);
				
		});
		$("<div></div>")
			.addClass("ui-helper-clearfix")
			.appendTo(swatch);
	},
	
	show: function() {
		this.swatch.show();
		
		var self = this;
		function detectBlur(event) {
			var swatch = $(event.target).closest('.nmk-colorswatch'),
				keepOpen = (swatch.length && swatch[0] == self.swatch[0]) ||
					(event.target == self.element[0]);
			
			if (!keepOpen) {
				$(document).unbind('mousedown keydown', detectBlur);
				self.hide();
			}
		}
		$(document).bind('mousedown keydown', detectBlur);
	},
	
	hide: function() {
		this.swatch.hide();
	},
	
	value: function(value) {
		this.options.value = value;
		
		if (this.isInput) {
			this.element.val(value);
		}
		this._trigger("change", null, { value: value });
	},
	
	destroy: function() {
		if (this.isInput) {
			this.element.unbind('.colorswatch');
			this.swatch.remove();
		} else {
			this.swatch.empty();
		}

		$.Widget.prototype.destroy.apply(this, arguments);
	}
});

$.extend($.nmk.colorswatch, {
	version: '1.0pre'
});

})(jQuery);

