const router = require('express').Router();
const productsRoute = require('./productsRoutes');

router.use('/products', productsRoute);

module.exports = router;