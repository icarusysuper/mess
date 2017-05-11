var util = require('util')

module.exports = function() {
    return {
        info : function() {
            var args = Array.prototype.slice.call(arguments)
            args.unshift('[INFO]  -')

            util.log.apply(null, args)
        },

        error : function() {
            var args = Array.prototype.slice.call(arguments)
            args.unshift('[ERROR] -')
            
            util.log.apply(null, args)
        }
    }
}