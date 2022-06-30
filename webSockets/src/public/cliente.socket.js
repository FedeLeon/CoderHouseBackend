const socket = io()

//Formulario

const productForm = document.querySelector('#productForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productUrl = document.querySelector('#productUrl');
const productPool = document.querySelector('#productPool');

productForm.addEventListener('submit', event => {
    event.preventDefault
    const name = productName.value
    const price = productPrice.value
    const thumbnail = productUrl
    
    socket.emit('cliente:producto', { name, price, thumbnail })
})

socket.on('server:producto', productoInfo => {
    productPool.innerHTML
})