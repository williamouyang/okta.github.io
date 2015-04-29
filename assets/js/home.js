$(function() {
  var current_date_format = moment().format('ddd MMM DD YYYY, HH:MM:ss');
  $('#last-login-date').text(current_date_format);
});