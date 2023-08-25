const { createSaleItemSchema } = require('../schema/salesSchema');

const validateCreateItemSale = (saleItem) => {
    const validateArray = saleItem.map((item) => createSaleItemSchema.validate(item));

    const hasError = validateArray.find((item) => item.error !== undefined);

    if (hasError) {
        const { error } = hasError;
        return { status: 'INVALID_VALUE', message: error.message };
    }
};

module.exports = {
    validateCreateItemSale,
};