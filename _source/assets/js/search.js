// $(document).ready(function() {
// 	$('.search-field').simpleJekyllSearch({
// 		jsonFile : '/search.json', jsonFormat : 'title,category,url,date', template : '<a href="{url}" title="{title}" >{title}</a><br />', searchResults : '.results'
// 	});
// });
// JekyllSearch.init({
//     searchInput: document.getElementById("search"),
//     searchResults: document.getElementById("search-results"),
//     jsonFile: "search.json",
//     template: "<li><a href='{url}' title='{desc}'>{title}</a></li>",
//     noResults: "no results found",
//     fuzzy: true
// });
// $(".search").jekyllSearch(  );

$(document).ready(function() {
      $('.search-field').simpleJekyllSearch({
          jsonFile : '/search.json',
          searchResults : '.results',
          limit: 20,
          jsonFormat : 'title,url,content',
          template : '<li><article><a href="{url}?search=">{title}</a></article></li>',
          noResults: '<p>Nothing found.</p>'
        });
  });
