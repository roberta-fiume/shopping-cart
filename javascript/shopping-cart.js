window.addEventListener('load', function() {
  
   var products = [
     {image: "img/img1.jpg", name: "Embellished T-Bar Wedge Sandals", price: "15£", size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img2.jpg", name: "Ankle Black Boots", price: "25£",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img3.jpg", name: "Overknee Heels Sandals", price: "39.90",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img4.jpg", name: "Flowers Flats", price: "25£",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img5.jpg", name: "Ankle Beige Boots", price: "33.99£",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img6.jpg", name: "Elegant Black Man-Style Shoes", price: "35.90£",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img7.jpg", name: "Classic Heels Decoltee", price: "27.99£",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
     {image: "img/img8.jpg", name: "Blue Rain Boots", price: "30.99£",  size: ["------","UK 3", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7", "UK 7.5", "UK 8", "UK 8.5"], quantity: [0,1,2,3,4]},
   ]

   var productImg = document.getElementsByClassName('img-details');

   for (var i = 0; i < productImg.length; i++) {
      productImg[i].setAttribute("src", products[i].image);
   }
   
  
   var productName = document.getElementsByClassName('name-product'); 
  
   for (var i = 0; i < productName.length; i++) {
       productName[i].innerHTML = products[i].name;
   }
   
   var productPrice = document.getElementsByClassName('price'); 
  
   for (var i = 0; i < productPrice.length; i++) {
     productPrice[i].innerHTML = products[i].price;
   }
  
   var quantity = document.getElementsByClassName('label-quantity');
  
  
 // CREATE OPTIONS-SIZES
   var selectSize = document.getElementsByName("options-sizes");
  
   function createSizes() {
     for (var i = 0; i < selectSize.length; i++) {
       createSizes(products[i].size, selectSize[i]);
     }
    
     function createSizes(sizes, select) {   
       for(var i = 0; i < sizes.length; i++) {
         var optionSize = document.createElement("option");
         optionSize.text = sizes[i];
         select.add(optionSize);
       }
     }
   }
  
   createSizes();
  
  
 // CREATE OPTIONS-QUANTITIES
   var allSelects = document.getElementsByName("select-quantity");
  
   function createQuantities() {
     for(var i = 0; i < allSelects.length; i++) {
       createOptions(products[i].quantity, allSelects[i]);
     }
    
     function createOptions(quantities, select) {   
       for(var i = 0; i < quantities.length; i++) {
         var option = document.createElement("option");
         option.text = quantities[i];
         select.add(option);
       }
     }
   }
  
   createQuantities();
  
  
   // ADD TO BASKET 
   var naughtyButt = document.getElementsByClassName('button');
    
    function createFunc(productId) {
      return function() { 
          addToBasket(productId);
      };
    }
     
    for (var i = 0; i < naughtyButt.length; i++) {
        var productId = naughtyButt[i].parentElement.id;        
        naughtyButt[i].addEventListener('click', createFunc(productId));  
    }
      
    var basket = [];
       
    function addToBasket(productId) {    
        var productDiv = document.getElementById(productId);
        var productImg = productDiv.getElementsByClassName("div-img")[0].getElementsByTagName('img')[0].getAttribute("src");
        var productName = productDiv.getElementsByClassName("div-name")[0].getElementsByTagName("p")[0].innerHTML;
        var productPrice = productDiv.getElementsByClassName("div-price")[0].getElementsByTagName("p")[0].innerHTML;
        var sizeSelect = productDiv.getElementsByClassName("sizes")[0];
        var productSize = sizeSelect.options[sizeSelect.selectedIndex].text;
        var quantitySelect = productDiv.getElementsByClassName("options-quantities")[0];
        var productQuantity = quantitySelect.options[quantitySelect.selectedIndex].text;
        var product = createProduct(productImg, productName, productPrice, productSize, productQuantity);
        addCreatedProductToBasket(product);
        storeBasketInBrowser(basket);
        displayTotal(basket);
    }

    function convertPriceToNumber(priceString) {
      var slicedPrice = priceString.slice(0, -1);
      return Number(slicedPrice);
    }
   
    function convertQuantityToNumber(quantityString) {
      if(quantityString) {
          return Number(quantityString);
      } else {
          return 0;
      }
    }
   
    function totalPriceForProduct(product) {
      total = convertPriceToNumber(product.price) * convertQuantityToNumber(product.quantity);    
      return total;
    }

    function basketTotal(basket) {
      var total = 0;
      
      basket.forEach(function(product){
         total += totalPriceForProduct(product);
      });

     return total;
    }
  
    function displayTotal() {
      var total = basketTotal(basket);
      storeTotalInBrowser(total); 
      var displayElement = document.getElementById("basket-total")
      displayElement.innerHTML = total + "£";
    }
    
    function createProduct(selectedImg, selectedName, selectedPrice, selectedSize, selectedQuantity) {
        var product1 = {"image": selectedImg, "name": selectedName, "price": selectedPrice, "size": selectedSize, "quantity": selectedQuantity};
        return product1;  
    }
       
    function addCreatedProductToBasket(createdProduct) {
        basket.push(createdProduct);
        totalProductsInBasket(basket);
    }
  
    function totalProductsInBasket(length) {
      var ulJavas = document.getElementById('ulForIcon');
      ulJavas.getElementsByClassName('first-list')[1].getElementsByTagName("p")[0].innerHTML = basket.length;
      return basket.length;
    }
  
    function storeBasketInBrowser(basket) {
      var basketString = convertProductToString(basket);
      sessionStorage.setItem('basket', basketString); 
    }
  
    function convertProductToString(product) {
       var productString = JSON.stringify(product);
       return productString;
    }

    function storeTotalInBrowser(total) {
      sessionStorage.setItem('total', total);
    }
        
})