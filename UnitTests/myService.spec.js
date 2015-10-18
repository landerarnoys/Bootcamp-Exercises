var chai = require("chai");
var expect = chai.expect;
var myService = require('./myService');


//describe('Test', function() {
//    it('should fail', function() {
//        expect(false).to.equal(true);
//    });
//});
//
//describe('Test2', function() {
//    it('should fail', function() {
//        expect(true).to.equal(true);
//    });
//});

//describe('', function() {
//    it('test', function(done) {
//        myService.find('query', function(data){
//            expect(data).to.equal('abc');
//            done();
//        });
//    });
//});

xdescribe('', function() {
    it('test failed', function(done) {

        myService.find('query').then(function(data){
            expect(data).to.equal('aqqqc');
            done();
        }).catch(function(err){
            done(err);
        });

    });
});




xdescribe('', function() {
    it('test empty', function(done) {

        myService.find('').then(function(data){
            done('no succes');
        }).catch(function(err){
            if(error == 'bad value')
                done('invalid error')
            else
                done();
        });

    });
});




describe('', function() {
    it('test succes', function(done) {
        var promise = myService.find('query');
        expect(promise).to.eventually.equal('abc')
            .notify(done);
    });
});




