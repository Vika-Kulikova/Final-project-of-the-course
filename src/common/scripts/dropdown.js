function dropdown(rootElementSelector) {
  const rootElement = document.querySelector(rootElementSelector);
  const titleElem = rootElement.querySelector(".dropdown-title");

  function toggleDropdown() {
    titleElem.classList.toggle('open');
  }

  titleElem.addEventListener('click', toggleDropdown);
}

dropdown('.navbar-global-nav');
dropdown('.icon-links');