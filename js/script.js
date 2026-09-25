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