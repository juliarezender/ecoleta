const buttonSearch = document.querySelector("#page-home main a")
const close = document.querySelector("#modal .header a")
const modal = document.querySelector("#modal")

//  toda vez que clicar a classe hide vai ser removida
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//  add event listener so funciona com elemento, não com lista
close.addEventListener("click", () => {
    modal.classList.add("hide")
})