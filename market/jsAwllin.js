let data = null;
const nameInput = document.getElementById("name");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("phone");
const postNumberInput = document.getElementById("post_number");
const sendDataBtn = document.getElementById("sendData");
let testString;


let xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {    //retrieving data from the server and further processing them

 inputDat = JSON.parse(this.response); 
 console.log(inputDat);
 let market = document.getElementById("market");

 for (let i = 0; i < inputDat.length; i++){     //cycle creating "tiles" on the market
     
     market.innerHTML += `
     <div class="module">
         <div class="product">
             <h2 id="ProductTitle${i}">*produkt*</h2>            
                 <img class="productImg" id="imgOut${i}"> 
             <div class="description">
                 <p id="Price${i}">Price: </p>
                 <p id="Description${i}">Description: </p>
                 <button id="buttonBuy${i}"  onclick="addInBasket(this)">Buy</button>
             </div>  
         </div>
     </div>`//mb add sellerProfil // <a href="" id="sellerProfil">seller profil</a>
 
     let ProductTitle = document.getElementById(`ProductTitle${i}`);
     let Price = document.getElementById(`Price${i}`);
     let Description = document.getElementById(`Description${i}`);
     let imgOut = document.getElementById(`imgOut${i}`);

     ProductTitle.innerHTML = inputDat[i].name;
     Price.innerHTML += inputDat[i].price + " $";
     Description.innerHTML += inputDat[i].description;
     imgOut.setAttribute("src", inputDat[i].photo_url);

    
 }
  }
});

xhr.open("GET", "https://robocodemarketplace-bec8.restdb.io/rest/product");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);

    

let basket = document.getElementById("inBasket");

let databaseArray = [];

let priceBasket = 0;
let button = document.getElementById('myButton');
let backgroundBasket = document.getElementById('basketDivId');
let clear = false;
let imgComplet;
let nameObj;
let priceObj;

function addInBasket(odj){            ////////////function addInBasket
  
  
    let objId = parsing(odj.id);
    
  
    priceObj = parsing(document.getElementById(`Price${objId}`).textContent);
    nameObj = document.getElementById(`ProductTitle${objId}`).textContent;
    let imgObj = document.getElementById(`imgOut${objId}`).src;
    imgComplet = `<img class="imgBasket" src="${imgObj}">`;

    priceBasket += priceObj;
    
    let databaseObj = {           ///////// creation database object
      price: priceObj,
      name: nameObj,
      img: imgComplet
    };

    databaseArray.push(databaseObj);

    backgroundBasket.classList.add('blink');
  setTimeout(() => {
    backgroundBasket.classList.remove('blink'); 
  }, 1000); 
  
  updateDiv(objId);
  openBuyMenu();
}


function updateDiv(idElement) {   
  basket.innerHTML = "";
  for(let i = 0; i < databaseArray.length; i++){
    basket.innerHTML += `<p> ${databaseArray[i].img}${databaseArray[i].name}|${databaseArray[i].price}$</p>`;
  }
  basket.innerHTML += `<p class="priceBasketText">Price basket: ${priceBasket}$</p> 
  <button class="buttonBuy" id="buttonBuyID">go to buy</button>`;
}


function parsing(obj){
  return(parseInt(obj.match(/\d+/)))    //parsing object and serching number
}


let cartBasket = document.getElementById("cartBasket");
cartBasket.style.display = "none";

function openBasket() {
  
  if (cartBasket.style.display === "none") {
    cartBasket.style.display = "block";
    
  } else {
    cartBasket.style.display = "none";
  }
}

    let popup = document.querySelector('.popup');
		let overlay = document.querySelector('.overlay');
		let popupBtn = document.getElementById('buttonBuyID'); 
  
    function openBuyMenu(){

      popup = document.querySelector('.popup');
		  overlay = document.querySelector('.overlay');
		    popupBtn = document.getElementById('buttonBuyID');
		popupBtn.addEventListener('click', () => {
			popup.style.display = 'block';
			overlay.style.display = 'block';
      
		});

		overlay.addEventListener('click', () => {
			popup.style.display = 'none';
			overlay.style.display = 'none';
      if (cartBasket.style.display === "none") {
        cartBasket.style.display = "block";
      } else {
        cartBasket.style.display = "none";
      }
		});
    
  }
  sendDataBtn.addEventListener('click', function(e){
    let qwe = new XMLHttpRequest();
    qwe.withCredentials = false;
    qwe.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //console.log(this.responseText);
      }
    });
    qwe.open("POST","https://robocodemarketplace-bec8.restdb.io/rest/orders");
    qwe.setRequestHeader("content-type", "application/json");
    qwe.setRequestHeader("x-apikey", "64149cd5bc22d22cf7b2600f");
    qwe.setRequestHeader("cache-control", "no-cache");
  
      basket.innerHTML = "<p class='emptyCartText'>Cart is empty</p>";
      popup.style.display = 'none';
			overlay.style.display = 'none';

      data = JSON.stringify({
        "name": nameInput.value,
        "address":addressInput.value,
        "phone":phoneInput.value,
        "post_number":postNumberInput.value,
        "status":"new",
        "products":databaseArray,
        "price":priceBasket
      });

     
      qwe.send(data);

      nameInput.value = "";
      addressInput.value = "";
      phoneInput.value = "";
      postNumberInput.value = "";
      priceBasket = 0;
      databaseArray = [];
  });
  

 