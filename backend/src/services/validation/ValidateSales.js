const { createSaleItemSchema } = require('../schema/salesSchema');

const validateCreateItemSale = (saleItem) => {
    const validateArray = saleItem.map((item) => createSaleItemSchema.validate(item));

    const { error } = validateArray.find((item) => item.error !== undefined);

    if (error) {
        return { status: 'INVALID_VALUE', message: error.message };
    }
};

module.exports = {
    validateCreateItemSale,
};