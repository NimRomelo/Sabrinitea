if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready () {
let removeCartItems = document.getElementsByClassName('button-remove')
    for (let i=0; i<removeCartItems.length; i++) {
        let button = removeCartItems[i]
        button.addEventListener('click', removeButtonClicked)
        console.log(button)
    }

let addCartItems = document.getElementsByClassName("button-design")
    for (let i=0; i<addCartItems.length; i++) {
        let button = addCartItems[i]
        button.addEventListener('click', addToCartClicked)
    }

let quantityInputs = document.getElementsByClassName("cart-quantity")
    for (let i=0; i<quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
        // console.log(input)
    }

}

let addQuantity = document.getElementsByClassName("button-add")
    for (let i=0; i<addQuantity.length; i++) {
        let button = addQuantity[i]
        button.addEventListener("click", addButtonClicked)
    }


// variable declarations with eventListeners




//FUNCTIONS


// for removing cart items
function removeButtonClicked(event) {
    let buttonClicked = event.target
    let quantityValue = buttonClicked.parentElement.previousElementSibling.value
    console.log(quantityValue)
    if (quantityValue < 2) {
        // buttonClicked.parentElement.parentElement.remove()
        // console.log(buttonClicked)
        // alert("Confirm Remove Item?")
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    } else {
    removeButtonDecrement (event)}

    updateCartTotal()
}

function addButtonClicked(event) {

    let buttonClicked = event.target
    let cartRowQuantity = buttonClicked.parentElement.previousElementSibling
    console.log(cartRowQuantity)
    
    // let cartContainer = document.getElementsByClassName("cart-container")[0]
    // let cartRow = cartContainer.getElementsByClassName("cart-item-row")[0]
    // let cartQuantity = cartRow.getElementsByClassName("cart-quantity")
    // console.log(cartQuantity.value)

    newCartRowQuantity = parseInt(cartRowQuantity.value) + 1

    cartRowQuantity.value = newCartRowQuantity

    updateCartTotal()
}

function removeButtonDecrement(event) {
    
    let buttonClicked = event.target
    console.log(buttonClicked)
    let quantity = buttonClicked.parentElement.previousElementSibling
    // console.log(quantity)
    newQuantity = parseInt(quantity.value) - 1
    console.log(newQuantity)

    quantity.value = newQuantity
        
    
  
}



//for updating cart total price
function updateCartTotal() {
    let total = 0
    let cartItemContainer = document.getElementsByClassName("cart-container")[0]
    // console.log(cartItemContainer)
    let cartItemRow = cartItemContainer.getElementsByClassName("cart-item-row")
    // console.log(cartItemRow)

    //loop for looking at the cart row data and calculating total price
    for (let i=0; i<cartItemRow.length; i++) {
        let cartRow = cartItemRow[i]
        let cartItemPrice = cartRow.getElementsByClassName ("cart-item-price")[0]
        let price = parseFloat(cartItemPrice.innerText.replace("Php ", ""))
        // console.log(price)
        let cartItemQuantity = cartRow.getElementsByClassName("cart-quantity")[0]
        let quantity = cartItemQuantity.value
        // console.log(quantity)
        total = total + (price * quantity)
        // console.log(total)
        document.getElementById("total-price").innerText = "Php " + total
    }  //if there is no cart-row, total should be zero
        document.getElementById("total-price").innerText = "Php " + total
    }


// for adding items to cart
//defining the variables to be used in injecting new cart items
function addToCartClicked (event) {
    let buttonClicked = event.target
    let cartItem = buttonClicked.parentElement.parentElement
    let itemImage = cartItem.querySelector("img").src
    let itemFlavor = cartItem.querySelector("p").innerText
    let itemPrice = cartItem.querySelector("span").innerText

    updateCartItems(itemImage, itemFlavor, itemPrice)
    updateCartTotal()   
}


//for updating cart items
function updateCartItems (itemImage, itemFlavor, itemPrice) {
    //defining the variables for containing the cart items
    let newCartRow = document.createElement("div")
    let cartItems = document.getElementsByClassName("cart-container")[0]
    let itemFlavorName = cartItems.getElementsByClassName("cart-item-flavor")


    //add if statement to check if item is already listed
    for (let i=0; i<itemFlavorName.length; i++) {
        if (itemFlavorName[i].innerText == itemFlavor) {
            alert("This item is already added to the cart")
            return
        }
    }

    //this is to add style to the new div element
    newCartRow.classList.add("cart-item-row")

    //this is the html of the new cart item
    let newCartRowContents = `
            <img class="cart-item-image row-items" src=${itemImage}>
            <span class="cart-item-flavor row-items">${itemFlavor}</span>
            <span class="cart-item-price row-items">${itemPrice}</span>
            <input class="cart-quantity row-items" type="number" value="1">
            <div class="button-container row-items">
                <button class="button-quantity button-add">Add</button>
                <button class="button-quantity button-remove">Remove</button>
            </div>`

    //this injects the newCartRowContents html in the created div
    newCartRow.innerHTML = newCartRowContents

    //this places the new cart row div as a child of the parent, cartItems
    cartItems.append(newCartRow)

    //adding functionality to the newly added cart rows
    newCartRow.getElementsByClassName("button-remove")[0].addEventListener("click",
    removeButtonClicked)
    newCartRow.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)
    newCartRow.getElementsByClassName("button-add")[0].addEventListener("click", addButtonClicked)
    

}

//for managing input value and updating cart total
function quantityChanged(event) {
    let input = event.target
    if (input.value <= 0 || isNaN(input.value)) {
        input.value = 1
    }
    updateCartTotal()
}

//for the Add button to add item quantity
// function addButtonClicked(event) {
//     let added = event.target
//     console.log(added)