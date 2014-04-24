// -- global js

(function() {

  // toggle major sidebar links on click
  $('#docs-page-sidebar > h2').on('click', function() {
    $(this).next('ul').slideToggle(100);
  });

  // generate sidebar anchor link
  var $toc              = $('<ul class="toc">');
  var $headerSelector   = $('#docs-page-body h1:first-child');
  var $sidebarSelector  = $('#docs-page-body [data-name="'+ $headerSelector.text() +'"');

  if ($headerSelector.length > 0) {
    $('#docs-page-body h2').each(function(){
      $toc.append($('<li>')
         .append($('<a>')
         .attr('href','#'+ $(this).attr('id'))
         .text($(this).text())));
    });
    $headerSelector.after($toc);
  }
})();
