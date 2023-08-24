const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
    const response = await connection.execute('SELECT * FROM products ORDER BY id ASC');
    console.log(response);
    return camelize(response)[0];
};

const getById = async (id) => {
    const response = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return camelize(response)[0];
};

module.exports = { getAll, getById };