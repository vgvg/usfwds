$(function(){
  $('#menu-btn, .overlay, .sliding-panel-close').on('click touchstart',function (e) {
    $('.sidenav, .overlay').toggleClass('is-visible');
    e.preventDefault();
  });
  
  // TODO restructure function so the use of "this" makes sense.
  var generateCodeSnippets = function(content, previewBox) {

    var self = this;

    this.parseCode = function(previewBox) {
      var sampleCode = $('<div>');
      $(sampleCode).html($(previewBox).html())
      $(sampleCode).find('.is-peripheral').remove();
      return sampleCode;
    }

    this.render = function(previewBox, sampleCode) {

      var sampleCodeBox = $(''+
        '<div class="usa-accordion-bordered usa-code-sample">' +
          '<ul class="usa-unstyled-list">' +
            '<li>' +
              '<button class="usa-button-unstyled" aria-expanded="false" aria-controls="collapsible-0">Code</button>' +
              '<div id="collapsible-0" aria-hidden="true" class="usa-accordion-content">' +
                '<pre><code class="language-markup"></code></pre>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</div>');
      $(sampleCodeBox).find('code').text($(sampleCode).html());
      $(previewBox).after(sampleCodeBox);
    }

    $(content).find(previewBox).each(function(index, previewBox) {

      var sampleCode = self.parseCode(previewBox);
      self.render(previewBox, sampleCode);

    });

  }

  generateCodeSnippets('.main-content', '.preview');

});

$('.secondary-sidenav-link').click(function(e) {
  e.preventDefault();
  var hashLocation = $(this).attr('href').split('#')[1]; // long url splitting
  $('.main-content').animate({
    scrollTop: $('#' + hashLocation).position().top +35
  }, 200);
  window.location.hash = hashLocation;
});
