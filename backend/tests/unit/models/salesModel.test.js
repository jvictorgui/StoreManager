const chai = require('chai');
const sinon = require('sinon'); 
const sinonChai = require('sinon-chai');

const connection = require('../../../src/models/connection');
const { salesModels } = require('../../../src/models');
const { allSales } = require('../mocks/salesMock');

chai.use(sinonChai);
const { expect } = chai;

describe(' model de vendas', function () {
    it('todas as vendas com successo', async function () {
        sinon.stub(connection, 'execute').resolves([salesModels]);
        const response = await salesModels.getAll();
        expect(response).to.be.deep.equal(salesModels);
    });

    it('primeiro produto com sucesso', async function () {
        const firstSale = allSales.filter((sale) => sale.saleId === 1);
        const id = 1; 
        sinon.stub(connection, 'execute').resolves([firstSale]);
        const response = await salesModels.getById(id);
        expect(response).to.be.deep.equal(firstSale);
    });

    it('nenhum produto', async function () {
        sinon.stub(connection, 'execute').resolves([[]]);
        const response = await salesModels.getById(0);
        expect(response).to.be.deep.equal([]);
    });

    afterEach(function () {
        sinon.restore();
    });
});