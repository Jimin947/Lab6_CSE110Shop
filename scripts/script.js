// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  let myStorage = window.localStorage;

  let cart = 0;
  if(myStorage.getItem('cart')!=null){
    cart = myStorage.getItem('cart');
    document.getElementById("cart-count").innerHTML = cart;
  }

  if(myStorage.getItem("list") == null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      myStorage.setItem('list', JSON.stringify(data));
      const loop = JSON.parse(myStorage.getItem('list'));
      for(let i = 0; i < loop.length; i++) {
        let product = document.createElement('product-item');
        product.className = 'product';
        var shad = product.shadowRoot;

        shad.querySelector('.title').textContent = loop[i].title;
        shad.querySelector('.price').textContent = '$' + loop[i].price;
        shad.querySelector('img').src = loop[i].image;
        shad.querySelector('img').alt = loop[i].title;
        shad.querySelector('button').id = i;

        shad.querySelector('button').setAttribute('add',false);

        if(localStorage.getItem(i)) {
          shad.querySelector('button').setAttribute('add', true);
          shad.querySelector('button').textContent = 'Remove From Cart';
        }

        shad.querySelector('button').onclick = function(){ 
          add(this)
        }
        document.getElementById('product-list').appendChild(item);
      }
    });
  } else {
    const loop = JSON.parse(myStorage.getItem('list'));
      for(let i = 0; i < loop.length; i++) {
        let product = document.createElement('product-item');
        var shad = product.shadowRoot;

        shad.querySelector('.title').textContent = loop[i].title;
        shad.querySelector('.price').textContent = '$' + loop[i].price;
        shad.querySelector('img').src = loop[i].image;
        shad.querySelector('img').alt = loop[i].title;
        shad.querySelector('button').id = i;

        shad.querySelector('button').setAttribute('add',false);

        if(localStorage.getItem(i)) {
          shad.querySelector('button').setAttribute('add', true);
          shad.querySelector('button').textContent = 'Remove From Cart';
        }

        shad.querySelector('button').onclick = function(){ 
          add(this) 
        }
        document.getElementById('product-list').appendChild(product);
      }
  }
  
  function add(e) {
    if(e.getAttribute('add')== 'false'){
      cart = cart + 1;
      myStorage.setItem('cart',cart);
      document.getElementById('cart-count').innerHTML = cart;
      
      e.textContent = 'Remove from Cart';
      e.setAttribute('add',true);
      myStorage.setItem(e.id,'added');
      alert ('Added to Cart!');
    }
    else if(e.getAttribute('add')== 'true'){
      cart = cart - 1;
      myStorage.setItem('cart',cart);
      e.textContent = 'Add to Cart';
      document.getElementById('cart-count').innerHTML = cart;
      
      myStorage.removeItem(e.id);
      e.setAttribute('add',false);
      alert ('Removed from Cart!');
    }
  }
});

