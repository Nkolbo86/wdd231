const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    // Filter for Silver (2) and Gold (3) members
    const spotlightCandidates = data.filter(member => member.membership >= 2);

    // Shuffle and pick 2–3 members randomly
    const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} logo">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p class="membership">Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightContainer.innerHTML = `<p>Unable to load spotlight members at this time.</p>`;
  }
}

loadSpotlights();
