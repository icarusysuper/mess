var mod  = 'mustang'
  , conf = require('../confs')[mod]

var express = require('express')
  , app = express()

app.use(function(req, res, next) {
    console.log('recv request')
    next()
})

app.use(express.static('./public'))

app.listen(conf.port, function() {
    console.log('server is running on port', conf.port)
})
