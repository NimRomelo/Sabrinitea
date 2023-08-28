
// variable declarations with eventListeners

let removeCartItems = document.getElementsByClassName('button-remove')
    for (let i=0; i<removeCartItems.length; i++) {
        let button = removeCartItems[i]
        button.addEventListener('click', removeButtonClicked)
    }

let addCartItems = document.getElementsByClassName("button-design")
    for (let i=0; i<addCartItems.length; i++) {
        let button = addCartItems[i]
        button.addEventListener('click', addToCartClicked)
    }

let quantityInputs = document.getElementsByClassName("cart-quantity")
    for (i=0; i<quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
        console.log(input)
    }


//functions


// for removing cart items
function removeButtonClicked(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    console.log(buttonClicked)
    updateCartTotal()

}

//for updating cart total price
function updateCartTotal() {
    let total = 0
    let cartItemContainer = document.getElementsByClassName("cart-container")[0]
    console.log(cartItemContainer)
    let cartItemRow = cartItemContainer.getElementsByClassName("cart-item-row")
    console.log(cartItemRow)

    // added if statement to check if there exist a cart row
    for (let i=0; i<cartItemRow.length; i++) {
        let cartRow = cartItemRow[i]
        let cartItemPrice = cartRow.getElementsByClassName ("cart-item-price")[0]
        let price = parseFloat(cartItemPrice.innerText.replace("Php ", ""))
        console.log(price)
        let cartItemQuantity = cartRow.getElementsByClassName("cart-quantity")[0]
        let quantity = cartItemQuantity.value
        console.log(quantity)
        total = total + (price * quantity)
        console.log(total)
        document.getElementById("total-price").innerText = "Php " + total
    }  //if there is no cart-row, total should be zero
        document.getElementById("total-price").innerText = "Php " + total
    }


// for adding items to cart
function addToCartClicked (event) {
    let buttonClicked = event.target
    console.log(buttonClicked)
    let cartItem = buttonClicked.parentElement.parentElement
    console.log(cartItem)
    let itemImage = cartItem.querySelector("img").src
    console.log(itemImage)
    let itemFlavor = cartItem.querySelector("p").innerText
    console.log(itemFlavor)
    let itemPrice = cartItem.querySelector("span").innerText
    console.log(itemPrice)

    updateCartItems(itemImage, itemFlavor, itemPrice)
    updateCartTotal()   
}


//for updating cart items
function updateCartItems (itemImage, itemFlavor, itemPrice) {
    let newCartRow = document.createElement("div")
    let cartItems = document.getElementsByClassName("cart-container")[0]
    console.log(newCartRow)
    newCartRow.classList.add("cart-item-row")
    let totalPrice = cartItems.lastChild
    let newCartRowContents = `
        <img class="cart-item-image" src=${itemImage}>
        <span class="cart-item-flavor">${itemFlavor}</span>
        <span class="cart-item-price">${itemPrice}</span>
        <div class="quantity">
            <input class="cart-quantity" type="number" value="1">
            <div>
                <button class="button-quantity button-add">Add</button>
                <button class="button-quantity button-remove">Remove</button>
            </div>
        </div>`
    newCartRow.innerHTML = newCartRowContents
    cartItems.append(newCartRow)
    newCartRow.getElementsByClassName("button-remove")[0].addEventListener("click",
    removeButtonClicked)
    newCartRow.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)

}

//for managing input value and updating cart total
function quantityChanged(event) {
    let input = event.target
    if (input.value <= 0 || isNaN(input.value)) {
        input.value = 1
    }
    updateCartTotal()
}



