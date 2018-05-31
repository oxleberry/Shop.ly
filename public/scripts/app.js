
let currentCart = [];
let currentTotal = [];
let selSize;
let selSizeQty;

const designList = [
    {
        custom_text: 'Zombies are coming',
        design_title: 'Pancakes',
        designer_name: 'Mochi',
        image: 'precision.jpg'
    }
];

// add to current cart and current total

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



// populates category section from database
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
            <p class="card-text">$ ${el.price}</p>
            <button data-id="${el._id}" class="btn btn-primary btn-category">See Detail</button>
          </div>
        </div>
        `;
        $('#tee-design').append(cateShirt);
    });
    // when each shirt button is clicked,
    // grab the data-id associated with that shirt
    $('.btn-category').on('click', $('#tee-design'), function() {
        var cateBtnAttr = $(this).attr('data-id');
        // console.log(cateBtnAttr);
        var detailUrl = `/api/shirts/${cateBtnAttr}`;
        // append that shirts data SHIRT-DETAIL info
        $.ajax({
          method: 'GET',
          // url: '/api/shirts/:id',
          url: detailUrl,
          success: detailsSuccess,
          error: handleError
        });
    });
}

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
        <h6>$ ${shirt.price}</h6>
        <div class="cont-row show-text">
            <h6>Size</h6>
            <button data-idx="0" class="size">XS: ${shirt.size[0]}</button>
            <button data-idx="1" class="size">S: ${shirt.size[1]}</button>
            <button data-idx="2" class="size">M: ${shirt.size[2]}</button>
            <button data-idx="3" class="size">L: ${shirt.size[3]}</button>
            <button data-idx="4" class="size">XL: ${shirt.size[4]}</button>
            <button data-idx="5" class="size">XXL: ${shirt.size[5]}</button>
        </div>
        <button data-id="${shirt._id}" type="button" class="btn btn-outline-secondary btn-detail">add to bag</button>
        <p>${shirt.description}</p>
    </div>
    `;
    $('#tee-show').append(detailsShirt);
    inventoryCheck(shirt);
    activateSize();
    $('.btn-detail').on('click', function() {
        // console.log('ADD TO BAG CLICKED');
        var detailBtnAttr = $(this).attr('data-id');
        // console.log(detailBtnAttr);
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

// When detail button is clicked
// show only the sizes available if the inventory is above 1pc
function inventoryCheck(shirt) {
    var shirtSize = shirt.size;
    // console.log("INVENTORY CHECK");
    // console.log(shirtSize);
    $('button.size').each( function(idx, el) {
        // console.log(shirtSize[idx]);
        if (shirtSize[idx] < 1) {
            $(this).addClass('outOfStock');
            // console.log(button.size);
        }
    });
}

// in detail section, add class to selected size
function activateSize() {
    $('button.size').on('click', function(){
        // console.log("SELECTED SIZE");
        $('.size').removeClass('selected');
        $(this).toggleClass('selected');
        var selectedSize = $(this).text();
        // var selectedSize = $('.selected');
        var selSplitter = selectedSize.indexOf(':')
        // console.log(selectedSize);
        // console.log(selSplitter);
        selSize = selectedSize.slice(0, selSplitter);
        selSizeQty = selectedSize.slice(selSplitter + 2);
        // console.log(selSize);
        // console.log(selSizeQty);
    });
}

// grab button with selected class
function selectedSize() {
    // console.log("SELECTED BUTTON IDX");
    var selBtnId = $('button.selected').attr('data-idx');
    // console.log(selBtnId);
    // console.log("SELECTED BUTTON VAL");
    // console.log(selSizeQty);
    return selBtnId;
}

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
    // var cartBtnAttr = $(this).attr('data-id');

    // decrement the inventory from that items size
    var updatedSizeArr = decrementQty(shirt);
    var invUrl = `/api/shirts/${shirtId}`;
    $.ajax({
      method: 'PUT',
      // url: '/api/shirts/:id',
      url: invUrl,
      // // use data to update the value in db
      data: { size: updatedSizeArr },
      success: invSuccess,
      error: handleError
    });
    populateCart(shirt);
}

// decrement the inventory from that items size
function decrementQty(shirt) {
    var sizeArray = shirt.size;
    console.log('SIZE ARRAY');
    console.log(sizeArray);
    var currSizeIdx = selectedSize();
    // console.log('CURRENT IDX');
    // console.log(currSizeIdx);
    selSizeQty = parseInt(selSizeQty);
    selSizeQty--;
    sizeArray[currSizeIdx] = selSizeQty;
    console.log('UPDATED ARRAY');
    console.log(sizeArray);
    return sizeArray;
}


// populate cart section with data of each shirt
// when add to bag is clicked
function populateCart(shirt) {
    // console.log("POPULATING CART");
    var updateCart = `
    <button class="cart-delete">x</button>
    <img class="cart-img" src="images/${shirt.image}" alt="">
    <p>${shirt.name}</p>
    <p>$ ${shirt.price}</p>
    <p>Size: ${selSize}</p>
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

function invSuccess(json) {
    console.log("INVENTORY SUCCESS");
    // console.log(json);
    // console.log(json.size[selSizeQty]);
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
