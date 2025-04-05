document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("discover-gallery");
    const messageBox = document.getElementById("visitor-message");
  
    // Load visitor message
    const today = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");
  
    let message = "";
  
    if (!lastVisit) {
      message = "Welcome! Let us know if you have any questions.";
    } else {
      const daysPassed = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
      if (daysPassed < 1) {
        message = "Back so soon! Awesome!";
      } else if (daysPassed === 1) {
        message = "You last visited 1 day ago.";
      } else {
        message = `You last visited ${daysPassed} days ago.`;
      }
    }
  
    messageBox.textContent = message;
    localStorage.setItem("lastVisit", today);
  
    // Fetch and display points of interest
    fetch("data/discover.json")
      .then(res => res.json())
      .then(data => {
        data.forEach(place => {
          const card = document.createElement("section");
          card.classList.add("discover-card");
  
          card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
              <img src="images/${place.image}" alt="${place.name}">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn More</button>
          `;

card.querySelector("button").addEventListener("click", () => {
  alert(`Thanks for your interest in ${place.name}! More details coming soon.`);
});
  
          gallery.appendChild(card);
        });
      })
      .catch(error => {
        gallery.innerHTML = "<p>Error loading attractions.</p>";
        console.error("JSON error:", error);
      });
  });
  