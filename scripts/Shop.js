function OpenProduct(id) {
    document.getElementsByClassName("ShopItemContainer")[0].scrollIntoView(true)
    fetch('/API/Product/' + id)
    .then(response => response.json())
    .then(function(json) {
        document.getElementById("ShopSelectedItemImage").src = json.thumbnail_url
        document.getElementById("ShopSelectedItemTitle").innerHTML = json.name
        document.getElementById("ShopSelectedItemPrice").innerHTML = "$" + json.more.sync_variants[0].retail_price
    })
}

if (window.location.pathname.includes("/Shop")) {
    if (window.location.hash) {
        document.getElementById("ShopItemsContainer").style.display = "none";
        document.getElementById("Item").style.display = "block";
    }
    else {
        document.getElementById("ShopItemsContainer").style.display = "flex";
        document.getElementById("Item").style.display = "none";
    }
}