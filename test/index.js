'use strict'
let mongoose = require("mongoose");
let Products = require('../models/products');
let Orders = require('../models/orders');
let app = require('../index');

//dependencias solo para dev
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
describe('Products', () => {
    beforeEach((done) => {
        Products.deleteMany({}, (err) => { 
           done();           
        });        
    });


/*
  * Prueba unitaria para la operacion GET de products
  */
  describe('/GET products', () => {
      it('it debera traer todos los  Products', (done) => {
        chai.request(app)
            .get('/api/products')
            .end((err, res) => {
                
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
      
  });
    /*
    * Prueba unitaria para la operacion POST de products
    */
    describe('/POST products', () => {
        it('it debera probar guardar en la base de datos', (done) => {
            let products = {
                name: "mause",
                price: "9",
                category: "computerjj",
                description: "prueba unitaria de products",
            
            }
        chai.request(app)
            .post('/api/products')
            .send(products)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });
});
 

describe('Orders', () => {
    beforeEach((done) => {
        Orders.deleteMany({}, (err) => { 
           done();           
        });        
    });
/*
  * prueba unitaria para la operacion de get en orders
  */
  describe('/GET oreders', () => {
      it('it debera traer todos los  Orders', (done) => {
        chai.request(app)
            .get('/api/orders')
            .end((err, res) => {
                
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });
  });

    /*
    * prueba unitaria para la operacion de post en orders
    */
    describe('/POST orders', () => {
        it('it debera probar guardar en la base de datos', (done) => {
            let orders = {
                quantity: "34",
                product: "5bfaec4976bab925304a2ce5",
            
            }
        chai.request(app)
            .post('/api/orders')
            .send(orders)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });
});
