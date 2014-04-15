// -- global js

(function() {
  $('.left-sidebar > h2').bind('click', function() {
    $(this).next('ul').toggleClass('closed');
  });
})();