document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const imageInput = document.getElementById("image");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      const reader = new FileReader();
      const file = imageInput.files[0];
  
      // If there's an image, read it as base64
      reader.onload = () => {
        const base64Image = reader.result;
  
        const newRecipe = {
          id: Date.now(),
          title: formData.get("title"),
          image: base64Image, // This is now base64
          description: formData.get("description"),
          ingredients: formData.get("ingredients").split("\n"),
          instructions: formData.get("instructions")
        };
  
        const savedRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
        savedRecipes.push(newRecipe);
        localStorage.setItem("userRecipes", JSON.stringify(savedRecipes));
  
        form.reset();
        document.getElementById("form-success").classList.remove("hidden");

      };
  
      if (file) {
        reader.readAsDataURL(file); // Convert to base64
      } else {
        // No file uploaded
        alert("Please upload an image.");
      }
    });
  });
  