$(function() {

  var fixedNavHeight = 160;

	var linkify = function() {
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

				if (typeof header.id !== "undefined" && header.id !== "" && header.className.indexOf("no-link") !== 0) {
					header.appendChild(anchorForId(header.id), header);
				}
			}
		};

		var body = document.getElementById('docs-body');
		for (var level = 1; level <= 6; level++) {
			linkifyAnchors(level, body);
		}
	}();

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

			window.location.hash = this.hash;
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').scrollTop(target.offset().top - fixedNavHeight);
				return false;
			}
		}
	});

	if ($(location.href.split("#")[1])) {
		var target = $('#' + location.href.split("#")[1]);
		if (target.length) {
			$('html,body').scrollTop(target.offset().top - fixedNavHeight);
		}
	};

	$('#cors-test').delegate(':button', "click", function(e) {
		e.preventDefault();
		var orgUrl = $('#input-orgUrl').val();
		if (orgUrl.indexOf('http://') !== 0 && orgUrl.indexOf('https://') !== 0) {
			orgUrl = 'https://' + orgUrl;
		}

		$.ajax({
			url: orgUrl + '/api/v1/users/me',
			type: 'GET',
			accept: 'application/json',
			xhrFields: { withCredentials: true }
		}).success(function(data) {
			var output = _.template($('#template-profile').html(), { user: data });
			$('#cors-test-result').html(output);
		}).error(function(xhr, textStatus, error) {
			var title, message;
			switch (xhr.status) {
				case 0 :
				title = 'Cross-Origin Request Blocked';
				message = 'You must explictly add this site (' + window.location.origin + ') to the list of allowed websites in your Okta Admin Dashboard';
				break;
				case 403 :
				title = xhr.responseJSON.errorSummary;
				message = 'Please login to your Okta organization before running the test';
				break;
				default :
				title = xhr.responseJSON ? xhr.responseJSON.errorSummary : xhr.statusText;
				break;
			}
			$('#cors-test-result').html($('<div>', {
				'class': 'alert alert-danger',
				'html': '<strong>' + title + ':</strong> ' + message || ''
			}));
		});
	});
})();
