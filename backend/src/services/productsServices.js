const { productsModel } = require('../models');
const { validateCreateProduct } = require('../validation/validateProducts');

const getAll = async () => {
    const response = await productsModel.getAll();
    return { status: 'SUCCESSFUL', data: response };
};
const getById = async (id) => {
    const [response] = await productsModel.getById(id);
    if (!response) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    return { status: 'SUCCESSFUL', data: response };
};

const createProduct = async (product) => {
    const error = validateCreateProduct(product);
    if (error) {
        return { status: error.status, data: { message: error.message } };
    }
    const [response] = await productsModel.createProduct(product);
    return { status: 'CREATED', data: response };
};
const deleteProduct = async (id) => {
    const response = await productsModel.getById(id);
    if (!response || response.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 
    }
    await productsModel.deleteProduct(id);
    return { status: 'DELETED' };
};
module.exports = { getAll, getById, createProduct, deleteProduct };
