document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#recipe-form")) {
        document.querySelector("#recipe-form").addEventListener("submit", saveRecipe);
    } else if (document.querySelector(".recipe-detail")) {
        loadRecipeDetails();
    } else if (document.querySelector("#recipe-container")) {
        loadRecipes();
    }
});

// Convert uploaded image to Base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
}

// Save a new recipe
function saveRecipe(event) {
    event.preventDefault();
    
    const name = document.getElementById("recipe-name").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim().split("\n");
    const instructions = document.getElementById("instructions").value.trim().split("\n");
    const imageInput = document.getElementById("recipe-image");

    if (!name || !ingredients.length || !instructions.length || !imageInput.files.length) {
        alert("Please fill out all fields and upload an image.");
        return;
    }

    const imageFile = imageInput.files[0];

    convertImageToBase64(imageFile, (imageBase64) => {
        const newRecipe = { name, ingredients, instructions, image: imageBase64 };

        let savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        savedRecipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(savedRecipes));

        alert("Recipe added successfully!");
        window.location.href = "recipes.html";
    });
}

// Load saved recipes from localStorage
function loadRecipes() {
    const recipesContainer = document.querySelector("#recipe-container");

    if (!recipesContainer) {
        console.error("❌ Recipe container not found.");
        return;
    }

    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    savedRecipes.forEach(recipe => {
        addRecipeToPage(recipe, recipesContainer);
    });
}

// Function to add a recipe to the page
function addRecipeToPage(recipe, container) {
    const listItem = document.createElement("li");
    listItem.classList.add("recipe-item");

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.classList.add("small-recipe-img");

    const link = document.createElement("a");
    link.href = `recipe.html?name=${encodeURIComponent(recipe.name)}`;
    link.textContent = recipe.name;
    link.classList.add("recipe-link");

    listItem.appendChild(img);
    listItem.appendChild(link);
    container.appendChild(listItem);
}

// Load selected recipe on recipe.html page
function loadRecipeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeName = urlParams.get("name");
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipe = savedRecipes.find(r => r.name === recipeName);

    if (!recipe) {
        document.body.innerHTML = "<h1>Recipe not found.</h1>";
        return;
    }

    document.querySelector(".recipe-title").textContent = recipe.name;
    document.querySelector(".recipe-img").src = recipe.image;
    document.querySelector(".recipe-img").alt = recipe.name;

    const ingredientsList = document.querySelector(".recipe-ingredients");
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.querySelector(".recipe-instructions");
    instructionsList.innerHTML = "";
    recipe.instructions.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        instructionsList.appendChild(li);
    });
   
}

document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = ""; // Prevent immediate loading
                observer.observe(img);
            } else {
                console.warn("⚠️ Lazy loading: data-src missing for", img);
            }
        });
    } else {
        // Fallback: Load all images immediately if IntersectionObserver is not supported
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
});


