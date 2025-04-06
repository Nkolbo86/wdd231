document.addEventListener("DOMContentLoaded", async () => {
    const recipeList = document.getElementById("recipe-list");
  
    try {
      const res = await fetch("data/recipes.json");
      const recipes = await res.json();
      console.log("Recipes fetched:", recipes);
      const localRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

// Combine both lists
      const allRecipes = [...recipes, ...localRecipes];

  
      allRecipes.forEach(recipe => {
        const card = document.createElement("section");
        card.classList.add("recipe-card");
        card.innerHTML = `
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
          <p>${recipe.description}</p>
          <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
        `;
        recipeList.appendChild(card);
      });
  
      // Modal logic
      const modal = document.getElementById("recipe-modal");
      const modalContent = document.getElementById("modal-content");
      const closeBtn = document.querySelector(".close-modal");
  
      document.addEventListener("click", e => {
        if (e.target.classList.contains("view-recipe-btn")) {
          const recipeId = +e.target.dataset.id;
          const recipe = recipes.find(r => r.id === recipeId);
          modalContent.innerHTML = `
            <h2>${recipe.title}</h2>
            <p><strong>Ingredients:</strong></p>
            <ul>${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}</ul>
            <p><strong>Instructions:</strong></p>
            <p>${recipe.instructions}</p>
          `;
          modal.showModal();
        }
      });
  
      closeBtn.addEventListener("click", () => modal.close());
  
    } catch (err) {
      recipeList.innerHTML = "<p>Failed to load recipes.</p>";
      console.error("Recipe fetch error:", err);
    }
  });
  


