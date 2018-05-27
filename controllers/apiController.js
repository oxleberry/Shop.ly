
// controllers/apiController.js
function index(req, res) {
  res.json({
    message: 'Welcome to Shop.ly!',
    documentation_url: 'https://github.com/sf-wdi-labs/Shop.ly',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  });
}



module.exports = {
  index: index
}
