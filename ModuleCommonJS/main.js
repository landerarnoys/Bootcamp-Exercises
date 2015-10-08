var argv = require('yargs').argv;
var calc = require('./calc.js')



console.log(calc.sum(argv.x,argv.y));
console.log(calc.multiply(argv.x,argv.y));


