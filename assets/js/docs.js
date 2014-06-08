$(function() {


  // ------------------------ LINKIFY ANCHORS

  var anchorForId = function (id) {
    var anchor = document.createElement("a");
    anchor.className = "header-link";
    anchor.href      = "#" + id;
    anchor.innerHTML = "<i class=\"fa fa-link\"></i>";
    return anchor;
  };

  var linkifyAnchors = function (level, container) {
    var headers = container.getElementsByTagName("h" + level);
    for (var h = 0; h < headers.length; h++) {
      var header = headers[h];

      if (typeof header.id !== "undefined" && header.id !== "") {
        header.appendChild(anchorForId(header.id), header);
      }
    }
  };

  var body = document.getElementById('docs-body');
  for (var level = 1; level <= 6; level++) {
    linkifyAnchors(level, body);
  }

  // ------------------------  DYNAMIC ANCHOR ADJUST FOR FIXED TOPNAV

  var fixedNavHeight = 105;

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
&& location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - fixedNavHeight //offsets for fixed header
        }, 1000);
        return false;
      }
    }
  });

  // Executed on page load with URL containing an anchor tag.
  if ($(location.href.split("#")[1])) {
    var target = $('#' + location.href.split("#")[1]);
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - fixedNavHeight //offset height of header here too.
      }, 1000);
      return false;
    }
  };

  // ------------------------ SIDENAV
  $('.docs-sidebar-block > h2').on('click', function() {
    $this  = $(this);
    $ul    = $this.next('ul');
    $block = $this.parent('.docs-sidebar-block');

    $ul.animate({
        opacity: 'toggle',
        height: 'toggle'
      }, 100, function() {
      if ($ul.css('display')=='none') {
        $block.addClass('closed');
      }
      else {
        $block.removeClass('closed');
      }
    });
  });

  // ------------------------  Add TOC Header

  $('<h2>', {
    'id': 'toc-title',
    'html': 'Table of Contents'
  }).prependTo('.toc');


  // ------------------------  TOC scrolling

  $('.docs-page').localScroll({
    duration: 300,
    offset: -120,
    onAfter: function() {
    }
  });


  // ------------------------ SCROLL TO TOP BUTTON

  var scrolled = false,
      $docsBody = $('#docs-body'),
      $scroller = $('#scroll-top-button');


  // -- poll to display button
  $(window).scroll(function() {
    scrolled = true;
  });

  setInterval(function() {
    if (scrolled) {
      scrolled = false;
      if ($(window).scrollTop() > 100) {
        $scroller.addClass('on');
        positionScroller();
      }
      else {
        $scroller.removeClass('on');
      }
    }
  }, 250);


  // -- debounce window resize to reposition button
  $(window).resize(function() {
    clearTimeout(this.id);
    this.id = setTimeout(positionScroller, 50);
  });

  var positionScroller = function() {
    var pos = $docsBody.width() + $docsBody.offset().left + 100;
    $scroller.css('left', pos);
  }

});
