//= require swiftype/jquery.ba-hashchange.min
//= require swiftype/jquery.swiftype.search
//= require swiftype/jquery.swiftype.autocomplete


$(function () {

	if (window.location.href.indexOf("?stq=") > -1) {
		var q = getUrlVars()["stq"];
		$("#st-search-input").val(q);
		$("#st-search-input").attr('placeholder', q);
		window.location.href = window.location.href.replace("?stq=", '#stq=');
		return false;
	}

	// $('#st-search-input').swiftypeSearch({
 	// 	resultContainingElement: '#st-results-container',
 	// 	renderFunction: oktaDefaultRenderFunction,
 	// 	engineKey: 'VoUosPoJvtAtkm68Cd-_',
 	// 	perPage: 20
	// });

	// $('#st-search-input').swiftype({
	//   engineKey: 'VoUosPoJvtAtkm68Cd-_',
	//   renderFunction: oktaCustomRenderFunction,
	//   resultLimit: 10,
	// });

	// var oktaDefaultRenderFunction = function(document_type, item) {
	// 	console.log(item);

	//   //return '<div class="st-result"><h3 class="title"><a href="' + item['url'] + '" class="st-search-result-link">' + item['title'] + '</a></h3></div>';
	// 	return '<a href="' + item['url'] + '"> <span class="st-ui-type-heading">' + item['title'] + '</span> <span class="st-ui-type-detail">  <span class="st-ui-type-detail-bold">' + item['url'] + '</span>'+ item['body']  +' </span>	</a>';
	// };

	// var oktaCustomRenderFunction = function(document_type, item) {
	// 	console.log(item);
	// 	return '<a href="' + item['url'] + '"> <span class="st-ui-type-heading">' + item['title'] + '</span> <span class="st-ui-type-detail">  <span class="st-ui-type-detail-bold">' + item['url'] + '</span>'+ item['body']  +' </span>	</a>';
	// 	// var out = '<div class="st-result"><h3 class="title"><a href="' + item['url'] + '" class="st-search-result-link">' + item['title'] + '</a></h3></div>';
	// 	return out;
	// };


	function getUrlVars()
	{
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
});
