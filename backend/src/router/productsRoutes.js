const route = require('express').Router();
const { productsControler } = require('../controllers');

route.get('/', productsControler.getAll);

route.get('/:id', productsControler.getById);
module.exports = route;