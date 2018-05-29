

const designList = [
    {
        custom_text: 'Zombies are coming',
        design_title: 'Pancakes',
        designer_name: 'Mochi',
        image: 'precision.jpg'
    }
];


$(function() {
    console.log('Sanity Check :)');

    // category page
    $.ajax({
      method: 'GET',
      url: '/api/shirts',
      success: handleSuccess,
      error: handleError
    });

// category page
// when button is clicked, find data-attr
// use data-attr to find shirt:_id
// populate the show details section with that info.

    // $('#show-button').on('submit', (e) => {
    //   e.preventDefault();
    //       console.log('Button Click');
    //   $.ajax({
    //     method: 'GET',
    //     url: '/api/shirts',
    //     success: showSuccess,
    //     error: handleError
    //   });
    // });

// testing create
    // $('#testing').on('submit', (e) => {
    //   e.preventDefault();
    //   $.ajax({
    //     method: 'POST',
    //     url: '/api/shirts',
    //     data: $(this).serialize(),
    //     success: newDesignSuccess,
    //     error: handleError
    //   });
    // });


}); // end of document.ready



// populates seed data on category page
function handleSuccess(json) {
    console.log("loaded success");
    console.log(json);
    // var shirt = json;
    json.forEach((el, idx) => {
        const cateShirt = `
        <div class="card card-size">
          <img class="card-img-top" src="images/${el.image}" alt="tee-design">
          <div class="card-body">
            <h5 class="card-title">${el.name}</h5>
            <p class="card-text">${el.price}</p>
            <button data-id="${el._id}"class="btn btn-primary">Buy</button>
          </div>
        </div>
        `;

        $('#tee-design').append(cateShirt);

        });

        // when THIS button is clicked,
        // grap the data-id associated with that shirt
        $('button').on('click', $('#tee-design'), function() {
            var buttonAttr = $(this).attr('data-id');
            console.log(buttonAttr);
            var detailUrl = `/api/shirts/${buttonAttr}`;

            // append that shirts data SHOW-DETAIL info
            $.ajax({
              method: 'GET',
              // url: '/api/shirts/:id',
              url: detailUrl,
              success: detailsSuccess,
              error: handleError
            });


    }); // end of forEach
}

// populates seed data on category page
function showSuccess(el) {
    console.log("show success");
    // console.log(el);
    // var shirt = json;
    // const showShirt = `
    //     <div class="show-image">
    //       <img src="images/${el.image}" alt="tee-design">
    //     </div>
    //     <div class="show-details">
    //         <h6>${el.name}</h6>
    //         <h6>${el.price}</h6>
    //         <div class="cont-row show-text">
    //             <h6>Size</h6>
    //             <p>XS</p>
    //             <p>S</p>
    //             <p>M</p>
    //             <p>L</p>
    //             <p>XL</p>
    //             <p>XXL</p>
    //         </div>
    //         <button type="button" class="btn btn-outline-secondary">add to bag</button>
    //         <h6>${el.description}</h6>
    //     </div>
    // `;
    // $('#show-show').append(showShirt);
}

function detailsSuccess(shirt) {
    console.log("details success");
    // console.log(shirt);
}

function handleError(e) {
  console.log('uh oh');
}

// Create Posts
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

    $('#testing').append(showDesign);
}
