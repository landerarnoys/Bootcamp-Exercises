'use strict'


module.exports = class Calc{




    constructor(x,y){

            this.x = x;
            this.y = y;

    }


      sum(x,y){
              return parseInt(x) + parseInt(y);
      }

      multiply(x,y){
            return parseInt(x) * parseInt(y);
      }
}

/*oplossing Robert



class Calculator{

    add(x,y){
        return x +y
    }
}

module.exports = new Calculator();
//dit is beter want new keywoord niet telkens gereturned worden en is een singleton
*/






