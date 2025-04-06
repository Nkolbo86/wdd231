document.addEventListener("DOMContentLoaded", () => {
  // Highlight active link
  const currentPath = location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach(link => {
    if (link.getAttribute("href").endsWith(currentPath)) {
      link.classList.add("active");
    }
  });

  // Hamburger toggle
  const menuButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }
});
