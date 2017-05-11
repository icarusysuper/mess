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

var multer = require('multer')
  , mime   = require('mime-types')
  , fs     = require('fs')

var single_upload = multer({
    dest : __dirname + '/uploads/',
    fileFilter : function(req, file, cb) {
        if (/image\/*/.test(file.mimetype)) {
            console.log('file ok')
            cb(null, true); return
        }

        console.log('file not ok')
        cb(new Error('file_not_ok'))
    },
    limits : {
        fileSize : 10 * 1024 * 1024 // 10MB
    }
}).single('image')

app.post('/upload', function(req, res, next) {
    single_upload(req, res, function(err) {
        if (err) {
            console.log(err)
            res.send('fail')
            return
        }

        var origin_path = req.file.path
        var filename = new Date().getTime() + '_' + Math.ceil(Math.random() * 10000) + '.' + mime.extension(req.file.mimetype)
        var target_path = __dirname + '/public/static/' + filename
        console.log('before rename')
        fs.rename(origin_path, target_path, function(err) {
            if (err) {
                console.error(err)
                res.send('fail')
                return
            }

            console.log('rename success')
            res.send(filename)
        })
    })
})

// test mode
// /download?a.xlsx
app.get('/download', function(req, res) {
    var filename = req.url.split('?')[1].trim()

    require('http').get('http://localhost:56789/static/' + filename, function(pres) {

        for (var k in pres.headers) {
            res.setHeader(k, pres.headers[k])
        }

        res.setHeader('Content-Disposition', 'attachment;filename=' + filename)
        console.log(res._headers)


        pres.pipe(res)
    })
})
