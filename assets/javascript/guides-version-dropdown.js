$(document).ready(function() {
    $('#guidesindex-version-dropdown').on('change', function() {
      var url;
      if (this.value == 'latest') {
        url = '/guides/';
      } else {
        url = '/version/' + this.value + '/guides/';
      }
      window.location.href = url;
    });
  });
