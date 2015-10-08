
    (function ($,MyCalc) {

         $( "#sum" ).click(function() {
            var x = $('#numberOne').val();
            var y = $('#numberTwo').val();
             output(MyCalc.sum(x,y));
        });


          $( "#multiply" ).click(function() {
            var x = $('#numberOne').val();
            var y = $('#numberTwo').val();

            output(MyCalc.multiply(x,y));
           });

          function output(value){
            console.log(value);
            $("#output").text( value );

          }

    })(jQuery, MyCalc);

    //jquery find gebruiken



