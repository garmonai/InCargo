const scrollArea = document.getElementById("scrollArea");
const scrollBtn = document.getElementById("scrollToTopBtn");

// Прокрутка наверх (если есть область прокрутки и кнопка)
if (scrollArea && scrollBtn) {
  scrollArea.addEventListener("scroll", () => {
    if (scrollArea.scrollTop > 260) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    scrollArea.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Helper: показать лоадер и перейти на страницу
function goWithLoader(href) {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    loader.classList.add("show");
  }
  window.location.href = href;
}

// Навигация внизу (переход между страницами)
const navItems = document.querySelectorAll(".bottom-nav .nav-item");
if (navItems.length) {
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const href = item.getAttribute("data-href");
      if (href) {
        goWithLoader(href);
      }
    });
  });
}

// Поиск по каталогу
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const cars = Array.from(document.querySelectorAll(".car-card"));

function applyFilters() {
  if (!searchInput) return;
  const text = searchInput.value.trim().toLowerCase();
  const activeChip = document.querySelector(".chip.chip-active");
  const filter = activeChip ? activeChip.getAttribute("data-filter") : "all";

  cars.forEach((card) => {
    const tags = (card.getAttribute("data-tags") || "").toLowerCase();
    const segment = (card.getAttribute("data-segment") || "").toLowerCase();

    const textMatch = !text || tags.includes(text);
    const filterMatch = filter === "all" || segment.includes(filter);

    if (textMatch && filterMatch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

if (searchInput && searchClear) {
  searchInput.addEventListener("input", () => {
    searchClear.style.display = searchInput.value ? "block" : "none";
    applyFilters();
  });

  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchClear.style.display = "none";
    applyFilters();
  });
}

// Фильтры по странам/типам
const chips = document.querySelectorAll(".chip");
if (chips.length) {
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      applyFilters();
    });
  });
}

// Обработчики CTA-кнопок
const requestForm = document.getElementById("requestForm");
const phoneInput = document.getElementById("phoneInput");

if (requestForm && phoneInput) {
  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!phoneInput.value.trim()) {
      alert("Введите, пожалуйста, номер телефона, чтобы мы могли с вами связаться.");
      return;
    }
    alert("Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.");
    requestForm.reset();
  });
}

document.querySelectorAll(".car-cta .btn-solid").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Любая кнопка расчёта в карточке ведёт на страницу заявки
    goWithLoader("request.html#request");
  });
});

const heroOrderBtn = document.getElementById("heroOrderBtn");
if (heroOrderBtn) {
  heroOrderBtn.addEventListener("click", () => {
    // Кнопка "Рассчитать подбор" в hero тоже ведёт на страницу заявки
    goWithLoader("request.html#request");
  });
}

const heroWhatsAppBtn = document.getElementById("heroWhatsAppBtn");
if (heroWhatsAppBtn) {
  heroWhatsAppBtn.addEventListener("click", () => {
    alert("Откройте WhatsApp и напишите нам по номеру, указанному на сайте.");
  });
}

// Иконки в шапке
const openCallback = document.getElementById("openCallback");
if (openCallback) {
  openCallback.addEventListener("click", () => {
    const el = document.querySelector("#request");
    if (el && scrollArea) {
      const top = el.offsetTop - 16;
      scrollArea.scrollTo({ top, behavior: "smooth" });
    }
  });
}

const openMenu = document.getElementById("openMenu");
const sideMenu = document.getElementById("sideMenu");
const sideMenuClose = document.getElementById("sideMenuClose");

function openSideMenu() {
  if (sideMenu) {
    sideMenu.classList.add("show");
  }
}

function closeSideMenu() {
  if (sideMenu) {
    sideMenu.classList.remove("show");
  }
}

if (openMenu && sideMenu) {
  openMenu.addEventListener("click", openSideMenu);
}

if (sideMenuClose) {
  sideMenuClose.addEventListener("click", closeSideMenu);
}

