
 describe('util', function() {

        describe('uurd', function() {
            it('should create a random user id', function() {

                var rndOne = util.uuid();
                var rndTwo = util.uuid();
                expect(rndOne).not.toBe(rndTwo);;
            });
        });

    });



 describe('util', function() {

        describe('uurd', function() {
            it('should create a random user id', function() {

                var rndOne = util.uuid();
                var rndTwo = util.uuid();
                expect(rndOne).not.toBe(rndTwo);;
            });
        });

    });
