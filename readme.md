See **ES6** branch for ES6 syntax and **ES5** branch for ES5 syntax.

## Problem

How to stub a function to hard code the response from the function and spy on the arguments passed to the function.

**Example**

ES5

	foo: (value) => {
		return 'bar';
	}


ES6

	class Foo {
		bar(value) {
			return 'bar';
		}
	}


In the test I want to return *'something else'* and confirm value.

## Example of stubbing

### Object

service.js

    module.exports = {
        serviceFn: = args => {
	        return new Promise((reject, resolve) => {
	    	    if (args.id) {
		            return resolve();
		        }
		        return reject();
	        });
	    }
    };

example.js

    const serice = require('./service');

    module.exports = {
    	fn1: () => {
	        const obj = {id: 'test'};
	        return service.serviceFn(obj).then(() => {
	            return true;
	        }).catch(() => {
	            return false;
	        });
	    }
    }
    
example_test.js

    const sinon = require('sinon');
    const {expect} = require('chai');
    const service = require('./service);
    const example = require('./example');
    
    describe('example', () => {
    	let sandbox;
	
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => {
            sandbox.restore();
        });

        it('test', done => {
            sandbox.stub(service, 'serviceFn').callsFake(obj => {
                expect(obj.id).to.equal('test');
                return Promise.resolve();
            });
            
            const result = example.fn();
            expect(result).to.equal(true);
            done();
        });
    );
    
### Class

service.js

    class Service {
        constructor() {
        };
        
        serviceFn(args) {
            return new Promise((reject, resolve) => {
	    	    if (args.id) {
		            return resolve();
		        }
		        return reject();
	        });
        }
    }
    
    module.exports = Service;{

example.js

    const Service = require('./service');

    module.exports = {
    	fn1: () => {
	        const obj = {id: 'test'};
	        return new Service().serviceFn(obj).then(() => {
	            return true;
	        }).catch(() => {
	            return false;
	        });
	    }
    }
    
example_test.js

    const sinon = require('sinon');
    const {expect} = require('chai');
    const service = require('./service);
    const example = require('./example');
    
    describe('example', () => {
    	let sandbox;
	
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });
        afterEach(() => {
            sandbox.restore();
        });

        it('test', done => {
            sandbox.stub(service.prototype, 'serviceFn').callsFake(obj => {
                expect(obj.id).to.equal('test');
                return Promise.resolve();
            });
            
            const result = example.fn();
            expect(result).to.equal(true);
            done();
        });
    );    
