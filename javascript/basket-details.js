
window.addEventListener('load', function() {
     
    function getBasketFromStore() {
        var basketString = sessionStorage.getItem("basket");      
        var basket = JSON.parse(basketString);
        return basket;
    }

    function getTotalFromBrowser() {
        return sessionStorage.getItem('total');
    }

    function displayTotal() {
      var displayTotal = document.getElementById('products-cart');
      displayTotal.innerHTML = "£" + getTotalFromBrowser() ;
    }
    
    displayTotal();

    function displayBasket() {
        var basketFromStore = getBasketFromStore();
        var finalCart = [];
        for (var i = 0; i < basketFromStore.length; i++){
            var printedProducts = createHtmlForProduct(basketFromStore[i], i);
            finalCart.push(printedProducts);
        }
        return finalCart; 
    }
 
    function createHtmlForProduct(product, productName) { 
        var divButtons = document.createElement('div');
        divButtons.setAttribute("class", "div-buttons-js");
 
        var divRemove = document.createElement('div');
        divRemove.setAttribute("class", "div-remove-js");
        var textRemove = document.createTextNode("Remove" ); 
 
        var divBuy = document.createElement('div');
        divBuy.setAttribute("class", "div-buy-js");
        var textBuy= document.createTextNode("Buy" ); 
 
 
        var productDetails = document.createElement('div');
        productDetails.setAttribute("class", 'js-detailsBox');
 
        var divProduct = document.createElement('div');
        divProduct.setAttribute("class", 'details-box');
        divProduct.setAttribute("productId", "roberta es tonta"+ productName);
         
        var divImg = document.createElement('div');
        divImg.setAttribute("class", "div-js");
 
        var image = document.createElement("img");
        image.setAttribute("src", product.image);
        image.setAttribute("class", "img-js");
 
        var paragName = document.createElement("p");
        var textName = document.createTextNode("Name: " + product.name); 
        var paragPrice = document.createElement("p"); 
        var textPrice = document.createTextNode("Price: "+ product.price);
        var paragSize = document.createElement("p"); 
        var textSize = document.createTextNode("Size: " + product.size);
        var paragQuantity = document.createElement("p"); 
        var textQuantity = document.createTextNode("Quantity: " + product.quantity);
 
        paragName.appendChild(textName);  
        paragPrice.appendChild(textPrice); 
        paragSize.appendChild(textSize); 
        paragQuantity.appendChild(textQuantity); 
        var bigDiv = document.getElementById("img-basket");
 
        bigDiv.appendChild(divProduct);
            divProduct.appendChild(divImg);
            divImg.appendChild(image);
            divProduct.appendChild(productDetails);
            divProduct.appendChild(divButtons);
            divButtons.appendChild(divRemove);
            divButtons.appendChild(divRemove);
            divButtons.appendChild(divBuy);
            productDetails.appendChild(paragName);
            productDetails.appendChild(paragPrice);
            productDetails.appendChild(paragSize);
            productDetails.appendChild(paragQuantity);
            divRemove.appendChild(textRemove);
            divBuy.appendChild(textBuy);
    }
 
    displayBasket();   

    function removeProduct() {
        var removeButton = document.getElementsByClassName('div-remove-js');
        
        for (var i = 0; i < removeButton.length; i++) {
            removeButton[i].addEventListener('click', function(objectEvent) {
                var productHtml = removeProductFromHtml(objectEvent);
                var productName = getProductName(productHtml);
                var basket = removeProductFromBasket(productName);
                basketTotal(basket);
            }, false);
        }
    }

    function removeProductFromHtml(objectEvent) {
        var productHtml = objectEvent.currentTarget.parentNode.parentNode;
        productHtml.remove();
        return productHtml;
    }

    function getProductName(productHtml) {
        var productName = productHtml.getElementsByClassName("js-detailsBox")[0].getElementsByTagName('p')[0].innerHTML;
        var trimmedProductName = productName.replace('Name: ', '');
        return trimmedProductName;
    }

    removeProduct();

    function removeProductFromBasket(productName) {
        var basket = getBasketFromStore();
            for (var key in basket) {
                if(basket[key].name == productName) {
                   basket.splice(key, 1);
                } 
            }
        return basket; 
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
        console.log("totalforProduct", total);
        return total;
    }
  
    function basketTotal(basket) {
        console.log("basket", basket);
        var total = 0;
        basket.forEach(function(product){
           total += totalPriceForProduct(product);
        });
        console.log("TOTAL: ", total);
        var writeTotal = document.getElementById("products-cart");
        writeTotal.innerHTML = total;
       return total;
    }   
})