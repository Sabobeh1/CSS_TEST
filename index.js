const swiper = new Swiper('.swiper', {
    
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 1000
    },

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


async function getApi(){
    
    let feh = await fetch("https://dummyjson.com/products");

    let response = await feh.json();
    
    let data = response.products;
    console.log(products);
    
    let printDiv = document.querySelector('.swiper-wrapper');

    

}

getApi();