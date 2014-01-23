$(document).ready(function() {

  // Generate sidebar for docs
  $(function() {
   var toc = $("#sidebar").tocify({ 
    highlightDefault: false,
    scrollHistory: false,
    highlightOnScroll: true,
    showAndHideOnScroll: true,
    showAndHide: true,
    extendPage: false,
    context: "body",
    history: false,
    scrollTo: 90,
    showEffect: "show",
    showEffectSpeed: "fast",
    smoothScrollSpeed: "fast",
    hideEffect: "slideUp",
    selectors: "h1,h2,h3" });
 });

  // Stick sidebar for features
  var s = $("#sticker");
  var pos = s.position();                    
  $(window).scroll(function() {
    var windowpos = $(window).scrollTop();
          // s.html("Distance from top:" + pos.top + "<br />Scroll position: " + windowpos);
          if (windowpos >= pos.top + 200) {
            s.addClass("stick");
             //$('.features-page .fixed').css({ position: 'fixed', top: windowpos-pos.top  + 'px' });
           } else {
            s.removeClass("stick");
             //$('.features-page .fixed').css({ position: 'static'});
           }
         });
});
// Append arrow to docs sidebar when page finished loading since sidebar is using jquery
$(window).load(function() {
  $("#sidebar li").each(function()
  {
    if ($(this).next().is('ul')) {
      $(this).find('a').append("<span class='sub_header_arrow'></span>");
    }   
  })
});

