// -- global js

(function() {
  $('.toc').toc({ listType: 'ul', title: '', showSpeed: 0});
  $('.left-sidebar > h2').bind('click', function() {
    $(this).next('ul').toggleClass('closed');
  });
})();