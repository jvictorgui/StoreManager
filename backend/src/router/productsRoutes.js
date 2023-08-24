const route = require('express').Router();
const { productsControler } = require('../controllers');
const { validateName } = require('../middlewares/productMiddleware');

route.get('/', productsControler.getAll);

route.get('/:id', productsControler.getById);
route.post('/', validateName, productsControler.createProduct);
route.delete('/:id', productsControler.deleteProduct);
module.exports = route;