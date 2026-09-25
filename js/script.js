// Theme-Dark ------------------------------------------------------------
const themeButton = document.querySelector(".theme-switch");
const sunIcon = document.querySelector(".theme-switch__icon--sun");
const moonIcon = document.querySelector(".theme-switch__icon--moon");
const logo = document.querySelector("#logo");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  moonIcon.classList.add("theme-switch__icon--active");
  sunIcon.classList.remove("theme-switch__icon--active");
  logo.setAttribute("src", "assets/img/logo-dark.svg");
} else {
  document.body.classList.remove("dark-theme");
  sunIcon.classList.add("theme-switch__icon--active");
  moonIcon.classList.remove("theme-switch__icon--active");
  logo.setAttribute("src", "assets/img/logo-light.svg");
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  sunIcon.classList.toggle("theme-switch__icon--active");
  moonIcon.classList.toggle("theme-switch__icon--active");

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    logo.setAttribute("src", "assets/img/logo-dark.svg");
  } else {
    localStorage.setItem("theme", "light");
    logo.setAttribute("src", "assets/img/logo-light.svg");
  }
});

// Burger----------------------------------------------------------
const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const navItem = document.querySelectorAll(".nav__item");

burger.addEventListener("click", () => {
  header.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});

navItem.forEach((item) => {
  item.addEventListener("click", () => {
    header.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
});

// Dynamic catalog-----------------------------------------------
const menuCards = document.querySelector(".menu__cards");
const buttons = document.querySelectorAll(".menu__filter");

function renderCards(category) {
  menuCards.innerHTML = "";
  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  filteredProducts.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    menuCards.appendChild(card);

    const imageContainer = document.createElement("div");
    imageContainer.className = "menu-card__image";
    const img = document.createElement("img");
    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
    img.src = `assets/menu-items/${product.category}-${index + 1}.jpg`;
    img.alt = product.name;

    const title = document.createElement("h2");
    title.className = "menu-card__title";
    title.textContent = product.name;

    const content = document.createElement("div");
    content.className = "menu-card__content";
    card.appendChild(content);
    content.appendChild(title);

    const description = document.createElement("p");
    description.className = "menu-card__description";
    description.textContent = product.description;
    content.appendChild(description);

    const price = document.createElement("p");
    price.className = "menu-card__price";
    price.textContent = `$${product.price}`;
    content.appendChild(price);
  });
}
renderCards("coffee");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.textContent.trim().toLowerCase();
    renderCards(category);

    buttons.forEach((item) => {
      item.classList.remove("menu__filter--active");
    });
    button.classList.add("menu__filter--active");
  });
});
