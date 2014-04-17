// -- global js

(function() {

  // toggle major sidebar links on click
  $('.left-sidebar > h2').bind('click', function() {
    $(this).next('ul').slideToggle(100);
  });

  // generate sidebar anchor link
  var $toc              = $('<ul class="toc">');
  var $headerSelector   = $('#docs-article h1:first');
  var $sidebarSelector  = $('.left-sidebar [data-name="'+ $headerSelector.text() +'"');

  if ($headerSelector.length > 0) {
    $('#docs-article h2').each(function(){
      $toc.append($('<li>')
         .append($('<a>')
         .attr('href','#'+ $(this).attr('id'))
         .text($(this).text())));
    });
 
    $sidebarSelector.after($toc);
  }
})();
