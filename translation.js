const translations = {
  fa: {
    title: "منوی دیجیتال رستوران",
    addToCart: "➕ افزودن",
    orderNow: "✅ ثبت سفارش",
    menuTitle: "منو",
    language: "🇮🇷 فارسی",
    ingredients: "ترکیبات",
    price: "قیمت",
    outOfStock: "ناموجود"
  },
  en: {
    title: "Digital Restaurant Menu",
    addToCart: "➕ Add to Cart",
    orderNow: "✅ Order Now",
    menuTitle: "Menu",
    language: "🇬🇧 English",
    ingredients: "Ingredients",
    price: "Price",
    outOfStock: "Out of Stock"
  }
};

let currentLang = "fa";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations();
}

function applyTranslations() {
  const t = translations[currentLang];
  document.getElementById("page-title").innerText = t.title;
  document.getElementById("menu-title").innerText = t.menuTitle;
  document.getElementById("order-button").innerText = t.orderNow;
  document.getElementById("lang-button").innerText = t.language;
  renderMenu();
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) setLanguage(savedLang);
  else applyTranslations();
});

function toggleLang() {
  setLanguage(currentLang === "fa" ? "en" : "fa");
}
