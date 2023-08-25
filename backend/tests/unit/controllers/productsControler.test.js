const chai = require('chai');
const sinon = require('sinon'); 
const sinonChai = require('sinon-chai');

const { productServices } = require('../../../src/services');
const { productsControler } = require('../../../src/controllers');
const { allProducts } = require('../mocks/products.mock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando o controller de produtos', function () {
    it('listar todos os produtos', async function () {
        sinon.stub(productServices, 'getAll').resolves({ status: 'SUCCESSFUL', data: allProducts });
        const req = {};
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
        await productsControler.getAll(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(allProducts);
    });
    it('listar primeiro produto', async function () {
        const [firstProduct] = allProducts;
        const { id } = firstProduct;
        sinon.stub(productServices, 'getById').resolves({ status: 'SUCCESSFUL', data: firstProduct });
        const req = { params: { id } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        await productsControler.getById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(firstProduct);
    });

    it('deve listar um erro caso id do produto nao exista', async function () {
    sinon.stub(productServices, 'getById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    const req = { params: { id: 0 } };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    await productsControler.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
});

it('deve criar um produto com sucesso', async function () {
const newProduct = {
    id: 10,
    name: 'new product',
};
sinon.stub(productServices, 'createProduct').resolves({ status: 'CREATED', data: newProduct });

const req = { 
    body: {
    name: newProduct.name,
} };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    await productsControler.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
});

it('nao deve criar um produto com nome curto', async function () {
    const newProduct = {
        id: 10,
        name: 'new',
    };
sinon.stub(productServices, 'createProduct')
.resolves({ status: 'INVALID_VALUE', data: { message: '"name" length must be at least 5 characters long' } });
const req = { 
    body: {
    name: newProduct.name,
} };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    await productsControler.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
});

it('deve deletar um produto com sucesso', async function () {
sinon.stub(productServices, 'deleteProduct').resolves({ status: 'DELETED' });
const req = { 
    params: {
    id: 10,
} };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    await productsControler.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
});

it('nao deleta um produto que nao existe', async function () {
    sinon.stub(productServices, 'deleteProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
const req = { 
    params: {
    id: 0,
} };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };
    await productsControler.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
});

    afterEach(function () {
        sinon.restore();
    });
});