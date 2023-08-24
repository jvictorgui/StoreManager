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

    afterEach(function () {
        sinon.restore();
    });
});