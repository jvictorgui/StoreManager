const { salesServices } = require('../services');
const { mapStatus } = require('../funcs/httpstatus');

const getAll = async (_req, res) => {
    const { status, data } = await salesServices.getAll();
    return res.status(mapStatus(status)).json(data);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesServices.getById(id);
    return res.status(mapStatus(status)).json(data);
};

const createSale = async (req, res) => {
    const saleItems = req.body;
    const { status, data } = await salesServices.createSale(saleItems);
    return res.status(mapStatus(status)).json(data);
};

module.exports = {  
    getAll,
    getById,
    createSale,
};