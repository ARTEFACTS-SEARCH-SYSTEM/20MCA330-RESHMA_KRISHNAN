const express = require('express');
const mysql = require('mysql');
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
var port = process.env.PORT || 7000;
app.listen(port, ()=> console.log("REST API app listening at http://localhost:%s", port));

//To List All Books in DB
app.get('/books', (req,res)=>{
    mysqlConn.query('SELECT * FROM book_info',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        
        else
        console.log(err);
    })

});

//To search by ID
app.get('/books/:id',(req,res)=>{
    mysqlConn.query('SELECT * FROM book_info WHERE ID = ?', [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })

});
