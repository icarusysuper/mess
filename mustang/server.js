var http = require('http')
  , port = 56789

http.createServer(function(req, res) {
    res.end('Hello, World!')
}).listen(port)

console.log('server is running on port', port)