const menuMobile = document.getElementById("menu-mobile");
const navLista = document.getElementById("nav-lista");

menuMobile.addEventListener("click", () => {
  navLista.classList.toggle("active");
});
