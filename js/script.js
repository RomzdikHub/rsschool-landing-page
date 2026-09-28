// Alarm message ---------------------------------------------------
const noticeBtn = document.querySelector(".notice__button");
const noticeOverlay = document.querySelector(".notice-overlay");

if (noticeBtn && noticeOverlay) {
  document.body.classList.add("no-scroll");

  noticeBtn.addEventListener("click", () => {
    noticeOverlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });
}

// Theme -----------------------------------------------------------
const themeButton = document.querySelector(".theme-switch");
const sunIcon = document.querySelector(".theme-switch__icon--sun");
const moonIcon = document.querySelector(".theme-switch__icon--moon");
const logo = document.querySelector("#logo");

if (themeButton && sunIcon && moonIcon && logo) {
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
}

// Burger ----------------------------------------------------------
const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const navItems = document.querySelectorAll(".nav__item");

if (header && burger) {
  burger.addEventListener("click", () => {
    header.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      header.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("open")) {
      header.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  });
}

// Menu page -------------------------------------------------------
const menuCards = document.querySelector(".menu__cards");

if (menuCards) {
  const buttons = document.querySelectorAll(".menu__filter");
  const showMoreBtn = document.querySelector(".menu__show-more");

  // Modal
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal__close");
  const modalTitle = document.querySelector(".modal__title");
  const modalDescription = document.querySelector(".modal__description");
  const modalPrice = document.querySelector(".modal__price");
  const modalImage = document.querySelector(".modal__image img");

  const modalSizeOptions = document.querySelectorAll(
    ".modal__options--sizes .modal__option",
  );

  const modalAdditiveOptions = document.querySelectorAll(
    ".modal__options--additives .modal__option",
  );

  let showAll = false;
  let currentCategory = "coffee";

  let currentProduct;
  let selectedSize = "s";

  function updatePrice() {
    const sizePrice = Number(currentProduct.sizes[selectedSize]["add-price"]);

    let additivesPrice = 0;

    modalAdditiveOptions.forEach((option) => {
      if (option.classList.contains("modal__option--active")) {
        const index = option.dataset.additive;

        additivesPrice += Number(currentProduct.additives[index]["add-price"]);
      }
    });

    const totalPrice =
      Number(currentProduct.price) + sizePrice + additivesPrice;

    modalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }

  function renderCards(category) {
    menuCards.innerHTML = "";

    const filteredProducts = products.filter(
      (product) => product.category === category,
    );

    const isMobile = window.innerWidth <= 768;

    const visibleCards =
      isMobile && !showAll ? filteredProducts.slice(0, 4) : filteredProducts;

    if (isMobile && filteredProducts.length > 4 && !showAll) {
      showMoreBtn.classList.remove("hidden");
    } else {
      showMoreBtn.classList.add("hidden");
    }

    visibleCards.forEach((product, index) => {
      const card = document.createElement("article");
      card.className = "menu-card";

      const imageContainer = document.createElement("div");
      imageContainer.className = "menu-card__image";

      const img = document.createElement("img");
      img.src = `assets/menu-items/${product.category}-${index + 1}.jpg`;
      img.alt = product.name;

      imageContainer.appendChild(img);
      card.appendChild(imageContainer);

      const content = document.createElement("div");
      content.className = "menu-card__content";

      const title = document.createElement("h2");
      title.className = "menu-card__title";
      title.textContent = product.name;

      const description = document.createElement("p");
      description.className = "menu-card__description";
      description.textContent = product.description;

      const price = document.createElement("p");
      price.className = "menu-card__price";
      price.textContent = `$${product.price}`;

      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(price);

      card.appendChild(content);
      menuCards.appendChild(card);

      card.addEventListener("click", () => {
        currentProduct = product;
        selectedSize = "s";

        modalSizeOptions.forEach((option) => {
          option.classList.remove("modal__option--active");
        });

        if (modalSizeOptions[0]) {
          modalSizeOptions[0].classList.add("modal__option--active");
        }

        modalAdditiveOptions.forEach((option) => {
          option.classList.remove("modal__option--active");
        });

        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `$${Number(product.price).toFixed(2)}`;
        modalImage.src = `assets/menu-items/${product.category}-${index + 1}.jpg`;
        modalImage.alt = product.name;

        modalOverlay.classList.remove("hidden");
        document.body.classList.add("no-scroll");
      });
    });
  }

  renderCards(currentCategory);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      currentCategory = button.textContent.trim().toLowerCase();
      showAll = false;

      renderCards(currentCategory);

      buttons.forEach((item) => {
        item.classList.remove("menu__filter--active");
      });

      button.classList.add("menu__filter--active");
    });
  });

  showMoreBtn.addEventListener("click", () => {
    showAll = true;
    renderCards(currentCategory);
  });

  modalSizeOptions.forEach((modalOption) => {
    modalOption.addEventListener("click", () => {
      selectedSize = modalOption.dataset.size;

      modalSizeOptions.forEach((option) => {
        option.classList.remove("modal__option--active");
      });

      modalOption.classList.add("modal__option--active");

      updatePrice();
    });
  });

  modalAdditiveOptions.forEach((modalOption) => {
    modalOption.addEventListener("click", () => {
      modalOption.classList.toggle("modal__option--active");

      updatePrice();
    });
  });

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });
}
