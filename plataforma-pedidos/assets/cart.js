// Carrinho simples via localStorage — só para fins de protótipo navegável.
const CART_KEY = 'tiamaria_carrinho';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch (e) { return {}; }
}
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function addToCart(id, qty) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  if (cart[id] <= 0) delete cart[id];
  saveCart(cart);
  updateCartBadge();
}

function setCartQty(id, qty) {
  const cart = getCart();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  saveCart(cart);
  updateCartBadge();
}

function cartItems() {
  const cart = getCart();
  return Object.entries(cart).map(([id, qty]) => {
    const produto = CATALOGO.find((p) => p.id === id);
    return produto ? { ...produto, qty } : null;
  }).filter(Boolean);
}

function cartTotal() {
  return cartItems().reduce((sum, item) => sum + item.preco * item.qty, 0);
}

function cartCount() {
  return cartItems().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = cartCount();
    el.hidden = cartCount() === 0;
  });
}

function formatBRL(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
