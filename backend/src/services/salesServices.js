const { salesModels, productsModel } = require('../models');
const { validateCreateItemSale } = require('./validation/ValidateSales');

const getAll = async () => {
    const response = await salesModels.getAll();
    return { status: 'SUCCESSFUL', data: response };
};

const getById = async (id) => {
    const response = await salesModels.getById(id);
    if (!response || response.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 
    }
    return { status: 'SUCCESSFUL', data: response };
};

const productDontExists = async (saleItems) => {
    const promises = saleItems.map(async (item) => productsModel.getById(item.productId)); 
    const response = await Promise.all(promises);
    const productsDontExists = response.some((item) => item.length === 0);
    return productsDontExists;
};

const createSale = async (saleItems) => {
    if (await productDontExists(saleItems)) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
}
const error = validateCreateItemSale(saleItems);
if (error) {
    return { status: error.status, data: { message: error.message } };
} 
    const response = await salesModels.createSale(saleItems);
    return { status: 'CREATED', data: response };
};

module.exports = {
    getAll,
    getById,
    createSale,
    productDontExists,
};  