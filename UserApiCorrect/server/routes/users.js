var express = require('express');
var router = express.Router();
var _ = require('underscore');
var User = require('../models/user');
var userMapper = require('../mappers/userMapper');
var Q =  require('q');

var repository = {

    find: function(query){
        var deferred = Q.defer();
        var pageSize = query.pageSize || 100;
        var page = query.page || 0;

         User.find().limit(pageSize)
             .skip(pageSize * page)
             .sort(query.sort)
             .exec(function(err, users){
                 if(err){
                     deferred.resolve(null);
                 }

                 // map users list to resource list
                 var result = _.map(users, function(user){
                     return user;
                 });

                 // and respond with all users (as resource)
                 return deferred.resolve(result)
             });
        return deferred.promise;
    },




    findOne: function(query){
        var deferred = Q.defer();

        User.findOne(query, function(err,user){
                if(err){ deferred.resolve(null) }
                else{
                    return deferred.resolve(user)
                }
        });

        return deferred.promise;
    },

    save: function(model) {
        var deferred = Q.defer();
            model.save(function(err){
                    if(err){
                        return  deferred.reject(err)
                    }
                    else deferred.resolve();

            })
        return deferred.promise();
    }

}


// GET /api/users?page=0&pageSize=20&sort=-age
router.get('/', function(req, res){


    repository.find( req.query).then(function(user){
        if(!user){
            return res.status(404).send('Nothing found.');
        }
            //var resource = userMapper.map(user);
            return res.status(200).send(user);
        })
    .catch(function(){
         console.log('error!')
     });

    // query db with paging and sorting
    //User.find()
    //    .limit(pageSize)
    //    .skip(pageSize * page)
    //    .sort(req.query.sort)
    //    .exec(function(err, users){
    //        if(err){
    //            return res.status(500).send('Internal server error: ' + err);
    //        }
    //
    //        // map users list to resource list
    //        var result = _.map(users, function(user){
    //            return userMapper.map(user);
    //        });
    //
    //        // and respond with all users (as resource)
    //        return res.status(200).send(result);
    //    });
});

// GET /api/users/123
router.get('/:id', function(req, res){



    repository.findOne({_id :req.params.id})
        .then(function(user){
            if(!user){
                return res.status(404).send('This user does not exists.');
            }
            var resource = userMapper.map(user);
            return res.status(200).send(resource);
        })
        .catch(function(){
            console.log('error!')
        });

    //
    //User.findOne({ _id: req.params.id }, function(err, user){
    //    if(err){
    //        return res.status(500).send('Internal server error: ' + err);
    //    }
    //    if(!user){
    //        return res.status(404).send('This user does not exists.');
    //    }
    //
    //    // when found, return the user
    //    var resource = userMapper.map(user);
    //    return res.status(200).send(resource);
    //});
});

// PUT /api/users/123
router.put('/:id', function(req, res, next){

    var resource = req.body;
    var updatedUser;


    repository.findOne({ _id: req.params.id})
        .then(function(user){
            if(!user){
                return res.status(404).send('Resource not found!');
            }

            var names = resource.name.split(" ");
            user.firstName = names[0];
            user.lastName = names[1];
            user.age = resource.age;
            user.email = resource.email;
            user.homeAddress.addressLine = resource.address;
            user.homeAddress.city = resource.city;
            user.homeAddress.zip = resource.zip;

            updatedUser = user;

            return repository.save(user);

        })
        .then(function(){
            var resource = userMapper.map(user);
            res.status(200).send(resource);
        })
        .catch(function(err){
            return console.log("put error");
        })





    // validate request
    //
    //if(!resource.name || !resource.email){
    //    return res.status(400).send("Bad request");
    //}
    //
    //// find user based on the id
    //User.findOne({ _id: req.params.id}, function(err, user){
    //    if(err){
    //        return res.status(500).send('Internal server error: ' + err);
    //    }
    //    if(!user){
    //        return res.status(404).send('Resource not found!');
    //    }
    //
    //    // when found, update it
    //    //var names = resource.name.split(" ");
    //    //user.firstName = names[0];
    //    //user.lastName = names[1];
    //    //user.age = resource.age;
    //    //user.email = resource.email;
    //    //user.homeAddress.addressLine = resource.address;
    //    //user.homeAddress.city = resource.city;
    //    //user.homeAddress.zip = resource.zip;
    //
    //    // and save to db
    //    //user.save(function(err){
    //    //    if(err){
    //    //        return res.status(500).send('Internal server error: ' + err);
    //    //    }
    //    //
    //    //    // respond with updated user model
    //    //    var resource = userMapper.map(user);
    //    //    res.status(200).send(resource);
    //    //});
    //});
});

// POST /api/users
router.post('/', function(req, res, next){
    // validate request
    var resource = req.body;
    if(!resource.name || !resource.email){
        return res.status(400).send("Bad request");
    }

    // create new user
    var names = resource.name.split(" ");
    var user = new User({
        firstName: names[0],
        lastName: names[1],
        age: resource.age,
        email: resource.email,
        homeAddress: {
            addressLine: resource.address,
            city: resource.city,
            zip: resource.zip
        }
    });

    // save user to db
    user.save(function(err){
        if(err){
            return res.status(500).send('Internal server error: ' + err);
        }

        // respond with new created user model
        res.set('location', `http://localhost:3000/api/users/${user._id}`)
        var resource = userMapper.map(user);
        res.status(201).send(resource);
    });
});

// DELETE /api/users/12213
router.delete('/:id', function(req, res, next){
    // find user based on the id
    User.findOne({ _id: req.params.id }, function(err, user){
        if(err){
            return res.status(500).send('Internal server error: ' + err);
        }
        if(!user){
            return res.status(204).send('No content');
        }

        // when found, remove it
        user.remove(function(err){
            if(err){
                return res.status(500).send('Internal server error: ' + err);
            }
            var resource = userMapper.map(user);
            return res.status(200).send(resource);
        })
    });
});

module.exports = router;
