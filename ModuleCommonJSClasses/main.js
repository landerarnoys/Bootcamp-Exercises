var argv = require('yargs').argv;
var calc = require('./calc.js')


var calculator = new calc();

console.log(calculator.sum(argv.x,argv.y));

console.log(calculator.multiply(argv.x,argv.y));


/* Oplossing Sfen arg als deel van methodenaam gebruiken
    calc[actionname]
*/
