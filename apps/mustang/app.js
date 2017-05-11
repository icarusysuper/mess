ms = require('ms')

var mod  = 'mustang'
  , port = 56789

var express = require('express')
  , app = express()

app.listen(port, function() {
    ms.log.info('server is running on port', port)
})
