const socket = io()

//Formulario

const productForm = document.querySelector('#productForm');
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productUrl = document.querySelector('#productUrl');
const productPool = document.querySelector('#productPool');

//Productos
productForm.addEventListener('submit', event => {
    event.preventDefault
    const title = productName.value
    const price = productPrice.value
    const thumbnail = productUrl.value
    
    socket.emit('cliente:producto', { title, price, thumbnail })
})


async function renderProducts(productos) {

    const contenido = await fetch('./productos.hbs')
    const plantilla = await contenido.text()
    
    
    productos.forEach(product => {
        const template = Handlebars.compile(plantilla)
        const html = template(product)
        productPool.innerHTML += html
    })
}

socket.on('server:productos', productos => {
    renderProducts(productos)
})