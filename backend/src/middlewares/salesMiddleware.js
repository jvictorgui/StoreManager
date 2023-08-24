const validateProductId = (req, res, next) => {
    const salesItems = req.body;
    const missingId = salesItems.some((item) => item.productId === undefined);
    if (missingId) {
        return res.status(400).json({ message: '"productId" is required' });
    }
    next();
};

const validateQuantity = (req, res, next) => {
    const salesItems = req.body;

    const missingQuant = salesItems.some((item) => item.quantity === undefined);
    if (missingQuant) {
        return res.status(400).json({ message: '"quantity" is required' });
    }
    next();
};

const validateAll = [validateProductId, validateQuantity];

module.exports = {
    // validateProductId,
    // validateQuantity,
    validateAll,
};