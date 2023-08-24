const { productServices } = require('../services');
const { mapStatus } = require('../funcs/httpstatus');

const getAll = async (_req, res) => {
const { status, data } = await productServices.getAll();
return res.status(mapStatus(status)).json(data);
};

const getById = async (req, res) => {
    const { status, data } = await productServices.getById(req.params.id);
    return res.status(mapStatus(status)).json(data);
};
const createProduct = async (req, res) => {
    const { name } = req.body;
    const product = { name }; 
    const { status, data } = await productServices.createProduct(product);
    return res.status(mapStatus(status)).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productServices.deleteProduct(id);
    return res.status(mapStatus(status)).json(data);
};

module.exports = { getAll, getById, createProduct, deleteProduct };
