$(document).ready(function() {
    $('#guidesindex-version-dropdown').on('change', function() {
      const guidePages = ["/guides/", "/get-started/"];
      var guideUrl = window.location.href;

      for(const gp of guidePages) {
        const idx = window.location.href.indexOf(gp);
        if(idx > -1) {
          guideUrl = window.location.href.substring(idx);
          break;
        }
      };

      if (this.value == 'latest') {
        window.location.href = guideUrl;
      } else {
        window.location.href = '/version/' + this.value + guideUrl;
      }
    });
  });