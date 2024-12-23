const products = Array(20).fill().map((_, i) => ({
    model: `City Car ${i + 1}`,
    img: "assets/IMG/city-car.png",
  }));
  
  let currentPage = 1;
  const productsPerPage = 6;
  
  function renderProducts() {
    const productGrid = document.querySelector(".main");
    productGrid.innerHTML = "";
  
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);
  
    paginatedProducts.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
        <img src="${product.img}" alt="${product.model}">
        <p>Model: ${product.model}</p>
        <button>Ver más</button>
      `;
      productGrid.appendChild(productElement);
    });
  }
  
  document.querySelectorAll(".page-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      currentPage = parseInt(e.target.dataset.page);
      renderProducts();
    });
  });
  
  // Inicializar los productos
  renderProducts();
  