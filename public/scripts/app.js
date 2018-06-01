
// variables to hold temp shopping cart status
let currentCart = [];
let currentTotal = [];
let selSize;
let selSizeQty;

$(function() {
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
    // not yet working
    // $("a home-link").on("click", function(e){
    //     e.preventDefault();
    //     $("#home-section").toggle();
    //     $("#catalog-section").toggle();
    // });

}); // end of document.ready


// populates category section from database
function loadSuccess(json) {
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
        var detailUrl = `/api/shirts/${cateBtnAttr}`;
        // append that shirts data SHIRT-DETAIL info
        $.ajax({
          method: 'GET',
          url: detailUrl,
          success: detailsSuccess,
          error: handleError
        });
    });
}

// populates details section
function detailsSuccess(shirt) {
    $('#tee-show').empty();
    const detailsShirt = `
    <div class="show-image">
      <img src="images/${shirt.image}" alt="">
    </div>
    <div class="show-details">
        <h2 class="showDetailsName">${shirt.name}</h2>
        <hr>
        <h4 class="showDetailsPrice">Price: $ ${shirt.price}</h4>
        <div class="cont-row show-text cont-wrap">
            <h3 class="showDetailsSize">Size</h3>
            <button data-idx="0" type="button" class="btn btn-md btnShirtSize size">XS: ${shirt.size[0]}</button>
            <button data-idx="1" type="button" class="btn btn-md btnShirtSize size">S: ${shirt.size[1]}</button>
            <button data-idx="2" type="button" class="btn btn-md btnShirtSize size">M: ${shirt.size[2]}</button>
            <button data-idx="3" type="button" class="btn btn-md btnShirtSize size">L: ${shirt.size[3]}</button>
            <button data-idx="4" type="button" class="btn btn-md btnShirtSize size">XL: ${shirt.size[4]}</button>
            <button data-idx="5" type="button" class="btn btn-md btnShirtSize size">XXL: ${shirt.size[5]}</button>
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
        var detailBtnAttr = $(this).attr('data-id');
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
    $('button.size').each( function(idx, el) {
        if (shirtSize[idx] < 1) {
            $(this).addClass('out-of-stock');
            $(this).attr("disabled", "disabled");
        }
    });
}

// in detail section, add selected class
// to the button that has been clicked on
function activateSize() {
    $('button.size').on('click', function(){
        $('.size').removeClass('selected');
        $(this).toggleClass('selected');
        var selectedSize = $(this).text();
        var selSplitter = selectedSize.indexOf(':')
        selSize = selectedSize.slice(0, selSplitter);
        selSizeQty = selectedSize.slice(selSplitter + 2);
    });
}

// when add to bag is clicked
function cartSuccess(shirt) {
    var shirtId = shirt._id;
    var shirtPrice = shirt.price;
    currentCart.push(shirtId);
    currentTotal.push(shirtPrice);

    // decrement the inventory from that items size
    var updatedSizeArr = decrementQty(shirt);
    var invUrl = `/api/shirts/${shirtId}`;
    $.ajax({
      method: 'PUT',
      url: invUrl,
      // use data to update the value in db
      data: { size: updatedSizeArr },
      success: invSuccess,
      error: handleError
    });
    populateCart(shirt);
    calcTotal();
}

function invSuccess() {
    // console.log("INVENTORY SUCCESS");
}


// grab the data-idx of the selected size button
function selectedSize() {
    var selBtnId = $('button.selected').attr('data-idx');
    return selBtnId;
}

// decrement the inventory from that items size
function decrementQty(shirt) {
    var sizeArray = shirt.size;
    // console.log('SIZE ARRAY');
    // console.log(sizeArray);
    var currSizeIdx = selectedSize();
    selSizeQty = parseInt(selSizeQty);
    selSizeQty--;
    sizeArray[currSizeIdx] = selSizeQty;
    // console.log('UPDATED ARRAY');
    // console.log(sizeArray);
    return sizeArray;
}

// populate cart section with data of each shirt
// when add to bag is clicked
function populateCart(shirt) {
    var popCart = `
    <div class="temp-item-cart" data-id="${shirt._id}">
        <button data-id="${shirt._id}" data-size="${selSize}" class="cart-delete">Remove</button>
        <img class="cart-img" src="images/${shirt.image}" alt="">
        <p>${shirt.name}</p>
        <p>Price: $ ${shirt.price}</p>
        <p>Size: ${selSize}</p>
        <hr>
    </div>
    `;
    $('#cart-item').append(popCart);

    // in shopping cart, when the Remove button is clicked
    // delete this item from array
    $('.cart-delete').on('click', function(){
        var detailBtnAttr = $(this).attr('data-id');
        var sizeBtnAttr = $(this).attr('data-size');
        // console.log(sizeBtnAttr);
        // console.log(currentCart);
        $(this).parent().remove();
        // get the total amount from temp cart
        currentCart.forEach( function (el, idx) {
            if (el === detailBtnAttr) {
                currentCart.splice(idx, 1);
                currentTotal.splice(idx, 1);
            }
            if (currentTotal.length === 0) {
                $('.total').text(`Total: $ 0`);
            } else {
                calcTotal();
            }

            // increment the inventory from that items size
            // if they remove from cart
            var shirtId = shirt._id;
            var restockSizeArr = restockQty(shirt, sizeBtnAttr);
            var invUrl = `/api/shirts/${shirtId}`;
            $.ajax({
              method: 'PUT',
              url: invUrl,
              // use data to update the value in db
              data: { size: restockSizeArr },
              success: invSuccess,
              error: handleError
            });
        });
    });
};

// restock the inventory if they remove from cart
// still buggy
function restockQty(shirt) {
    // var shirtId = shirt._id;
    var sizeArray = shirt.size;
    // console.log('SIZE ARRAY');
    // console.log(sizeArray);
    var currSizeIdx = selectedSize();
    selSizeQty = parseInt(selSizeQty);
    selSizeQty++;
    sizeArray[currSizeIdx] = selSizeQty;
    // console.log('RESTOCKED ARRAY');
    // console.log(sizeArray);
    // console.log(currentCart);
    // console.log(currentTotal);
    return sizeArray;
}


// WHEN CHECKOUT BUTTON IS CLICKED
function userSuccess(json) {
    $('#cart-form').on('submit', function(e) {
        e.preventDefault();
        var $firstName = $("#first-name").val();
        var $lastName = $("#last-name").val(); $("#last-name").val();
        $.ajax({
          method: 'POST',
          url: '/api/users',
          // not sure why serialize did not work.
          // data: $(this).serialize(),
          // use data to update the value in db
          data: {
              first_name: $firstName,
              last_name: $lastName,
              // testing
              cart: [1,2,3,4]
          },
          success: saveUserSuccess,
          error: handleError
        });

        // add thanks message
        $('.outer-thanks-cont').html(`<h1>Thanks! ${$firstName}</h1><p>Your order has been received.</p>`);
        $('.temp-item-cart').remove();
        $('.total').toggle();
        $('.outer-thanks-cont').show();
        $('#cart-form input').val('');
    });
}

function saveUserSuccess(){
    // console.log("SAVE USER SUCCESS");
}

// calculate shopping cart total
function calcTotal() {
	var numTotal = currentTotal.reduce( function (acc, val) {
		return acc + val;
    });
    $('.total').text(`Total: $ ${numTotal}`);
}

function handleError(e) {
    console.log('uh oh');
}
