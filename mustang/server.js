var http = require('http')
  , port = 56789

http.createServer(function(req, res) {
    res.end('hello')
}).listen(port)

console.log('server is running on port', port)