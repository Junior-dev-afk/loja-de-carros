
//Melhorar layout assim que possivel

function gerarPaginaPesquisa () {

    const container = document.querySelector(".container")

    label("Selecionar marca")
    container.appendChild(criador.criarSelectMarcas())
    label("Selecionar modelo")
    container.appendChild(criador.criarSelectModelos())
    label("Motor")
    container.appendChild(criador.criarSelectMotor())
    label("Cambio")
    container.appendChild(criador.criarSelectCambio())
    label("Ano")
    container.appendChild(criador.criarSelectAno())
    label("Cor")
    container.appendChild(criador.criarSelectCor())
    label("Direção")
    container.appendChild(criador.criarSelectDirecao())
    label("Portas")
    container.appendChild(criador.criarSelectPortas())
    let div = document.createElement("div")
    div.appendChild(criador.criarSelectValor1())
    div.appendChild(criador.criarSelectValor2())
    container.appendChild(div)
    label("Estado do brasil")
    container.appendChild(criador.criarSelectEstado())
    label("Cidades")
    container.appendChild(criador.criarSelectCidades())

}

gerarPaginaPesquisa()

function label(text) {

    const container = document.querySelector(".container")

    const label = document.createElement("label")

    label.innerHTML = text

    container.appendChild(label)

}


document.querySelector(".btn_pesquisa-pesquisa").onclick = () => {
    
    const selects = document.querySelectorAll("select")

    const tab = {}

    for ( let v of selects ) {
        if ( v.value != "Todos" ) {
            tab[v.id] = v.value
        }
    }

    global.setEsp(tab)

    setTimeout(()=>{
        window.location.href = `${window.location.origin}/resposta`
    }, 500)

}