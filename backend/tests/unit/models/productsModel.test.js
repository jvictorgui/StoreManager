const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('../mocks/products.mock');

chai.use(sinonChai);    
const { expect } = chai;

describe('products model', function () {   
    it('listar todos os produtos com successfull', async function () {
        sinon.stub(connection, 'execute').resolves([allProducts]);
        const response = await productsModel.getAll();
        expect(response).to.be.deep.equal(allProducts);
    });

    it(' listar 1 produto com successfull', async function () {
         const [firstProduct] = allProducts;
        const { id } = firstProduct;
        sinon.stub(connection, 'execute').resolves([firstProduct]);
        const response = await productsModel.getById(id);
        expect(response).to.be.deep.equal(firstProduct);
    });

 it('não deve listar nenhum produto', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
        const response = await productsModel.getById(0);
        expect(response).to.be.deep.equal([]);
 });
    
    afterEach(function () {
    sinon.restore();
    });
});