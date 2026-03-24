const products = [

{
name:"Tarta de queso",
price:15,
image:"https://images.unsplash.com/photo-1559620192-032c4bc4674e"
},

{
name:"Croissant",
price:3,
image:"https://images.unsplash.com/photo-1509440159596-0249088772ff"
},

{
name:"Cupcake",
price:4,
image:"https://images.unsplash.com/photo-1486427944299-d1955d23e34d"
},

{
name:"Donut",
price:2,
image:"https://images.unsplash.com/photo-1551024601-bec78aea704b"
}

]

let cart = []

const grid = document.getElementById("productGrid")
const cartItems = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")

function renderProducts(){

grid.innerHTML=""

products.forEach((product,index)=>{

const card = document.createElement("div")

card.className="product-card"

card.innerHTML=`

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<span class="price">${product.price}€</span>

<button onclick="addToCart(${index})" class="btn btn-primary">
Add to Cart
</button>

</div>

`

grid.appendChild(card)

})

}

function addToCart(index){

const product = products[index]

const existing = cart.find(item=>item.name===product.name)

if(existing){

existing.qty++

}else{

cart.push({
name:product.name,
price:product.price,
qty:1
})

}

renderCart()

}

function renderCart(){

cartItems.innerHTML=""

let total = 0

cart.forEach(item=>{

const div = document.createElement("div")

div.innerHTML=`
${item.name} x${item.qty} - ${item.price*item.qty}€
`

cartItems.appendChild(div)

total += item.price*item.qty

})

cartTotal.innerText=total

}

document.getElementById("orderBtn").addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty")

return

}

let message="New Order:%0A%0A"

let total=0

cart.forEach(item=>{

message += `${item.name} x${item.qty} - ${item.price*item.qty}€%0A`

total += item.price*item.qty

})

message += `%0ATotal: ${total}€`

const phone="34600000000"

const url=`https://wa.me/${phone}?text=${message}`

window.open(url)

})

renderProducts()
const productSelect = document.getElementById("productSelect")
const quantityInput = document.getElementById("quantity")
const totalPrice = document.getElementById("totalPrice")
const orderForm = document.getElementById("orderForm")

// Cargar productos en el select
function loadProductsToSelect() {
    products.forEach((product, index) => {
        const option = document.createElement("option")
        option.value = index
        option.textContent = `${product.name} - ${product.price}€`
        productSelect.appendChild(option)
    })
}

loadProductsToSelect()

// Calcular precio
function updateTotal() {
    const index = productSelect.value
    const qty = quantityInput.value

    if (index !== "") {
        const product = products[index]
        const total = product.price * qty
        totalPrice.innerText = total + "€"
    }
}

productSelect.addEventListener("change", updateTotal)
quantityInput.addEventListener("input", updateTotal)

// Enviar pedido
orderForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const address = document.getElementById("address").value

    const index = productSelect.value
    const qty = quantityInput.value
    const product = products[index]

    let message = `Pedido:%0A`
    message += `Nombre: ${name}%0A`
    message += `Tel: ${phone}%0A`
    message += `Dirección: ${address}%0A%0A`
    message += `${product.name} x${qty} - ${product.price * qty}€`

    const url = `https://wa.me/34600000000?text=${message}`

    window.open(url)
})