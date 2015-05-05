// -- global js here
 // listen for scrollspy events on the navigation element itself
  // $('#myScrollspy').on('activate.bs.scrollspy', function() {
  //
  // });
	// $('#gen-toc-container').prepend($('#myScrollspy .nav-title').html());
	$('body').scrollspy({ 'target': '#myScrollspy', 'offset': 190 });

  // listen for scrollspy events on the navigation element itself
  $('#myScrollspy').on('activate.bs.scrollspy', function() {
    var selected = $('#myScrollspy .nav').children('li.active');
    if (selected.children('ul').length > 0 )
    {
    	if (selected.children('ul').children('li').hasClass('active'))
    	{
    		selected.removeClass('active');
    		selected.children('ul').show();
    	}
    	else
    		$('#myScrollspy .nav').children('li:not(.active)').children('ul').hide();

    }
    if (!$('.closed').children('li').hasClass('active') && !$('#gen-toc-container .sidebar-nav li').hasClass('clicked'))
    {
    	$('.closed').hide();
    }
      // $('.clicked').children('ul').hide().removeClass('clicked');
});
function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

  // $('#gen-toc-container .sidebar-nav li a').on( "click", function() {
  // 	var sub_menu = $(this);
  // 	$('#gen-toc-container .sidebar-nav li').removeClass('clicked');
  // 	// sub_menu.next(".closed").show();
  // 	sub_menu.parent('li').addClass('clicked');
  // 	if (sub_menu.next('.closed').length > 0)
  // 	{
  // 		sub_menu.next('.closed').css('display', 'block');
  // 		console.log("is closed here");
  // 	}
  // });

