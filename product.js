let cartItem = [];
let cartCount;
if(localStorage.getItem("cart-count") === null)
    localStorage.setItem("cart-count","0");
if(localStorage.getItem("cart-item") === null)
    localStorage.setItem("cart-item",JSON.stringify(cartItem));
cartCount = Number(localStorage.getItem("cart-count"));
let setCartCount = document.getElementById("cart-count");
setCartCount.innerHTML = cartCount;

let id = Number(new URLSearchParams(window.location.search).get("product_id"));
if (cartCount === undefined) {
  cartCount = 0;
}
let cart = document.getElementById("cart-count");
cart.innerText = cartCount;
$(() => {
  $.get(
    `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`,
    function (productList) {
      $("#product-image").append(
        `<img class="product-img"src = ${productList.preview}>`
      );
      $("#product-detail").append(`<div id = product-description>
        <h1>${productList.name}</h1>
        <h4>${productList.brand}</h4>
        <h3>Price: Rs <span>${productList.price}</span></h4>
        <div id = description>
        <h3>Description</h3>
        <p>${productList.description}</p>
        </div>
        <div id = product-preview>
        <h3>Product preview</h3>
        </div>
        <div id = preview-image></div>
        </div>
        <div id = btn>
        <button id = add-to-cart>Add to Cart</button>
        </div>`);
      let temp = 0;
      for (let i of productList.photos) {
        $("#preview-image").append(
          `<img src = ${i} id = img${temp++} class = prev-img></img>`
        );
      }
      $(".prev-img:first").addClass("active");
      for (let i = 0; i < productList.photos.length; ++i) {
        $(".prev-img")
          .eq(i)
          .click(function () {
            $(".active:first").removeClass("active");
            $(this).addClass("active");
            $("#product-image img").attr("src", productList.photos[i]);
          });
      }
      let tempCart = {
        id: String(id),
        name: `${productList.name}`,
        count: 1,
        amount: `${productList.price}`,
        preview: `${productList.preview}`,
      };
      let tempCount = localStorage.getItem("cart-count");
      $("#add-to-cart").click(function () {
        var flag = 1;
        setCartCount.innerHTML = ++tempCount;
        localStorage.setItem("cart-count", `${tempCount}`);
        cartItem = JSON.parse(localStorage.getItem("cart-item"));
        if (cartItem[0] === undefined) {
          cartItem.push(tempCart);
        } else {
          for (var i = 0; i < cartItem.length; ++i) {
            if (cartItem[i].id === String(id)) {
              cartItem[i].count++;
              flag = 1;
              break;
            } else {
              flag = 0;
            }
          }
          if (flag === 0) {
            cartItem.push(tempCart);
          }
        }
        localStorage.setItem("cart-item", JSON.stringify(cartItem));
      });
    }
  );
});

let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
})

const mainImg = document.getElementById("main-img");
const slideImg = document.querySelectorAll(".prev-img");

let activeImgSlide = 0
slideImg.forEach((item, i) => {
  item.addEventListener("click", () => {
   slideImg[activeImgSlide].classList.remove('active');
    item.classList.add('active');
    mainImg.style.backgroundImage = `url('${item.src}')`;
    activeImgSlide = i;
  })
})

slideImg[0].onclick = function(){
  mainImg.src = slideImg[0].src;
}
slideImg[1].onclick = function(){
  mainImg.src = slideImg[1].src;
}
slideImg[2].onclick = function(){
  mainImg.src = slideImg[2].src;
}
slideImg[3].onclick = function(){
  mainImg.src = slideImg[3].src;
}
slideImg[4].onclick = function(){
  mainImg.src = slideImg[4].src;
}

let carts = document.querySelectorAll("#add-to-cart");

for (let i=0; i<carts.length; i++){
  carts[i].addEventListener("click", () =>{
    cartNumbers()
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  
  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  
  if(productNumbers){
     localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  }else {
     localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
}

onLoadCartNumbers()