if (sideMenu) {
  sideMenu.addEventListener("click", (e) => {
    if (e.target === sideMenu) {
      closeSideMenu();
    }
  });

  const sideLinks = sideMenu.querySelectorAll(".side-menu-link");
  sideLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("data-href");
      if (href) {
        closeSideMenu();
        goWithLoader(href);
      }
    });
  });
}

// Подробное описание авто по кнопке "Подробнее"
const carDetailsModal = document.getElementById("carDetailsModal");
const carDetailsTitle = document.getElementById("carDetailsTitle");
const carDetailsBody = document.getElementById("carDetailsBody");

if (carDetailsModal && carDetailsTitle && carDetailsBody) {
  const descriptions = {
    "Hyundai Sonata 2.0": [
      "<strong>Hyundai Sonata 2.0 (Корея)</strong> — комфортный бизнес-седан с экономичным 2.0‑литровым бензиновым мотором и классическим автоматом.",
      "Мы подбираем авто с реальным пробегом, полной сервисной историей и без серьёзных ДТП. Проверяем по корейским базам, диагностируем ходовую, коробку и электронику.",
      "Идеален как первый автомобиль для семьи и для ежедневных поездок по городу: мягкая подвеска, просторный салон, современные системы безопасности."
    ],
    "BMW 320d xDrive": [
      "<strong>BMW 320d xDrive (Европа)</strong> — динамичный и экономичный седан с полным приводом, ориентированный на активную езду.",
      "Дизельный мотор 2.0 на 190 л.с. сочетает низкий расход топлива с отличной тягой. Полный привод xDrive уверенно чувствует себя на плохой дороге и зимой.",
      "Мы подбираем живые экземпляры с прозрачной дилерской историей, без чип-тюнинга и грубых доработок, с аккуратной эксплуатацией."
    ],
    "Tesla Model 3": [
      "<strong>Tesla Model 3 Long Range (США)</strong> — современный электромобиль с большим запасом хода и быстрым разгоном.",
      "Комплектация Long Range обеспечивает до ~480 км хода на одном заряде (зависит от стиля езды и условий). Авто без пробега по РФ, с аккуратным восстановлением.",
      "Мы проверяем историю по страховым базам США, состояние батареи, геометрию кузова и корректность восстановительных работ."
    ],
    "Land Cruiser 300": [
      "<strong>Toyota Land Cruiser 300 (ОАЭ)</strong> — флагманский внедорожник с мощным бензиновым двигателем и премиальной комплектацией.",
      "Автомобили из ОАЭ обычно имеют богатое оснащение и хорошее состояние салона. Мы тщательно проверяем состояние рамы, трансмиссии и подвески.",
      "Подходит тем, кто ищет статусный, надёжный и очень комфортный внедорожник для любых дорог и путешествий."
    ]
  };

  function openCarDetails(carName) {
    const textBlocks = descriptions[carName] || [
      "<strong>" + carName + "</strong>",
      "Подробное описание будет добавлено индивидуально под выбранную комплектацию и страну поставки."
    ];
    carDetailsTitle.textContent = carName;
    carDetailsBody.innerHTML = textBlocks.map((p) => "<p>" + p + "</p>").join("");
    carDetailsModal.classList.add("show");
  }

  document.querySelectorAll(".car-cta .btn-outline").forEach((btn) => {
    btn.addEventListener("click", () => {
      const car = btn.getAttribute("data-car") || "Выбранное авто";
      openCarDetails(car);
    });
  });

  const carDetailsClose = document.getElementById("carDetailsClose");
  const carDetailsOk = document.getElementById("carDetailsOk");

  function closeCarDetails() {
    carDetailsModal.classList.remove("show");
  }

  if (carDetailsClose) {
    carDetailsClose.addEventListener("click", closeCarDetails);
  }
  if (carDetailsOk) {
    carDetailsOk.addEventListener("click", closeCarDetails);
  }

  carDetailsModal.addEventListener("click", (e) => {
    if (e.target === carDetailsModal) {
      closeCarDetails();
    }
  });
}


