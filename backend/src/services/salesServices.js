const { salesModels } = require('../models');

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

const createSale = async (saleItems) => {
    const response = await salesModels.createSale(saleItems);
    return { status: 'CREATED', data: response };
};

module.exports = {
    getAll,
    getById,
    createSale,
};