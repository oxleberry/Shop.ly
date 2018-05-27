

var shirts = [{
  _id: 132,
  name: 'precision',
  xs: 0,
  s: 1,
  m: 3,
  l: 4,
  xl: 3,
  xxl: 4,
  price: 20,
  images: '../public/images/precision.jpg',
  description: 'T-shirt are 100% organic cotton. Ethically sourced'
}, {
  _id: 133,
  artistName: 'bad',
  xs: 3,
  s: 4,
  m: 3,
  l: 4,
  xl: 3,
  xxl: 0,
  price: 20,
  images: '../public/images/bad.jpg',
  description: 'T-shirt are 100% organic cotton. Ethically sourced'
}, {
  _id: 134,
  artistName: 'solve problems',
  xs: 3,
  s: 4,
  m: 1,
  l: 4,
  xl: 3,
  xxl: 4,
  price: 20,
  images: '../public/images/solve.jpg',
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
