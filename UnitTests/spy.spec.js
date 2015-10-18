var chai = require("chai");
var sinon = require('sinon');
//chai.use(require('chai-things'));       // array testing
chai.use(require('sinon-chai'));        // sinon and chai integration
chai.use(require('chai-as-promised'));
var expect = chai.expect;

var calc = require('./calculator');

var repository = {
    getUser : function(id){
        //get user from db
    }
}






describe('calc',function(){

    it('test',function(){
        var spy = sinon.spy(console, 'log');
        calc.add(1,2);

        expect(spy).to.have.been.calledWith(3);
    })


    it('test2',function(){
        var stub = sinon.stub(repository, 'getUser').returns({id: 12, name:'3333'});
       var result = repository.getUser()

        expect(result).to.deep.equal({ id: 12, name : '3333'});
    })

})