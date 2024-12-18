if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalAmount = "0,00"

function ready() {
    const removeProduct = document.getElementsByClassName("btn_remove")
    for (var i = 0; i < removeProduct.length; i++) {
        removeProduct[i].addEventListener("click", removeProduct)
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", updateTotal)
    }

    const addToCartButtons = document.getElementsByClassName("btn_carrinho")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addProductToCart)
    }

    const purchaseButton = document.getElementsByClassName("btn_finalizar")
    purchaseButton.addEventListener("click", makePurchase)
}

function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio")
    } else {
        alert(
            `
            Pedido recebido!
            Valor do pedido: R$${totalAmount}
            `
        )
    }

    document.querySelector("cart-table tbody").innerHTML = ""
    updateTotal()
}
function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    }

    updateTotal()
}

function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("card_image")[0].src
    const productTitle = productInfos.getElementsByClassName("card_title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("card_preco")[0].innerText

    const productCartName = document.getElementsByClassName("card_title")
    for (var i = 0; i < productCartName.length; i++) {
        if (productCartName[i].innerText === productTitle) {
            productCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
    <tr class="cart-product">
    <td class="product_identification">
                            <img  src="${productImage} alt="${productTitle}">
                            <strong class="product_title">${productTitle}</strong>
                        </td>
                        <td>
                            <span class="product_price">${productPrice}</span>
                        </td>
                        <td>
                            <input class="product_qtd" type="number" value="1" min="0" class="product-qtd-input">
                            <button class="btn_remove">Remover</button>
                        </td>
                        </tr>
    `
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("btn_remove")[0].addEventListener("click", removeProduct)
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}
function updateTotal() {
    let totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < cartProducts.length; i++) {
        // console.log(cartProducts[i])
        const productPrice = cartProducts[i].getElementsByClassName("card_preco")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product_qtd")[0].value
        console.log(productQuantity)

        totalAmount += productPrice * productQuantity;
    }
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}

// cadastro usuário
let nome = prompt("Qual o seu nome?")
let mesa = prompt("E qual o número de sua mesa?")
sessionStorage.setItem("cliente", nome)
sessionStorage.setItem("mesa", mesa)
