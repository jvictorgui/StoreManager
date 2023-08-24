const route = require('express').Router();
const { salesController } = require('../controllers');
// const { validateAll } = require('../middlewares/salesMiddleware');

route.get('/', salesController.getAll);

route.get('/:id', salesController.getById);
route.post('/', salesController.createSale);

module.exports = route;