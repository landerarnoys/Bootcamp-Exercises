/**
 * Created by lander on 15/10/15.
 */
var _ = require('underscore');
var Rnd = require('randomstring')
var HttpError = require('../httpError');
var Sha256 = require('sha256')
var userRepository = require('../data/userRepository');

module.exports = {

    //POST generate a new key for the user
    create: function(req, res, next){

        //find user by id
        userRepository.findOne({ _id: req.params.id})
            .then(function(user) {
                console.log('find1', user)
                if (!user)
                    return next(new HttpError(404));

                //create rnd string and encrypt
                var rndString = Rnd.generate(15);
                var sha256String = Sha256(rndString);


                //get key name
                var keyName = req.body.name;

                var apiNameAndKey= { name : keyName, encryptedKey : sha256String};

                //Add the apiKey
                user.apiKeys.push(apiNameAndKey);

                //save it for return
                resourceKeyName = keyName;

                //save the user & key
                return userRepository.save(user);
            }).then(function(user) {
                // called after save is finished
                var resource = { name : resourceKeyName}
                res.status(200).send(resource);
            })
            .catch(function(err) {
                next(err);
            })
    },

    //POST generate a new key for the user
    delete: function(req, res, next){

        //find user by id
        userRepository.findOne({ _id: req.params.id})
            .then(function(user) {

                if (!user)
                    return next(new HttpError(404));


                //loop trough the keys to find one by name
                var nameKeysIndex = 0;
                for(var i=0; i < user.apiKeys.length; i++ ){
                    if(user.apiKeys[i].name ==  req.params.name ){
                            return nameKeysIndex = i;
                    }
                }

                //and remove it
                if (nameKeysIndex > -1) {
                    user.apiKeys.splice(nameKeysIndex, 1);
                }

                //save it for return
                resourceKeyName = user;

                //save the user & key
                return userRepository.save(user);
            }).then(function(user) {
                // called after save is finished
                //var resource = { name : resourceKeyName}
                res.status(200).send(resourceKeyName);
            })
            .catch(function(err) {
                next(err);
            })
    },


    findAll : function(req, res, next){

        //find user by id
        userRepository.findOne({ _id: req.params.id})
            .then(function(user) {

                if (!user)
                    return next(new HttpError(404));
                    //put the keys in an array
                    var keyNames = _.map(user.apiKeys, function(key){ return key.name; });
                    //save it for return
                    res.status(200).send(keyNames);

            })
            .catch(function(err) {
                next(err);
            })
    }
}






