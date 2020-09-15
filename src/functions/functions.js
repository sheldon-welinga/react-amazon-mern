const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
};

const closeMenu = () => {
  document.querySelector(".sidebar").classList.remove("open");
};

export { openMenu, closeMenu };
