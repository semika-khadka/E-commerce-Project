async function getProducts() {
    // Fetch products from API
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('products-grid');
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                        <img src="https://i.ebayimg.com/images/g/JMQAAOSwW1dmudFt/s-l1200.jpg" alt="Product Image">
                        <div class="card-content">
                            <h2 class="card-title">${item.title.substring(0, 20)}...</h2>
                            <p class="card-description">${item.body.substring(0, 100)}...</p>
                            <p class="card-price">$${19.99 + index * 10}</p>
                        </div>
                    `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

getProducts();