const themeButton = document.querySelector(".theme-switch");
const sunIcon = document.querySelector(".theme-switch__icon--sun");
const moonIcon = document.querySelector(".theme-switch__icon--moon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
   moonIcon.classList.add("theme-switch__icon--active");
   sunIcon.classList.remove("theme-switch__icon--active");
} else {
  document.body.classList.remove("dark-theme");
  sunIcon.classList.add("theme-switch__icon--active");
  moonIcon.classList.remove("theme-switch__icon--active");
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  sunIcon.classList.toggle("theme-switch__icon--active");
  moonIcon.classList.toggle("theme-switch__icon--active");

  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
