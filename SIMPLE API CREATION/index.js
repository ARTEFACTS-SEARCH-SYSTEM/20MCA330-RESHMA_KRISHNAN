//REST API demo in Node.js
var express = require('express'); // require the express framework
var app = express();
var fs = require('fs'); //require file system object

// Endpoint to Get a list of books
app.get('/getBooks', function(req, res){
    if(req.url==='/getBooks'){
        fs.readFile('books.json',function(err,data){
            res.writeHead(200,{'Content-Type':'json'})
            res.end(data)
            
        })
    }else{
        res.write('error')
        res.end()
    }
})


var port = 3000;
var server = app.listen(port, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API app listening at http://localhost:%s", port)
})
