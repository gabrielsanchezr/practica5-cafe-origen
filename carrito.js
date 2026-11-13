// carrito.js — Café Origen

// ---------- Lógica del carrito (funciones puras, sin tocar el DOM) ----------

function calcularSubtotal(item) {
  return item.precio * item.cantidad;
}

function calcularTotal(carrito) {
  return carrito.reduce((acumulado, item) => acumulado + calcularSubtotal(item), 0);
}

function agregarProducto(carrito, catalogo, id) {
  const enCarrito = carrito.find((p) => p.id === id);
  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    const producto = catalogo.find((p) => p.id === id);
    if (producto) {
      carrito.push({ ...producto, cantidad: 1 });
    }
  }
  return carrito;
}

function aumentarCantidad(carrito, id) {
  const item = carrito.find((p) => p.id === id);
  if (item) item.cantidad++;
  return carrito;
}

function disminuirCantidad(carrito, id) {
  const item = carrito.find((p) => p.id === id);
  if (item && item.cantidad > 1) item.cantidad--;
  return carrito;
}

function eliminarProducto(carrito, id) {
  return carrito.filter((p) => p.id !== id);
}

// Para poder probar estas funciones con Node sin necesitar un navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calcularSubtotal,
    calcularTotal,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
  };
}

// ---------- Interfaz (solo corre dentro del navegador) ----------

if (typeof document !== 'undefined') {
  const catalogo = [
    { id: 1, nombre: 'Espresso', precio: 35 },
    { id: 2, nombre: 'Latte de vainilla', precio: 48 },
    { id: 3, nombre: 'Cold brew', precio: 52 },
  ];

  let carrito = [];
  let descuentoAplicado = false;

  function renderizarCatalogo() {
    const cont = document.getElementById('catalogo');
    cont.innerHTML = '';
    catalogo.forEach((producto) => {
      const row = document.createElement('div');
      row.className = 'producto';
      row.innerHTML = `
        <span>${producto.nombre} — $${producto.precio}</span>
        <button data-id="${producto.id}" class="btn-agregar">Agregar</button>
      `;
      cont.appendChild(row);
    });
  }

  function renderizarCarrito() {
    const cont = document.getElementById('lista-carrito');
    if (carrito.length === 0) {
      cont.innerHTML = '<p class="vacio">Tu carrito está vacío.</p>';
      return;
    }
    cont.innerHTML = '';
    carrito.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'item';
      row.innerHTML = `
        <span>${item.nombre}</span>
        <button data-id="${item.id}" data-accion="menos">-</button>
        <span>${item.cantidad}</span>
        <button data-id="${item.id}" data-accion="mas">+</button>
        <span>$${calcularSubtotal(item)}</span>
        <button data-id="${item.id}" data-accion="eliminar" class="eliminar">Eliminar</button>
      `;
      cont.appendChild(row);
    });
  }

  function actualizarTotal() {
    document.getElementById('total').textContent = '$' + calcularTotal(carrito);
  }

  document.getElementById('catalogo').addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-agregar')) return;
    const id = Number(e.target.dataset.id);
    agregarProducto(carrito, catalogo, id);
    renderizarCarrito();
    actualizarTotal();
  });

  document.getElementById('lista-carrito').addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    const accion = e.target.dataset.accion;
    if (!accion) return;

    if (accion === 'mas') {
      aumentarCantidad(carrito, id);
      renderizarCarrito();
      actualizarTotal();
    } else if (accion === 'menos') {
      disminuirCantidad(carrito, id);
      renderizarCarrito();
      actualizarTotal();
    } else if (accion === 'eliminar') {
      carrito = eliminarProducto(carrito, id);
      renderizarCarrito();
      actualizarTotal();
    }
  });

  document.getElementById('btn-descuento').addEventListener('click', () => {
    const codigo = document.getElementById('codigo-descuento').value.trim().toUpperCase();
    const mensaje = document.getElementById('mensaje-descuento');

    if (codigo !== 'DESCUENTO10') {
      mensaje.textContent = 'Código no válido.';
      return;
    }

    if (carrito.length === 0) {
      mensaje.textContent = 'Agrega productos antes de aplicar el descuento.';
      return;
    }

    if (descuentoAplicado) {
      mensaje.textContent = 'El descuento ya fue aplicado.';
      return;
    }

    const totalActual = calcularTotal(carrito);
    const totalConDescuento = totalActual - totalActual * 0.1;
    document.getElementById('total').textContent = '$' + totalConDescuento.toFixed(2);
    mensaje.textContent = '¡Descuento aplicado!';
    descuentoAplicado = true;
  });

  renderizarCatalogo();
  renderizarCarrito();
  actualizarTotal();
}