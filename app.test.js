const app = require('../app');  
const  {expect}  = require('chai');
const supertest = require('supertest');

describe('GET /apps', () => {
    it('Should return an Array apps', () => {
        return supertest(app)
            .get('/apps') 
            .query({ search: '' }) 
            .query({ sort: '' }) 
            .query({ genres: '' }) 
            .expect(200)  
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                expect([{ App: '' }]).to.deep.include({ App: '' });
            });
    })
});