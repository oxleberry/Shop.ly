
$(function(){
    console.log('Sanity Check');

    $.ajax({
      method: 'GET',
      url: '/api/designs',
      success: handleSuccess,
      error: handleError
    });

    $('#testing').on('submit', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/designs',
        data: $(this).serialize(),
        success: newDesignSuccess,
        error: handleError
      });
    });





}); // end of document.ready


function handleSuccess() {
  console.log("loaded success");
}

function newDesignSuccess() {
  console.log("created success");
}

function handleError(e) {
  console.log('uh oh');
}
