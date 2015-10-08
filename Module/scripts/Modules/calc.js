
    var MyCalc = (function() {
        'use strict'


       function sum(x,y){
            return parseInt(x) + parseInt(y);
       }

      function multiply(x,y){
            return parseInt(x) * parseInt(y);
       }

        var publicAPI = {
            sum : sum,
            multiply : multiply
        }

        return publicAPI;
    })();
