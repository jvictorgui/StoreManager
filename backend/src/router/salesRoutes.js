const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateProductId, validateQuantity } = require('../middlewares/salesMiddleware');

route.get('/', salesController.getAll);

route.get('/:id', salesController.getById);
route.post('/', validateProductId, validateQuantity, salesController.createSale);

module.exports = route;