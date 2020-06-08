function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
   
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} ) /*arrow function, o mesmo que função anonima*/
    /*.then( res => res.json() ) igual a linha superior*/
    .then( states => {
        
        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )

}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]") /*pode ou não ter o select, ou input antes do colchete*/
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]") /*quando mudar algo no select selecionado*/
    .addEventListener("change", getCities) /*Quando ocorrer uma change ele chama essa função*/

//  Itens de coleta
//  pegar todos os li's

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)  /*vai ouvir todos os elementos de itens grid li, quando clicados
                                                        quando clicado vai chamar a função*/
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem() {

    const itemLi = event.target

    //  adicionar ou remover uma classe com javascript

    itemLi.classList.toggle("selected") //  verifica se na lista de classes tem uma selected, e aplica toggle nela

    const itemId = itemLi.dataset.id

    //  verificar quais itens selecionados, se sim pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => item == itemId)
    
    //  se ja estiver selecionado, tirar da seleção
    if( alreadySelected >= 0 ){
        const filteredItems = selectedItems.filter( item => item != itemId)
        selectedItems = filteredItems
    } else {  //  se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems

    //  atualizar o campo escondido com os itens selecionados
}