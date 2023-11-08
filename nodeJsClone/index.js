//console.log("--------------");
/*
let chalk = require('chalk');

let cowsay = require("cowsay");
let cowString =  cowsay.say({text : __dirname});
//console.log(cowString);

let path = require('path');
//console.log(path.basename(__filename));
//console.log( path.extname(__filename) );//Розширення файлу 
//console.log( path.dirname(__filename) );//Тека знаходження 
//console.log( path.parse(__filename) );//Об'єкт з усіма даними про 

/*

//C : \Useps\student\Desktop\node\folder\text. txt
//console.log(path.join( __dirname, 'foldep', 'text.txt'))
let jsonString =`{"fileNumber": 3,"name": "file","content": "Hello world"}`;

let odj =  JSON.parse(jsonString); 


let fs = require('fs');
let dirPath = path.join(__dirname,'folder');
let filePath = path.join(dirPath,'text.txt');

//fs.mkdirSync(dirPath);

fs.writeFileSync(filePath,odj);
console.log(dirPath,filePath);

    //второй способ считывания файла
/*
let buffer = fs.readFileSync(filePath);
let text = Buffer.from(buffer);
console.log(text.toString());
*/
        //простой способ
        /*
let text = fs.readFileSync(filePath, 'utf-8');
console.log(text);
*/


const http = require('http')
const path = require ('path');
const fs = require( 'fs');

let indexPage = fs.readFileSync(path.join (__dirname, 'index.html'));
let errorPage = fs.readFileSync(path.join (__dirname, 'error.html'));
let easterEgg = fs.readFileSync(path.join(__dirname,'easterEgg.html'));



let server = http.createServer (function(request, response) {
   function getTime() {
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    console.log(time + "  [ " + request.url,  searchParams.get('author'), searchParams.get('content') + " ]" );
  }
  
    //getTime();


    if(request.url == "/easterEgg" ){
        response.writeHead (200, {'Content-Type': 'text/html'});
        getTime();
        response.end(easterEgg);
    }

    else if (request.url == '/') {
        response.writeHead (200, {'Content-Type': 'text/html'});
        response.end(indexPage);
    }
    else if (request.url == '/add' && request.method == 'POST') {
    let data = ''
    request.on('data', function (chunk) {
        data += chunk;
    });
    request.on('end', function () {
        searchParams = new URLSearchParams (data)
        
        console.log(searchParams.get('author'));//RoboCat
        //console.log(searchParams.get('content'));
        if(searchParams.get('author') == 'navi' ){
            response.writeHead(302,{'Location':'easterEgg'});
            response.end();
            
        }else{
        response.writeHead (302, {'Location': '/'});
        response.end();
        }
    });
}
else {
    response.writeHead(404);
    response.end(errorPage);
}
});

server.listen(5050);



