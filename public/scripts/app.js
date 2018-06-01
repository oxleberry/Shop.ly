
let currentCart = [];
let currentInventory = [];
let currentTotal = [];
let selSize;
let selSizeQty;

$(function() {
    console.log('Sanity Check :)');

    $("#catalog-section").hide();
    $('.outer-thanks-cont').hide();
    // get all the shirt designs
    $.ajax({
      method: 'GET',
      url: '/api/shirts',
      success: loadSuccess,
      error: handleError
    });
    // get all the users
    $.ajax({
      method: 'GET',
      url: '/api/users',
      success: userSuccess,
      error: handleError
    });

    // link from home section to shopping section
    $(".carousel-inner").on("click", function(){
        $("#home-section").hide();
        $("#catalog-section").show();
    });

    // link back from shopping section to home section
    // $("a.home-link").on("click", function(e){
    //     e.preventDefault(;)
    //     $("#home-section").toggle();
    //     $("#catalog-section").toggle();
    // });

}); // end of document.ready


// populates category section from database
function loadSuccess(json) {
    console.log("loaded success");
    console.log(json);
    json.forEach((el, idx) => {
        const cateShirt = `
        <div class="card card-size">
          <img class="card-img-top" src="images/${el.image}" alt="tee-design">
          <div class="card-body">
            <h5 class="card-title">${el.name}</h5>
            <p class="card-text">$ ${el.price}</p>
            <a href="#tee-show" <button data-id="${el._id}" class="btn btn-primary btn-category">See Detail</button></a>
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

    const detailsShirt = `
    <div class="show-image">
      <img src="images/${shirt.image}" alt="">
    </div>
    <div class="show-details">
        <h2 class="showDetailsName">${shirt.name}</h2>
        <hr>
        <h4 class="showDetailsPrice">$ ${shirt.price}</h4>
        <div class="cont-row show-text cont-wrap">
            <h3 class="showDetailsSize">Size</h3>
            <button data-idx="0" type="button" class="btn btn-primary btn-md btnShirtSize size">XS: ${shirt.size[0]}</button>
            <button data-idx="1" type="button" class="btn btn-primary btn-md btnShirtSize size">S: ${shirt.size[1]}</button>
            <button data-idx="2" type="button" class="btn btn-primary btn-md btnShirtSize size">M: ${shirt.size[2]}</button>
            <button data-idx="3" type="button" class="btn btn-primary btn-md btnShirtSize size">L: ${shirt.size[3]}</button>
            <button data-idx="4" type="button" class="btn btn-primary btn-md btnShirtSize size">XL: ${shirt.size[4]}</button>
            <button data-idx="5" type="button" class="btn btn-primary btn-md btnShirtSize size">XXL: ${shirt.size[5]}</button>
        </div>
        <div class="form-group cont-row">
          <div class="showDetailsQuantity">
              <label for="exampleFormControlSelect1">Quantity</label>
          </div>
          <div>
              <select class="form-control" id="exampleFormControlSelect1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
              </select>
          </div>
        </div>
        <button data-id="${shirt._id}" type="button" class="btn btn-block btnShowPage btn-detail">add to bag</button>
        <hr>
        <h3 class="showDetailsDescription">${shirt.description}</h3>
    </div>
    `;

    $('#tee-show').append(detailsShirt);
    inventoryCheck(shirt);
    activateSize();
    // when add to bag button is clicked
    $('.btn-detail').on('click', function() {
        console.log('ADD TO BAG CLICKED');
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

// When see details button is clicked
// show only the sizes available if the inventory is above 1pc
    // deactivate button if it has outOfStock class
function inventoryCheck(shirt) {
    var shirtSize = shirt.size;
    // console.log("INVENTORY CHECK");
    // console.log(shirtSize);
    $('button.size').each( function(idx, el) {
        // console.log(shirtSize[idx]);
        if (shirtSize[idx] < 1) {
            $(this).addClass('outOfStock');
        }
    });
}

// in detail section, add class to selected size
function activateSize() {
    $('button.size').on('click', function(){
        console.log("SELECTED SIZE");
        $('.size').removeClass('selected');
        $(this).toggleClass('selected');
        var selectedSize = $(this).text();
        // var selectedSize = $('.selected');
        var selSplitter = selectedSize.indexOf(':')
        console.log(selectedSize);
        // console.log(selSplitter);
        selSize = selectedSize.slice(0, selSplitter);
        selSizeQty = selectedSize.slice(selSplitter + 2);
        // console.log(selSize);
        // console.log(selSizeQty);
    });
}

// when add to bag is clicked
function cartSuccess(shirt) {
    // console.log('CART SUCCESS');
    // console.log(shirt);
    var shirtId = shirt._id;
    var shirtPrice = shirt.price;
    console.log(shirtId);
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
    calcTotal();
}

// grab the data-idx of the selected size button
function selectedSize() {
    // console.log("SELECTED BUTTON IDX");
    var selBtnId = $('button.selected').attr('data-idx');
    // console.log(selBtnId);
    // console.log("SELECTED BUTTON VAL");
    // console.log(selSizeQty);
    return selBtnId;
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

    var popCart = `
    <div data-id="${shirt._id}">
        <button data-id="${shirt._id}" class="cart-delete">Remove</button>
        <img class="cart-img" src="images/${shirt.image}" alt="">
        <p>${shirt.name}</p>
        <p>Price: $ ${shirt.price}</p>
        <p>Size: ${selSize}</p>
        <div class="form-group cont-row">
            <div class="showDetailsQuantity">
                <label for="exampleFormControlSelect1">Quantity</label>
            </div>
          <div>
              <select class="form-control" id="cart-quantity">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
              </select>
          </div>
        </div>
        <hr>
    </div>
    `;
    $('#cart-item').append(popCart);

    // SHOPPING CART WHEN REMOVE ITEM IS CLICKED
    // delete this item from array
    $('.cart-delete').on('click', function(){
        var detailBtnAttr = $(this).attr('data-id');
        console.log(currentCart);
        $(this).parent().remove();
            console.log(currentCart);
        currentCart.forEach( function (el, idx) {
            if (el === detailBtnAttr) {
                currentCart.splice(idx, 1);
                currentTotal.splice(idx, 1);
            }
            console.log(el);
            console.log(idx);
            console.log(currentCart);
            if (currentTotal.length === 0) {
                $('.total').text(`Total: $ 0`);
            } else {
                calcTotal();    
            }
        });

    });

};

function invSuccess(json) {
    console.log("INVENTORY SUCCESS");
    // console.log(json);
    // console.log(json.size[selSizeQty]);
}

// Create Posts
// function renderNewDesign(design) {
//     console.log(design);
//     console.log(designList[0]);
//     var showDesign = `
//     <div class="card card-size">
//       <img class="card-img-top" src="images/${designList[0].image}" alt="tee-design">
//       <div class="card-body">
//         <h5 class="card-title">${designList[0].design_title}</h5>
//         <p class="card-text">${designList[0].custom_text}</p>
//         <p class="card-text">${designList[0].designer_name}</p>
//         <button class="btn btn-primary">Buy</button>
//         <button class="btn btn-primary">Update</button>
//         <button class="btn btn-primary">x</button>
//       </div>
//     </div>
//     `;
//
//     $('#testing').append(showDesign);
// }

// WHEN CHECKOUT BUTTON IS CLICKED
function userSuccess(json) {
    console.log("USER DATA");
    console.log(json);

    $('#cart-form').on('submit', function(e) {
        e.preventDefault();
        saveUser();

    });


}

// when checkout button is clicked
// save user account info

// Create Posts
function saveUser() {
    console.log("CREATING USER");
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: $(this).serialize(),
      success: saveUserSuccess,
      error: handleError
    });
}

//save User contact info in db
function saveUserSuccess(json){
    console.log(json);
    $('.btnCheckout').on('click', function(){
        $('.outer-thanks-cont').show();
    });
}

function calcTotal() {
	var numTotal = currentTotal.reduce( function (acc, val) {
		return acc + val;
    });
    // return currentTotal;

    $('.total').text(`Total: $ ${numTotal}`);
}

function handleError(e) {
    console.log('uh oh');
}
