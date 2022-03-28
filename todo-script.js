// let list = []

// function CreateTask() {
//     let DataOnInput = document.querySelector("#input").value
//     list.push(DataOnInput)
//     let ElementShow = document.querySelector("#to-do-list")
//     let DataToElement = document.createElement("p")
//     let CheckBox = document.createElement('input')
//     CheckBox.type = "checkbox"
//     DataToElement.appendChild(document.createTextNode(list[list.length - 1]))
//     DataToElement.appendChild(CheckBox)
//     ElementShow.appendChild(DataToElement)
//     document.getElementById("input").value = ''
// }

// let banco = [
//     { 'tarefa': 'Estudar Js', 'status': '' },
//     { 'tarefa': 'Netflix', 'status': 'checked' },

// ]


const getBanco = () => JSON.parse(localStorage.getItem('to-do-list')) ?? [];
const setBanco = (banco) => localStorage.setItem('to-do-list', JSON.stringify(banco))

const criarItem = (task, status, indice) => {
    const item = document.createElement("label")
    item.classList.add('task-list-item')
    item.innerHTML = `
    <input id="CheckBox" type="checkbox" ${status} data-indice= ${indice}>
    <div>${task}</div>
    <input id="DeleteButton" type="button" value="Delete" data-indice= ${indice}>`
    document.querySelector('.to-do-list').appendChild(item)

}

const limparTarefas = () => {
    const todoList = document.querySelector('.to-do-list')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice))
}

const inserirItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if (tecla === 'Enter') {
        const banco = getBanco()
        banco.push({ 'tarefa': texto, 'status': '' })
        setBanco(banco)
        atualizarTela()
        evento.target.value = ''
    }
}

const removerItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco);
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}


const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice)
    } else if (elemento.type == 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice)
    }
}

document.getElementById("addTask").addEventListener('keypress', inserirItem)
document.querySelector(".to-do-list").addEventListener('click', clickItem)


atualizarTela()