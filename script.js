// Preload some sample recipes
let shoppingList = [];
const sampleRecipes = [
  // Indian Recipes
  {
    name: "Chicken Tikka Masala",
    ingredients: ["Chicken", "Yogurt", "Garlic", "Tomato", "Spices"],
    instructions: "Marinate chicken in yogurt and spices. Cook with garlic and tomato sauce. Serve with rice or naan.",
    category: "Indian"
  },
  {
    name: "Paneer Butter Masala",
    ingredients: ["Paneer", "Tomato", "Cream", "Butter", "Spices"],
    instructions: "Cook paneer in a rich tomato gravy with butter and cream. Serve with roti or rice.",
    category: "Indian"
  },

  // Mexican Recipes
  {
    name: "Tacos",
    ingredients: ["Tortilla", "Ground Beef", "Lettuce", "Cheese", "Salsa"],
    instructions: "Cook beef and assemble with lettuce, cheese, and salsa in tortillas.",
    category: "Mexican"
  },
  {
    name: "Guacamole",
    ingredients: ["Avocado", "Tomato", "Onion", "Lime", "Salt"],
    instructions: "Mash avocado and mix with diced tomato, onion, lime juice, and salt. Serve as a dip or with tacos.",
    category: "Mexican"
  },

  // Italian Recipes
  {
    name: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
    instructions: "Cook spaghetti. In a bowl, mix eggs and cheese. Toss with pancetta and pasta. Season with pepper.",
    category: "Italian"
  },
  {
    name: "Margherita Pizza",
    ingredients: ["Pizza Dough", "Tomato", "Mozzarella", "Basil", "Olive Oil"],
    instructions: "Spread tomato sauce on dough, add mozzarella, and bake. Top with basil and olive oil.",
    category: "Italian"
  },

  // Japanese Recipes
  {
    name: "Sushi Rolls",
    ingredients: ["Nori", "Rice", "Fish", "Avocado", "Soy Sauce"],
    instructions: "Place rice and fillings on nori, roll tightly, and serve with soy sauce.",
    category: "Japanese"
  },
  {
    name: "Ramen",
    ingredients: ["Ramen Noodles", "Broth", "Pork", "Egg", "Green Onions"],
    instructions: "Boil noodles. Add to hot broth with pork, soft-boiled egg, and green onions.",
    category: "Japanese"
  },

  // Turkish Recipes
  {
    name: "Kebab",
    ingredients: ["Ground Beef", "Lamb", "Garlic", "Onion", "Spices"],
    instructions: "Mix meats with garlic, onion, and spices. Shape into skewers and grill.",
    category: "Turkish"
  },
  {
    name: "Baklava",
    ingredients: ["Phyllo Dough", "Walnuts", "Honey", "Butter", "Sugar"],
    instructions: "Layer phyllo with walnuts, bake, and drizzle with honey and sugar syrup.",
    category: "Turkish"
  },

  // Chinese Recipes
  {
    name: "Sweet and Sour Chicken",
    ingredients: ["Chicken", "Pineapple", "Bell Peppers", "Vinegar", "Soy Sauce"],
    instructions: "Fry chicken, stir-fry with pineapple and peppers, add sweet-sour sauce.",
    category: "Chinese"
  },
  {
    name: "Dumplings",
    ingredients: ["Ground Pork", "Cabbage", "Soy Sauce", "Dumpling Wrappers"],
    instructions: "Mix pork with cabbage and soy sauce. Wrap in dumpling wrappers and steam.",
    category: "Chinese"
  }
];

// Load recipes from localStorage or fallback to the sample recipes
const recipes = JSON.parse(localStorage.getItem('recipes')) || sampleRecipes;

let recipeForm = document.getElementById("recipe-form");

recipeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const recipe = {
    name: document.getElementById("name").value,
    ingredients: document.getElementById("ingredients").value.split(","),
    instructions: document.getElementById("instructions").value,
    category: document.getElementById("category").value
  };

  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));  // Save recipes to localStorage
  displayRecipes();
  this.reset();
});

// Function to display all recipes
function displayRecipes() {
  const recipeList = document.getElementById("recipes");
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Cuisine:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button onclick="addToShoppingList(${index})">Add to Shopping List</button>
    `;

    recipeList.appendChild(recipeCard);
  });
}

// Function to filter recipes by category
function filterRecipes(category) {
  const recipeList = document.getElementById("recipes");
  recipeList.innerHTML = "";

  const filteredRecipes = recipes.filter(recipe => recipe.category === category);

  filteredRecipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Cuisine:</strong> ${recipe.category}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      <button onclick="addToShoppingList(${index})">Add to Shopping List</button>
    `;

    recipeList.appendChild(recipeCard);
  });
}

// Initial display of all recipes
displayRecipes();

function addToShoppingList(index) {
  const selectedRecipe = recipes[index];
  shoppingList = [...shoppingList, ...selectedRecipe.ingredients];
  displayShoppingList();
}

// Display Shopping List
function displayShoppingList() {
  const shoppingItems = document.getElementById("shopping-items");
  shoppingItems.innerHTML = "";

  shoppingList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    shoppingItems.appendChild(li);
  });
}

// Clear Shopping List
function clearShoppingList() {
  shoppingList = [];
  displayShoppingList();
}
