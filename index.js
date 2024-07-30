
//================================= form with table using array of objects using map and array methods===================//
async function getAPI(){
    let api = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza");
    let json = await  api.json();
    var data = json.recipes;
    let tbody = document.querySelector('.recipes');
    let sh= data.map(function(recipe){
       return `
       <div class="content"> 
             <img src="${recipe.image_url}"></img>
             <h3>${recipe.title}</h3>
             <a href='details.html?pizza_id=${recipe.recipe_id}'> See Details</a>
       </div>`;
    }).join('')
    tbody.innerHTML = sh; // Update the table content
    
}

getAPI();


