const products = [
  {
    id: 1,
    title: "Tricot Henley Noir",
    desc: "Tricot Henley en coton - Blanc / Noir",
    price: 179,
    oldPrice: null,
    rating: "4.9",
    image: "images/tricot-noir-2.jpg.HEIC"
  },
  {
    id: 2,
    title: "Tricot Henley Blanc",
    desc: "Tricot Henley en coton - Blanc / Noir",
    price: 179,
    oldPrice: 249,
    rating: "4.9",
    image: "images/tricot-blanc-1.jpg.HEIC"
  }
];

let cart = [];
let favorites = [];

const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");

function renderProducts() {
  productsGrid.innerHTML = products
    .map((product) => {
      const isFav = favorites.includes(product.id);
      return `
        <article class="product-card">
          <div>
            <div class="product-img-wrap">
              <img src="${product.image}" alt="${product.title}" loading="lazy" />
              <button class="fav-btn" onclick="toggleFavorite(${product.id})" aria-label="Favori">
                ${isFav ? "♥" : "♡"}
              </button>
            </div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-desc">${product.desc}</p>
          </div>
          <div>
            <div class="product-meta">
              <div class="price-box">
                <span class="price-current">${product.price} DH</span>
                ${product.oldPrice ? `<span class="price-old">${product.oldPrice} DH</span>` : ""}
              </div>
              <span class="rating">⭐ ${product.rating}</span>
            </div>
            <button class="add-btn" onclick="addToCart(${product.id})">Ajouter au panier</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(id) {
  const item = products.find((p) => p.id === id);
  if (!item) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = totalQty;
  cartTotal.textContent = `${totalPrice} DH`;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="color:#666;font-size:14px;">Le panier est vide.</p>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <div>
          <strong>${item.title}</strong><br />
          <span>${item.price} DH × ${item.qty}</span>
        </div>
        <button onclick="removeFromCart(${item.id})" style="border:none;background:none;cursor:pointer;font-size:16px;">🗑️</button>
      </div>
    `
    )
    .join("");
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }
  renderProducts();
  updateFavoritesUI();
}

function updateFavoritesUI() {
  const favText = document.getElementById("favoritesText");
  if (favorites.length === 0) {
    favText.textContent = "Aucun article en favoris pour le moment.";
    return;
  }
  const names = products
    .filter((p) => favorites.includes(p.id))
    .map((p) => p.title)
    .join("، ");
  favText.textContent = `المنتجات المفضلة : ${names}`;
}

document.getElementById("openCartBtn").addEventListener("click", () => {
  cartDrawer.classList.add("open");
  backdrop.classList.add("open");
});

function closeCart() {
  cartDrawer.classList.remove("open");
  backdrop.classList.remove("open");
}

document.getElementById("closeCartBtn").addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("السلة خاوية، زيدي منتوج أولاً.");
    return;
  }
  const summary = cart.map((i) => `- ${i.title} (x${i.qty})`).join("\n");
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  alert(`شكراً على الطلب ديالك:\n${summary}\nالمجموع: ${total} DH`);
});

document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    document.getElementById("favorisSection").style.display = tab === "favoris" ? "block" : "none";
    document.getElementById("profilSection").style.display = tab === "profil" ? "block" : "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

renderProducts();
updateCartUI();
updateFavoritesUI();