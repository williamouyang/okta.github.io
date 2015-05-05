(function($)  {
	
	$.fn.extend({
		
		fbTabber: function(_options) {
			
			var options = _options;
		
			return this.each(function() {
				
				var index = 0;
				var $tabs = $("a", this);
				var $currentTab = $tabs.eq(0);
				var $previousTab = $tabs.eq(0);
				
				$tabs.each(function() {
					
					$(this).data("index", ++index);
					
				});
			
				$tabs.click(function(e) {
					
					e.preventDefault();
			
					$previousTab = $currentTab;
					$currentTab = $(this);
			
					if ($previousTab !== $currentTab) {
						
						$tabs.removeClass("active");
						$(this).addClass("active");
						
						if (typeof options.onClick === "function") {
							
							options.onClick($currentTab, $previousTab);
							
						}
						
					}
			
				});
				
			});
		
		}
		
	});
	
})(jQuery);