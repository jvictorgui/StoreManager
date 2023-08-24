const router = require('express').Router();
const productsRoute = require('./productsRoutes');
const salesRoute = require('./salesRoutes');

router.use('/products', productsRoute);
router.use('/sales', salesRoute);

module.exports = router;