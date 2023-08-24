const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { productsModel } = require('../../../src/models');
const { productServices } = require('../../../src/services');
const { allProducts } = require('../mocks/products.mock');

describe('Testando o service de produtos', function () {
    it('lista todos os produtos com sucesso', async function () {
        sinon.stub(productsModel, 'getAll').resolves(allProducts);
        const { status, data } = await productServices.getAll();
        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.deep.equal(allProducts);
    });

    it('lista primeiro produto', async function () {
        const [firstProduct] = allProducts;
        const { id } = firstProduct;
        sinon.stub(productsModel, 'getAll').resolves(firstProduct);
        const { status, data } = await productServices.getById(id);
        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.deep.equal(firstProduct);
    });

    it('erro se produto not found', async function () {
        sinon.stub(productsModel, 'getAll').resolves([]);
        const { status, data } = await productServices.getById(0);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data).to.be.deep.equal({ message: 'Product not found' });
    });

    afterEach(function () {
        sinon.restore();
    });
});