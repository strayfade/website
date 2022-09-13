function SearchArticle() {
    let Searched = document.getElementById("PageSearchBox").value
    let Articles = document.getElementsByClassName("ArticleIndexBox")
    for (var x = 0; x < Articles.length; x++) {
        if (Articles[x].childNodes[0].innerHTML.toLowerCase().includes(Searched.toLowerCase())) {
            Articles[x].classList.remove("Hidden")
        }
        else {
            Articles[x].classList.add("Hidden")
        }
    }
}