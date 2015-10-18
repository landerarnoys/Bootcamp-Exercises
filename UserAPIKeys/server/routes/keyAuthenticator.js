/**
 * Created by lander on 15/10/15.
 */
var express = require('express');
var router = express.Router();
var validator = require('../middleware/requestValidator');
var tokenController = require('../controllers/tokencontroller');


// GET /authenticate
router.get('/authenticate', tokenController.authenticate);