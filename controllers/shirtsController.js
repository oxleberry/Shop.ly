

const shirtList = [{
    name: 'precision',
    price: 19.99,
    image: 'precision.jpg',
    size: [0, 1, 3, 4, 2, 4],
    // size: { xs:0, s:1, m:3, L:4, XL:2, XXL:4 },
    description: 'T-shirt are 100% organic cotton. Ethically sourced'
}, {
    name: 'bad',
    price: 18.99,
    image: 'bad.jpg',
    size: [1, 4, 3, 2, 3, 0],
    // size: { xs:1, s:4, m:3, L:2, XL:3, XXL:0 },
    description: 'T-shirt are 100% organic cotton. Ethically sourced'
}, {
    name: 'solve problems',
    price: 19.99,
    image: 'solve.jpg',
    size: [3, 0, 1, 2, 3, 4],
    // size: { xs:3, s:0, m:1, L:2, XL:3, XXL:4 },
    description: 'T-shirt are 100% organic cotton. Ethically sourced'
}];




// controllers/albumsController.js
// GET /api/albums
function index(req, res) {
  // send back all albums as JSON
}

// POST /api/albums
function create(req, res) {
  // create an album based on request body and send it back as JSON
}

// GET /api/albums/:albumId
function show(req, res) {
  // find one album by id and send it back as JSON
}

// DELETE /api/albums/:albumId
function destroy(req, res) {
  // find one album by id, delete it, and send it back as JSON
}

// PUT or PATCH /api/albums/:albumId
function update(req, res) {
  // find one album by id, update it based on request body,
  // and send it back as JSON
}


module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
