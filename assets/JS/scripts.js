document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado correctamente.");

  // Control de la barra lateral (hamburger menu)
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");

  hamburgerMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Selección del carrito fijo
  const cartPopup = document.getElementById("cart-popup");
  const cartTotalDisplay = cartPopup.querySelector(".cart-total");

  // Variable global para el total del carrito
  let cartTotal = 0;

  // Persistencia del carrito (localStorage)
  const savedCartTotal = localStorage.getItem("cartTotal");
  if (savedCartTotal) {
    cartTotal = parseInt(savedCartTotal, 10);
    cartTotalDisplay.textContent = `$${cartTotal}`;
  }

  // Función para actualizar el carrito
  function updateCart(amount) {
    cartTotal += amount;

    // Validar que el total nunca sea negativo
    if (cartTotal < 0) {
      cartTotal = 0;
    }

    // Actualizar el contenido del carrito en el DOM
    cartTotalDisplay.textContent = `$${cartTotal}`;
    console.log(`Total actualizado en el carrito: ${cartTotal}`);

    // Guardar en localStorage
    localStorage.setItem("cartTotal", cartTotal);
  }

  // Configuración de las tarjetas de productos
  const products = document.querySelectorAll(".product");

  if (products.length === 0) {
    console.error("No se encontraron productos en la página.");
  }

  products.forEach((product, index) => {
    console.log(`Configurando tarjeta de producto #${index + 1}`);

    // Selección de botones y elementos en cada tarjeta
    const incrementBtn = product.querySelector(".increment");
    const decrementBtn = product.querySelector(".decrement");
    const quantityDisplay = product.querySelector(".quantity");
    const basePriceElement = product.querySelector(".base-price");

    if (!incrementBtn || !decrementBtn || !quantityDisplay || !basePriceElement) {
      console.error(`Faltan elementos en la tarjeta de producto #${index + 1}`);
      return;
    }

    const basePrice = parseInt(basePriceElement.dataset.price);

    // Validar que el precio base sea un número
    if (isNaN(basePrice)) {
      console.error(`El precio base no es válido en la tarjeta #${index + 1}`);
      return;
    }

    // Variable local para la cantidad del producto
    let quantity = 0;

    // Persistencia de cantidades (localStorage)
    const savedQuantity = localStorage.getItem(`product-${index + 1}-quantity`);
    if (savedQuantity) {
      quantity = parseInt(savedQuantity, 10);
      quantityDisplay.textContent = quantity;

      // Actualizar el carrito con las cantidades iniciales
      updateCart(quantity * basePrice);
    }

    // Función para actualizar la cantidad local
    function updateQuantity(change) {
      const newQuantity = quantity + change;

      // Validar que la cantidad no sea negativa
      if (newQuantity >= 0) {
        // Actualizar cantidad local
        quantity = newQuantity;
        quantityDisplay.textContent = quantity;

        // Actualizar el carrito
        updateCart(change * basePrice);

        // Guardar cantidad en localStorage
        localStorage.setItem(`product-${index + 1}-quantity`, quantity);

        console.log(
          `Producto #${index + 1} actualizado: Cantidad = ${quantity}, Total Carrito = ${cartTotal}`
        );
      } else {
        console.warn("La cantidad no puede ser negativa.");
      }
    }

    // Asociar eventos a los botones de incremento y decremento
    incrementBtn.addEventListener("click", () => {
      console.log(`Botón + clicado en producto #${index + 1}`);
      updateQuantity(1);
    });

    decrementBtn.addEventListener("click", () => {
      console.log(`Botón - clicado en producto #${index + 1}`);
      updateQuantity(-1);
    });
  });
});
