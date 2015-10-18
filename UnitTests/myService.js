/**
 * Created by lander on 15/10/15.
 */
//function MyService() {
//    this.find = function(query, callback) {
//        setTimeout(function() {
//            if (!query) {
//                callback("bad value");
//            }
//            callback(null, "abc")
//        }, 2);
//    }
//}
//module.exports = new MyService()

var Q = require("q");


function MyService() {
    this.find = function(query) {
        var deferred = Q.defer();
        setTimeout(function() {
            if (!query) {
                return deferred.reject("bad value2");
            }
            deferred.resolve("abc");
        }, 20);
        return deferred.promise;
    }
}
module.exports = new MyService();