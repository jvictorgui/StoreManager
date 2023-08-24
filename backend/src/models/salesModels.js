const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
    const query = `SELECT sale_id, date, product_id, quantity 
    FROM sales_products sp
    JOIN sales s
    ON s.id = sp.sale_id
    ORDER BY sale_id, product_id;`;
    const [response] = await connection.execute(query);
    return camelize(response);
};

const getById = async (id) => {
    const query = `SELECT date, product_id, quantity 
    FROM sales_products sp
    JOIN sales s
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY sale_id, product_id;`;
    const [response] = await connection.execute(query, [id]);
    return camelize(response);
};
const createSale = async (saleItems) => {
    const querySale = 'INSERT INTO sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.execute(querySale);
    const querySalesProducts = `
    INSERT INTO sales_products
    (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
    const queryPromises = saleItems.map(({ productId, quantity }) => 
    connection.execute(querySalesProducts, [insertId, productId, quantity]));

     await Promise.all(queryPromises);

     const [itemsDB] = await connection
     .execute('SELECT product_id, quantity FROM sales_products WHERE sale_id = ?', [insertId]);

    return camelize({
        id: insertId,
        itemsSold: itemsDB, 
    });
};

module.exports = {
    getAll,
    getById,
    createSale,
};