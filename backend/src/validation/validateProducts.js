const { createProductSchema } = require('../schema/productsSchema');

const validateCreateProduct = (product) => {
    const { error } = createProductSchema.validate(product);

    if (error) {
        return { status: 'INVALID_VALUE', message: error.message };
    }
};

module.exports = {
    validateCreateProduct,
};