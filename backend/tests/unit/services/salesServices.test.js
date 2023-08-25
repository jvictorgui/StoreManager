const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const { salesModels } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const { allSales, newSale } = require('../mocks/salesMock');

describe('Testando o service de sales', function () {
    it('lista todas as sales com sucesso', async function () {
        sinon.stub(salesModels, 'getAll').resolves(allSales);
        const { status, data } = await salesServices.getAll();
        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.deep.equal(allSales);
    });

    it('deve listar primeira sale com sucesso', async function () {
        const [firstSale] = allSales.filter(({ saleId }) => saleId === 1);
        sinon.stub(salesModels, 'getById').resolves(firstSale);
        const { status, data } = await salesServices.getById(1);
        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.equal(firstSale);
    });

    it('erro se a sale for not found', async function () {
        sinon.stub(salesModels, 'getById').resolves([]);
        const { status, data } = await salesServices.getById(0);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Sale not found');
    });

    it('deve criar uma sale com sucesso', async function () {
        sinon.stub(salesServices, 'productDontExists').resolves(false);
        sinon.stub(salesModels, 'createSale').resolves(newSale.expectedResponse);
        const { status, data } = await salesServices.createSale(newSale.request);
        expect(status).to.be.equal('CREATED');
        expect(data).to.be.equal(newSale.expectedResponse);
    });   

    // it('nao deve criar um pdroduto com nome curto', async function () {
    //     const newProduct = {
    //         id: 10,
    //         name: 'new',
    //     };
    //     sinon.stub(productsModel, 'createProduct').resolves([newProduct]);
    //     const { status, data } = await productServices.createProduct({ name: newProduct.name });
    //     expect(status).to.be.equal('INVALID_VALUE');
    //     expect(data).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    // });
    // it('deve deletar um produto com sucesso', async function () {
    //     sinon.stub(productsModel, 'getById').resolves([allProducts[0]]);
    //     sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
    //     const { status, data } = await productServices.deleteProduct(1);
    //     expect(status).to.be.equal('DELETED');
    //     expect(data).to.be.equal(undefined);
    // }); 

    // it('nao deve deletar um produto com id inexistente', async function () {
    //     sinon.stub(productsModel, 'getById').resolves([]);
    //     sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
    //     const { status, data } = await productServices.deleteProduct(0);
    //     expect(status).to.be.equal('NOT_FOUND');
    //     expect(data).to.be.deep.equal({ message: 'Product not found' });
    // });

    afterEach(function () {
        sinon.restore();
    });
});