let cart = [];
let foods = JSON.parse(localStorage.getItem("foods")) || [];

function renderMenu() {
  const t = translations[currentLang];
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.innerHTML = "";

  const now = new Date();
  const hour = now.getHours();

  foods.forEach(food => {
    if (!food.available) return;
    if (food.time) {
      if (hour < food.time.start || hour >= food.time.end) return;
    }

    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <img src="${food.image}" alt="${food.name}" width="100">
      <h3>${food.name}</h3>
      <p><strong>${t.ingredients}:</strong> ${food.ingredients}</p>
      <p><strong>${t.price}:</strong> ${food.price.toLocaleString()} تومان</p>
      <button onclick="addToCart(${foods.indexOf(food)})">${t.addToCart}</button>
    `;
    menu.appendChild(card);
  });
}

function addToCart(index) {
  const food = foods[index];
  const existing = cart.find(f => f.name === food.name);
  if (existing) existing.count++;
  else cart.push({ ...food, count: 1 });
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  if (!cartDiv) return;
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.count;
    cartDiv.innerHTML += `<p>${item.name} × ${item.count}</p>`;
  });

  cartDiv.innerHTML += `<hr><strong>مبلغ کل: ${total.toLocaleString()} تومان</strong>`;
}

function generateReceipt() {
  if (cart.length === 0) {
    alert("سبد خرید خالی است!");
    return;
  }

  let html = "";
  let total = 0;
  cart.forEach(item => {
    html += `<p>${item.name} × ${item.count} = ${item.price * item.count} تومان</p>`;
    total += item.price * item.count;
  });

  html += `<hr><strong>مبلغ کل: ${total} تومان</strong>`;
  html += `<p>تاریخ: ${new Date().toLocaleString('fa-IR')}</p>`;

  document.getElementById("receipt-content").innerHTML = html;
  document.getElementById("receipt").style.display = "block";

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({ items: cart, time: new Date() });
  localStorage.setItem("orders", JSON.stringify(orders));

  window.print();
  cart = [];
  renderCart();
}
