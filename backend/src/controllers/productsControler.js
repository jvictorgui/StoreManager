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

module.exports = { getAll, getById };