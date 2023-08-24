const { productsModel } = require('../models');

const getAll = async () => {
    const response = await productsModel.getAll();
    return { status: 'SUCCESSFUL', data: response };
};
const getById = async (id) => {
    const [response] = await productsModel.getById(id);
    if (!response) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    return { status: 'SUCCESSFUL', data: response };
};

module.exports = { getAll, getById };