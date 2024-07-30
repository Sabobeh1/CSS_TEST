// Get URL parameters from the current page's URL
let urlParam = new URLSearchParams(window.location.search);

// Retrieve the 'pizza_id' from the URL parameters
let pizzaId = urlParam.get('pizza_id');

// Log the pizzaId to the console
console.log(pizzaId);

// Asynchronous function to get pizza details by ID
async function getPizza(id) {
    // Fetch the pizza data from the API using the provided id
    const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);

    // Parse the JSON response
    const data = await response.json();

    // Extract the recipe information from the data
    const recipe = data.recipe;
    console.log(recipe);

    document.querySelector('.title h1').textContent = recipe.title;
    document.querySelector('.typeImg').src = recipe.image_url;
    document.querySelector('.ingredients').innerHTML = recipe.ingredients.map(function(item) {
        return `<li>${item}</li>`;
    }).join('');
}

// Invoke the getPizza function with the pizzaId
getPizza(pizzaId);
