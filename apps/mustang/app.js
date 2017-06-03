ms = require('ms')

var mod  = 'mustang'
  , port = 56789

var express = require('express')
  , app = express()

// app.use(function(req, res, next) {
//     res._recv_at = Date.now()

//     var _send = res.send
//     res.send = function() {
//         this._send_at = Date.now()
//         ms.log.info('server cost time: ', this._send_at - this._recv_at, 'ms')
//         _send.apply(this, arguments)
//     }

//     next()
// })
var serverCostTime = function(printFunc) {
    printFunc = printFunc || function(s, e) {
        ms.log.info('server cost time: ', e - s, 'ms')
    }

    return function(req, res, next) {
        res._recv_at = Date.now()

        var _send = res.send
        res.send = function() {
            this._send_at = Date.now()

            printFunc(res._recv_at, res._send_at)
            _send.apply(this, arguments)
        }

        next()
    }
}

app.use(serverCostTime())
// app.use(serverCostTime((s, e) => ms.log.info('wakaka', e - s, 'ms')))

app.get('/', function(req, res, next) {
    setTimeout(function() {
        res.send('ok')  
    }, Math.random() * 2000)
})

app.listen(port, function() {
    ms.log.info('server is running on port', port)
})

