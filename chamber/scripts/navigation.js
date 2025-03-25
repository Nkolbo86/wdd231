document.addEventListener("DOMContentLoaded", () => {
    const currentPath = location.pathname.split("/").pop(); // Gets the file name only
    const navLinks = document.querySelectorAll("nav a");
  
    navLinks.forEach(link => {
      if (link.getAttribute("href").endsWith(currentPath)) {
        link.classList.add("active");
      }
    });
  });
  