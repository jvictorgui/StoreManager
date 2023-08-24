const Joi = require('joi');

const createSaleItemSchema = Joi.object({
    // productID: Joi.number().required(),
    quantity: Joi.number().min(1),
});

module.exports = {
    createSaleItemSchema,
};