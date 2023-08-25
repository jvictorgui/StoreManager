const chai = require('chai');
const sinon = require('sinon'); 
const sinonChai = require('sinon-chai');

const { validateName } = require('../../../src/middlewares/productMiddleware');

chai.use(sinonChai);
const { expect } = chai;

describe('Testando os middlewares', function () {
    it('cria um produto com sucesso', async function () {
        const newProduct = {
            name: 'new product',
        };
        
        const req = { body: newProduct };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
        const next = sinon.stub().returnsThis();
        validateName(req, res, next);
        expect(next).to.have.been.calledWith();
        // expect(res.status).to.have.been.calledWith(200);
        // expect(res.json).to.have.been.calledWith(allProducts);
    });
    it('não cria um produto sem nome', async function () { 
        const req = { body: {} };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
        const next = sinon.stub().returns();
        validateName(req, res, next);
        expect(next).not.to.have.been.calledWith();
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
   
    afterEach(function () {
        sinon.restore();
    });
});