async function getApi() {
    try {
        // Using Axios to get data from the API
        let response = await axios.get("https://dummyjson.com/products");
        console.log(response);
        let data = response.data.products;

        // Mapping through each product to create HTML content for each slide
        let htmlContent = data.map(function(item) {
            return `<div class="swiper-slide"><img src="${item.thumbnail}" alt="Product Image"></img></div>`;
        }).join('');

        // Selecting the swiper-wrapper and inserting the HTML content
        let printDiv = document.querySelector('.swiper-wrapper');
        printDiv.innerHTML = htmlContent; // Update the swiper wrapper content

        // Initialize Swiper
        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    } catch (error) {
        console.error('Error fetching and parsing data', error);
    }
}

getApi();
