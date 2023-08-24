const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
    const [response] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
    console.log(response);
    return camelize(response);
};

const getById = async (id) => {
    const [response] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return camelize(response);
};
const createProduct = async (product) => {
    const query = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [product.name]);
    return getById(insertId);
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
    await connection.execute(query, [id]);
};

module.exports = { getAll, getById, createProduct, deleteProduct };
