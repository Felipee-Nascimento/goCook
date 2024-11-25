document.addEventListener("DOMContentLoaded", () => {
  const productDetailContainer = document.getElementById(
    "product-detail-container"
  );
  const reviewsContainer = document.getElementById("reviews-container");
  const id = new URLSearchParams(window.location.search).get("id");

  async function fetchProductDetails(productId) {
    try {
      const productResponse = await fetch(
        `http://localhost:3000/product/${productId}`
      );
      const reviewResponse = await fetch(
        `http://localhost:3000/products/${productId}/reviews`
      );

      if (!productResponse.ok || !reviewResponse.ok) {
        throw new Error("Erro ao buscar detalhes do produto.");
      }

      const productData = await productResponse.json();
      const reviewsData = await reviewResponse.json();

      renderProductDetails(productData);
      renderReviews(reviewsData);
    } catch (error) {
      productDetailContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
  }

  function renderProductDetails(product) {
    productDetailContainer.innerHTML = `
        <img class="product-image" src="http://localhost:3000${
          product.image_url
        }" alt="${product.title}">
        <div class="product-info">
          <h1 class="product-title">${product.title}</h1>
          <p class="product-desc">${product.desc}</p>
          <p class="product-price">
            R$ ${product.price.toFixed(
              2
            )} <span class="unit-text">(por unidade)</span>
          </p>
          <button class="add-to-cart-button" onclick="addToCart(${
            product.id
          })">Adicionar ao Carrinho</button>
        </div>
      `;
  }

  function renderReviews(reviews) {
    reviewsContainer.innerHTML = `
        <h2>Deixe sua avaliação</h2>
        <ul>
          ${reviews
            .map(
              (review) =>
                `<li>${review.comment} - ${"⭐".repeat(review.rating)}</li>`
            )
            .join("")}
        </ul>
      `;
  }

  window.addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Erro ao adicionar ao carrinho.");
      alert("Produto adicionado ao carrinho!");
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  fetchProductDetails(id);
});
