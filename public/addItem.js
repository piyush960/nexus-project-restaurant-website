const addBtns = document.querySelectorAll('#add-to-cart');

document.querySelectorAll('.add-to-cart').forEach(button => {

    button.addEventListener('click', e => {

        button.classList.toggle('added');

    });

});

addBtns.forEach(addBtn => {
    addBtn.addEventListener('click', (e)=>{
        postDetails(addBtn);

    })
})

async function postDetails(addBtn){
    const price = addBtn.previousElementSibling;
    const img = addBtn.parentElement.parentElement.firstElementChild;
    const dishName = addBtn.parentElement.previousElementSibling.previousElementSibling;
    const url = location.origin+'/cart';
    const response = await fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price: price.textContent.slice(1),
            img: img.src,
            dishName: dishName.textContent,
        })
    })

}