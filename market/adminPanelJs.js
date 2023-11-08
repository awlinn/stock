const body = document.getElementById("body");
//login element
const loginString = document.getElementById("login");
const passwordString = document.getElementById("password");
const buttonLogin = document.getElementById("myButton");

const orderDiv = document.getElementById("orderDiv");
//login and password
let login = null;
let password = null;
//formation of xml object                                         ////orders 
let adminLog = new XMLHttpRequest();
adminLog.withCredentials = false;
adminLog.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);

    //get data on server and write is variables
    inputDat = JSON.parse(this.response);
    login = inputDat[0].login;
    password = inputDat[0].password;

    passwordString.addEventListener("keypress", function(event) {
      if(event.keyCode === 13) {  
        checkLogin();
      }
    });

    loginString.addEventListener("keypress", function(event) {
      if(event.keyCode === 13) {        
        checkLogin();
      }
    });

    buttonLogin.addEventListener("click", function() {
      checkLogin();
    });
  }
});
adminLog.open("GET","https://robocodemarketplace-bec8.restdb.io/rest/admin-password");
adminLog.setRequestHeader("content-type", "application/json");
adminLog.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
adminLog.setRequestHeader("cache-control", "no-cache");
adminLog.send();

function checkLogin() {
  if(login == null || password == null || login == undefined || password == undefined){
    alert("please wait receiving data");
  }
  else if(loginString.value == login && passwordString.value == password) {
    body.classList.remove("bodyCenter");
    logIn.style.display = "none";
    main.style.display = "grid";
  }else{
    alert("uncorrected password");
  }
}
function getOrdersFunction() {  ///getOrdersFunction
  
  let getOrders = new XMLHttpRequest();
  getOrders.withCredentials = false;
  getOrders.addEventListener("readystatechange", function () {
  if (this.readyState === 4) { 
    orderDiv.innerHTML = "";
    let inputDat = JSON.parse(this.responseText);
    //console.log(inputDat);

    for(let i = 0; inputDat.length > i; i++){   //for create block
      orderDiv.innerHTML += `
      <div class="tile" id="title${i}">
        <h2>Order: ${inputDat[i]._id}</h2>
        <p class="statusText">Status: ${inputDat[i].status}</p>
        <p>address: ${inputDat[i].address}</p>
        <p>phone: ${inputDat[i].phone}</p>
        <p>post office number: ${inputDat[i].post_number}</p>
      </div>`;

      let title = document.getElementById(`title${i}`);
      if(inputDat[i].products.length > 1){
        for(let y = 0;inputDat[i].products.length > y; y++){
          title.innerHTML += `<p class="productsText">product: ${inputDat[i].products[y].name}</p>`
        }
      }
      else{
        title.innerHTML += `<p class="productsText">product: ${inputDat[i].products[0].name}, </p>`
      }
      title.innerHTML += `
      <p>price: ${inputDat[i].price}</p>
      <button id="buttonProcessing${i}" data-hash="${inputDat[i]._id}" onclick="orderProcessing(this)">Order Processing</button>
      <button id="buttonDeleteElement${i}" data-hash="${inputDat[i]._id}" onclick="orderDelete(this)">Delete element</button>`
    }
    }
});
getOrders.open("GET","https://robocodemarketplace-bec8.restdb.io/rest/orders");
getOrders.setRequestHeader("content-type", "application/json");
getOrders.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
getOrders.setRequestHeader("cache-control", "no-cache");
getOrders.send();
}
getOrdersFunction();

function orderProcessing(obj){
  let myObj = document.getElementById(obj.id);
  let newStatus = JSON.stringify({
    "status":"Order being processed"
  });
  
  let updateElement = new XMLHttpRequest();
  updateElement.withCredentials = false;
  updateElement.addEventListener("readystatechange", function(){
    if (this.readyState === 4) {
      //console.log(this.responseText);
    }
  });
  
  updateElement.open("PUT", `https://robocodemarketplace-bec8.restdb.io/rest/orders/${myObj.dataset.hash}`);
  updateElement.setRequestHeader("content-type", "application/json");
  updateElement.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
  updateElement.setRequestHeader("cache-control", "no-cache");

  updateElement.send(newStatus);
  getOrdersFunction();
}

function orderDelete(obj) {
  let data = null;
  let myObj = document.getElementById(obj.id);

  let deletElement = new XMLHttpRequest();
  deletElement.withCredentials = false;

  deletElement.addEventListener("readystatechange", function(){
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  deletElement.open("DELETE", `https://robocodemarketplace-bec8.restdb.io/rest/orders/${myObj.dataset.hash}`);
  deletElement.setRequestHeader("content-type", "application/json");
  deletElement.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
  deletElement.setRequestHeader("cache-control", "no-cache");

  deletElement.send(data);  
  getOrdersFunction();
}
                      ////orders end
//button
const buttonPost = document.getElementById("sendNewElement");
let productTitle,price,imgUrl,description;

buttonPost.addEventListener("click", function() {
  //get send bar elements
   productTitle = document.getElementById("productTitle").value;
   price = document.getElementById("price").value;
   imgUrl = document.getElementById("imgUrl").value;
   description = document.getElementById("description").value;
 
 // console.log(productTitle,description,imgUrl,price)
  addNewElementInCatalog();
});


function addNewElementInCatalog() {  //function
  let data = JSON.stringify({
    "name":productTitle,
    "description":description,
    "photo_url":imgUrl,
    "price":price
  });
  
  let addElement = new XMLHttpRequest();
  addElement.withCredentials = false;
  
  addElement.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      alert("element already created");
    }
  });
  
  addElement.open("POST", "https://robocodemarketplace-bec8.restdb.io/rest/product");
  addElement.setRequestHeader("content-type", "application/json");
  addElement.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
  addElement.setRequestHeader("cache-control", "no-cache");
  
  addElement.send(data);

}


