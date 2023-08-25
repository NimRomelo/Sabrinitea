
let removeCartItems = document.getElementsByClassName('button-remove')
console.log(removeCartItems)
for (let i=0; i<removeCartItems.length; i++) {
    let button = removeCartItems[i]
    button.addEventListener('click', function(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
    })
}