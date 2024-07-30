


async function getApi(){
    
    let feh = await fetch("https://dummyjson.com/products");

    let response = await feh.json();
    
    let data = response.products;
    
  

    let htmlContent = data.map(function(item){
        return `
        <div class="swiper-slide"><img src="${item.thumbnail}"></img></div>`;
     }).join('')

     let printDiv = document.querySelector('.swiper-wrapper');
     printDiv.innerHTML = htmlContent; // Update the table content

     const swiper = new Swiper('.swiper', {
    
        // Optional parameters
        direction: 'horizontal',
        loop: true,
       
    
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

}





getApi();