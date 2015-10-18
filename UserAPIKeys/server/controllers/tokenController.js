/**
 * Created by lander on 15/10/15.
 */
var _ = require('underscore');
var Rnd = require('randomstring')
var HttpError = require('../httpError');
var Sha256 = require('sha256')
var userRepository = require('../data/userRepository');

//verplaasten naar repository
var Q = require('q');
var UserModel = require('../models/user');

module.exports = {

        authenticate : function(req, res, next) {

            var sha256String = Sha256(req.body.apiKey);

            //verplaatsen naar repository


            UserModel.findOne({'apiKeys.encryptedKey': sha256String}, function (user) {
                if (!user)
                    return next(new HttpError(404));

                console.log(user);
            })

        }
}



