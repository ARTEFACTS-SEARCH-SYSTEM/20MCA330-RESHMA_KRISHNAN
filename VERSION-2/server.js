const express = require('express');
const mysql = require('mysql');
const handlebars = require('handlebars');
const fs = require('fs');
var app = express();
const bp = require('body-parser');

app.use(bp.json());

var mysqlConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'books',
    multipleStatements : true
});

mysqlConn.connect((err) =>{
    if(!err){
        console.log("Db Connection Successful");
    }
    else{
        console.log("Db Connection Failed");
    }
});
var port = 3000;
app.listen(port, ()=> console.log("REST API app listening at http://localhost:%s", port));

//To List All Books in DB
app.get('/books', (req,res)=>{

    let query=mysqlConn.query('SELECT * FROM book_info',(err,rows,fields)=>{
        if(!err){
            const data = { results: rows };
            const template = fs.readFileSync("./books.hbs", "utf8");
            const html = handlebars.compile(template)(data);
            res.send(html);
        }
        
        else
        console.log(err);
    })

});

