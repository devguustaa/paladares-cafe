const removerProduto = document.getElementsByClassName("btn_remove")  
for (var i = 0; i < removerProduto.length; i++) {
    removerProduto[i].addEventListener("click", function (event) {
        event.target.parentElement.parentElement.remove()
    })
}

const cartProducts = document.getElementsByClassName("cart_product") 
for (var i = 0; i < cartProducts.length; i++) {
    // console.log(cartProducts[i])
    const productPrice = cartProducts[i].getElementsByClassName("procuct_price")[0].innerText
    const productQuantity = cartProducts[i].getElementsByClassName("procuct_qtd")[0].value
    console.log(productQuantity)
}