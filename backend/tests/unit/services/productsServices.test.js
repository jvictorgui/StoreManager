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

    it('deve listar primeiro produto com sucesso', async function () {
        const [firstProduct] = allProducts;
        const { id } = firstProduct;
        sinon.stub(productsModel, 'getById').resolves([firstProduct]);
        const { status, data } = await productServices.getById(id);
        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.equal(firstProduct);
    });

    it('erro se produto not found', async function () {
        sinon.stub(productsModel, 'getAll').resolves([]);
        const { status, data } = await productServices.getById(0);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data).to.be.deep.equal({ message: 'Product not found' });
    });

    it('deve criar um produto com sucesso', async function () {
        const newProduct = {
            id: 10,
            name: 'new product',
        };
        sinon.stub(productsModel, 'createProduct').resolves([newProduct]);
        const { status, data } = await productServices.createProduct({ name: newProduct.name });
        expect(status).to.be.equal('CREATED');
        expect(data).to.be.equal(newProduct);
    });   

    it('nao deve criar um pdroduto com nome curto', async function () {
        const newProduct = {
            id: 10,
            name: 'new',
        };
        sinon.stub(productsModel, 'createProduct').resolves([newProduct]);
        const { status, data } = await productServices.createProduct({ name: newProduct.name });
        expect(status).to.be.equal('INVALID_VALUE');
        expect(data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });
    it('deve deletar um produto com sucesso', async function () {
        sinon.stub(productsModel, 'getById').resolves([allProducts[0]]);
        sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
        const { status, data } = await productServices.deleteProduct(1);
        expect(status).to.be.equal('DELETED');
        expect(data).to.be.equal(undefined);
    }); 

    it('nao deve deletar um produto com id inexistente', async function () {
        sinon.stub(productsModel, 'getById').resolves([]);
        sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
        const { status, data } = await productServices.deleteProduct(0);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data).to.be.deep.equal({ message: 'Product not found' });
    });

    afterEach(function () {
        sinon.restore();
    });
});