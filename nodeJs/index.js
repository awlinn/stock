/*

https://github.com/blacksempai/robojoke-website-example/blob/main/background.jpg?raw=true

https://raw.githubusercontent.com/blacksempai/robojoke-website-example/e7ae56742ea193f552d3e29227e563f87b0d248e/header.svg

https://github.com/blacksempai/robojoke-website-example/blob/main/logo.png?raw=true

https://raw.githubusercontent.com/blacksempai/robojoke-website-example/e7ae56742ea193f552d3e29227e563f87b0d248e/main.svg

*/ 

const http = require('http')
const path = require('path');
const fs = require('fs');

let indexPage = fs.readFileSync(path.join (__dirname, 'index.html'));
let errorPage = fs.readFileSync(path.join (__dirname, 'error.html'));

/*
let buttonGet = document.getElementById("buttonGet");
console.log(buttonGet);
*/
//const outDataJoks = document.getElementById("outDataJoks");

let dataArr = fs.readdirSync("data");
console.log("length:  " + dataArr.length);

let jsonArr = [];


function getAllJokes(request, response) {
    jsonArr = [];

    for(let i = 0; i < dataArr.length; i++){
        
        let elementRead = fs.readFileSync("data/" + dataArr[i]);
        
        let bufferData = Buffer.from(elementRead);
        let elementWrite = JSON.parse(bufferData);
        
        jsonArr.push(elementWrite);
    };
    response.end(JSON.stringify(jsonArr));
    console.log("jokes has sending", jsonArr);
};

function postNewJoke(request, response) {

    let data = '';
    request.on('data', function (chunk) {
        data += chunk;

    });
    request.on('end', function () {
   
       const objNewJoke = {
            content: data,
            like: 0,
            dislike: 0
        };
        const jsonData = JSON.stringify(objNewJoke,null,1);
        let namberName = dataArr.length + 1;
        const filePath = `data/joke${namberName}.json`;
        fs.writeFileSync(filePath, jsonData);
    });
    console.log("jokes has posting")
}

function like(request, response){
    let url = require('url');
    let params = url.parse(request.url, true).query;
    const filePath = `data/joke${params.id}.json`;

    let elementRead = fs.readFileSync(filePath, "utf-8"); 
    let elementWrite = JSON.parse(elementRead);
    elementWrite.like ++;

    fs.writeFileSync(filePath, JSON.stringify(elementWrite,null,2));
    console.log("jokes has liking");
}

function dis(request, response) {
    let url = require('url');
    let params = url.parse(request.url, true).query;
    const filePath = `data/joke${params.id}.json`;

    let elementRead = fs.readFileSync(filePath, "utf-8"); 
    let elementWrite = JSON.parse(elementRead);
    elementWrite.dis ++;

    fs.writeFileSync(filePath, JSON.stringify(elementWrite,null,2));
    console.log("jokes has disLiking")
}

const server = http.createServer((request, response)=> {
    if(request.url == '/' ) {
        response.end(indexPage);
    }
    else if(request.url == '/jokes' && request.method == 'GET') {
        getAllJokes(request, response);
    }else if(request.url == '/jokesPost' && request.method == 'POST'){
        postNewJoke(request, response);
    }
    else if(request.url.startsWith("/like") && request.method == 'GET'){
        like(request, response);
    }
    else if(request.url.startsWith("/dis") && request.method == 'GET'){
        dis(request, response);
    }
});
server.listen(5050);



