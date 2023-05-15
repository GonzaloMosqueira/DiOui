// Arreglo para almacenar los artículos en el carrito
const carrito = [];

// Función para agregar un artículo al carrito
function agregarAlCarrito(nombre, precio) {
  // Buscamos el artículo en el carrito
  let articulo = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) {
      articulo = carrito[i];
      break;
    }
  }
  // Si el artículo ya está en el carrito, aumentamos la cantidad
  if (articulo !== null) {
    articulo.cantidad++;
  } else {
    // Si no está en el carrito, lo agregamos
    articulo = {
      nombre: nombre,
      precio: precio,
      cantidad: 1
    };
    carrito.push(articulo);
  }
  // Actualizamos la UI del carrito
  actualizarCarrito();
}

// Función para eliminar un artículo del carrito
function eliminarDelCarrito(nombre) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre === nombre) {
      if (carrito[i].cantidad > 1) {
        carrito[i].cantidad--;
      } else {
        carrito.splice(i, 1);
      }
      break;
    }
  }
  actualizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
  // Abrir la página de pago en una nueva pestaña o ventana
  window.open("https://mpago.la/2miBUwR", "_blank");
  carrito.length = 0; // Vaciar el carrito después de finalizar la compra
  actualizarCarrito();
}


// Función para actualizar la UI del carrito
function actualizarCarrito() {
  // Buscamos los elementos del DOM relevantes
  const mensajeCarrito = document.getElementById("mensajeCarrito");
  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarrito = document.getElementById("totalCarrito");

  // Limpiamos la lista del carrito
  listaCarrito.innerHTML = "";

  // Si el carrito está vacío, mostramos un mensaje
  if (carrito.length === 0) {
    mensajeCarrito.innerText = "No hay artículos en el carrito";
    totalCarrito.innerText = "0";
    return;
  }

  // Mostramos los artículos del carrito
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    const articulo = carrito[i];
    const li = document.createElement("li");
    li.innerText = `${articulo.nombre} x ${articulo.cantidad} - $${articulo.precio * articulo.cantidad}`;
    listaCarrito.appendChild(li);
    total += articulo.precio * articulo.cantidad;
  }

  // Mostramos el total del carrito
  totalCarrito.innerText = total;
}
