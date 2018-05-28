
const designList = [
    {
        custom_text: 'Zombies are coming',
        design_title: 'Pancakes',
        designer_name: 'Mochi',
        image: 'precision.jpg'
    }
];


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

// populates seed data
function handleSuccess(json) {
    console.log("loaded success");
    var design = json;
    json.forEach((el, idx) => {
        var showDesign = `
        <div class="card card-size">
          <img class="card-img-top" src="images/${el.image}" alt="tee-design">
          <div class="card-body">
            <h5 class="card-title">${el.design_title}</h5>
            <p class="card-text">${el.custom_text}</p>
            <p class="card-text">${el.designer_name}</p>
            <button class="btn btn-primary">Buy</button>
            <button class="btn btn-primary">Update</button>
            <button class="btn btn-primary">x</button>
          </div>
        </div>
        `;
        $('#tee-design').append(showDesign);
    });
}

function newDesignSuccess(design) {
  // $('#newBookForm input').val('');
  console.log("created success");
  renderNewDesign(design);
}

function getDesignHtml(design) {

}

function handleError(e) {
  console.log('uh oh');
}

function renderNewDesign(design) {
    console.log(design);
    console.log(designList[0]);
    var showDesign = `
    <div class="card card-size">
      <img class="card-img-top" src="images/${designList[0].image}" alt="tee-design">
      <div class="card-body">
        <h5 class="card-title">${designList[0].design_title}</h5>
        <p class="card-text">${designList[0].custom_text}</p>
        <p class="card-text">${designList[0].designer_name}</p>
        <button class="btn btn-primary">Buy</button>
        <button class="btn btn-primary">Update</button>
        <button class="btn btn-primary">x</button>
      </div>
    </div>
    `;

    $('#tee-design').append(showDesign);
}
