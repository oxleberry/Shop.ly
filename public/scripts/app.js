
let currentCart = [];
let currentTotal = [];

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
      success: loadSuccess,
      error: handleError
    });


}); // end of document.ready



// populates category page from database
function loadSuccess(json) {
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
            <button data-id="${el._id}" class="btn btn-primary btn-category">See Detail</button>
          </div>
        </div>
        `;
        $('#tee-design').append(cateShirt);
    });
    // when each shirt button is clicked,
    // grap the data-id associated with that shirt
    $('.btn-category').on('click', $('#tee-design'), function() {
        var cateBtnAttr = $(this).attr('data-id');
        // console.log(cateBtnAttr);
        var detailUrl = `/api/shirts/${cateBtnAttr}`;
        // append that shirts data SHIRT-DETAIL info
        $.ajax({

          beforeSend: function(){
                 // Handle the beforeSend event
          },


          method: 'GET',
          // url: '/api/shirts/:id',
          url: detailUrl,
          success: detailsSuccess,
          error: handleError
        });
    });
}

// WHEN SEE DETAILS BUTTON IS CLICKED

// loop through shirt.size
// (change p tags to buttons)
// if the size quantity is < 1
    // toggle class active, which hides button tag


// populates details section
function detailsSuccess(shirt) {
    // console.log("details success");
    // console.log(shirt);
    $('#tee-show').empty();
    // populate shirt details section
    const detailsShirt = `
    <div class="show-image">
      <img src="images/${shirt.image}" alt="">
    </div>
    <div class="show-details">
        <h6>${shirt.name}</h6>
        <h6>${shirt.price}</h6>
        <div class="cont-row show-text">
            <h6>Size</h6>
            <p>XS: ${shirt.size[0]}</p>
            <p>S: ${shirt.size[1]}</p>
            <p>M: ${shirt.size[2]}</p>
            <p>L: ${shirt.size[3]}</p>
            <p>XL: ${shirt.size[4]}</p>
            <p>XXL: ${shirt.size[5]}</p>
        </div>
        <button data-id="${shirt._id}" type="button" class="btn btn-outline-secondary btn-detail">add to bag</button>
        <p>${shirt.description}</p>
    </div>
    `;
    $('#tee-show').append(detailsShirt);
    $('.btn-detail').on('click', function() {
        console.log('CART BUTTON CLICKED');
        var detailBtnAttr = $(this).attr('data-id');
        console.log(detailBtnAttr);
        var cartUrl = `/api/shirts/${detailBtnAttr}`;
        // append that shirts data SHIRT-DETAIL info
        $.ajax({
          method: 'GET',
          // url: '/api/shirts/:id',
          url: cartUrl,
          success: cartSuccess,
          error: handleError
      });


    });
}

// WHEN ADD TO BAG BUTTON IS CLICKED

// decrement the inventory from that items size
// use that attr to

// add to current cart and current total
// when add to bag is clicked
function cartSuccess(shirt) {
    // console.log('CART SUCCESS');
    // console.log(shirt);
    var shirtId = shirt._id;
    var shirtPrice = shirt.price;
    // console.log(shirtId);
    // console.log(shirtPrice);
    currentCart.push(shirtId);
    currentTotal.push(shirtPrice);
    // console.log(currentCart);
    // console.log(currentTotal);
    populateCart(shirt);
}

// populate cart section with data of each shirt
// when add to bag is clicked
function populateCart(shirt) {
    console.log("POPULATING CART");
    var updateCart = `
    <button class="cart-delete">x</button>
    <img class="cart-img" src="images/${shirt.image}" alt="">
    <p>${shirt.name}</p>
    <p>${shirt.price}</p>
    <div class="form-group cont-row quantity-flex">
      <div>
          <label for="cart-quantity">Quantity</label>
      </div>
      <div>
          <select class="form-control" id="cart-quantity">
              <option>1</option>
              <option>2</option>
              <option>3</option>
          </select>
      </div>
      <button>update</button>
    </div>
    <hr>
    `;

    $('#cart-item').append(updateCart);
};

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
