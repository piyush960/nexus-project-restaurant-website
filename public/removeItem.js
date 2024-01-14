const removeBtns = document.querySelectorAll('.cart-area .cart-cards .cart-card .remove-btn');

removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener('click', (e) => {
        deleteCard(removeBtn);

        removeBtn.parentElement.style.display = 'none';
    })
})

async function deleteCard(removeBtn){
    const dishName = removeBtn.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    const url = location.origin+'/cart';
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dishName
        })
    })
}