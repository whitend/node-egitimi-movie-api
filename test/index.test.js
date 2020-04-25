const chai = require('chai');
const chaiHttp = require('chai-http');

//const mocha = require('mocha');

const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

//console üzerinden mocha yazarak testimizi çalıştırabiliriz
//yada packet json üzerinden test yapabiliriz. npm run test
//sadece test klasörüne bakar --recursive eklersek alt dizinlerede bakar

describe('Node Server', () => {
   it("(GET /) anasayfayı döndürür", (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
               res.should.have.status(200);
               done();
            });
   });
});