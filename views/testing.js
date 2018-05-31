const detailsShirt = `
<div class="show-image">
  <img src="images/${shirt.image}" alt="">
</div>
<div class="show-details">
    <h2 class="showDetailsName">${shirt.name}</h2>
    <hr>
    <h4 class="showDetailsPrice">$ ${shirt.price}</h4>
    <div class="cont-row show-text">
        <h3 class="showDetailsSize">Size</h3>
        <button data-idx="0" type="button" class="btn btn-primary btn-sm btnShirtSize size">XS: ${shirt.size[0]}</button>
        <button data-idx="1" type="button" class="btn btn-primary btn-sm btnShirtSize size">S: ${shirt.size[1]}</button>
        <button data-idx="2" type="button" class="btn btn-primary btn-sm btnShirtSize size">M: ${shirt.size[2]}</button>
        <button data-idx="3" type="button" class="btn btn-primary btn-sm btnShirtSize size">L: ${shirt.size[3]}</button>
        <button data-idx="4" type="button" class="btn btn-primary btn-sm btnShirtSize size">XL: ${shirt.size[4]}</button>
        <button data-idx="5" type="button" class="btn btn-primary btn-sm btnShirtSize size">XXL: ${shirt.size[5]}</button>
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
    <button data-id="${shirt._id} type="button" class="btn btn-block btnShowPage btn-detail">add to bag</button>
    <hr>
    <h3 class="showDetailsDescription">${shirt.description}</h3>
</div>
`;
