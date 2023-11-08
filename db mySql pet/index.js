const http = require('http');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

let indexPage = fs.readFileSync(path.join (__dirname, 'index.html'));
let errorPage = fs.readFileSync(path.join (__dirname, 'error.html'));

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password :"zaq1@WSX",
    database: "chat"
});



function showTable(){
    return "select * from user"
}

function addMessage(){
    return "INSERT INTO message(content,author_id,dialog_id) VALUES('qq',6,4)"
}


    let inc = 0; 
function formResponseFrom_db(){ //name
   
        
    connection.query(
        showTable(),
        function(err, results, filds){
            
        }
    );
    connection.end();


            let content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <p>hi again ${inc}</p>
    </body>
    </html>`
   
    inc += 1;
    console.log("successful", inc)
}






const server = http.createServer((request, response)=> {
    formResponseFrom_db();
    response.end(indexPage);
});

server.listen(5050);



