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

    it('should create a product successfully', async function () {
        const newProduct = {
            id: 10,
            name: 'new product',
        };
        sinon.stub(productsModel, 'createProduct').resolves([newProduct]);
        const { status, data } = await productServices.createProduct({ name: newProduct.name });
        expect(status).to.be.equal('CREATED');
        expect(data).to.be.equal(newProduct);
    });   

    it('should not create a product with a short name', async function () {
        const newProduct = {
            id: 10,
            name: 'new',
        };
        sinon.stub(productsModel, 'createProduct').resolves([newProduct]);
        const { status, data } = await productServices.createProduct({ name: newProduct.name });
        expect(status).to.be.equal('INVALID_VALUE');
        expect(data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });

    afterEach(function () {
        sinon.restore();
    });
});