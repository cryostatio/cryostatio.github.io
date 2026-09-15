document.querySelectorAll('.documentation-version-dropdown').forEach(function(dropdown) {
  dropdown.addEventListener('change', function() {
    window.location.href = this.value;
  });
});
