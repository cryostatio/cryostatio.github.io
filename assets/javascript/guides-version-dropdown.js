$(document).ready(function() {
    $('#guidesindex-version-dropdown').on('change', function() {
      var guideUrl = window.location.href.substring(window.location.href.indexOf("/guides/"));
  
      if (this.value == 'latest') {
        window.location.href = '/guides/';
      } else {
        window.location.href = '/version/' + this.value + guideUrl;
      }
    });
  });