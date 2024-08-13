function gerarPaginaAdicionar () {
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
    div.appendChild(criador.criarSelectValor())
    container.appendChild(div)
    label("Estado do brasil")
    container.appendChild(criador.criarSelectEstado())
    label("Cidades")
    container.appendChild(criador.criarSelectCidades())
    label("Descrição")
    container.appendChild(criador.criarTextArea())

}

function label(text) {

    const container = document.querySelector(".container")

    const label = document.createElement("label")

    label.innerHTML = text

    container.appendChild(label)

}

gerarPaginaAdicionar()

const todasFotos = []

function adicionarImagem () {
    const input = document.getElementById('imagem');
    const file = input.files[0];
    todasFotos.push(file)
    console.log(file);
}

let vendo_fotos = false

function verImagens () {

    const container = document.querySelector(".container-mostrar-fotos") 

    const list = todasFotos

    container.innerHTML = ""

    if ( list.length <= 0 ) {
        return console.log("adicione imagens");
    }

    if ( vendo_fotos ) {

        return vendo_fotos = false

    }
    vendo_fotos = true

    const container_foto = document.createElement("div")

    container_foto.style.cssText += `
        width: calc(100% - 70px); 
        height: 100%;
        position:fixed;
        top:0px;
        left:0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    `

    container.appendChild(container_foto)

    criador.criarVizualizadorImagens(list, container_foto)
}

document.querySelector(".enviar").onclick = async () => {

    const selects = document.querySelectorAll("select")

    let pass = true

    const objeto = {}

    for ( let v of selects ) {
        if ( v.value == "Todos" ) {
            pass = false
            break
        }
        objeto[v.id] = v.value
    }

    const valor = global.clearFormatReal(document.getElementById("valor").value)

    if ( !pass ) {
        return global.notify("Adicione todos os items")
    }

    if ( valor.trim().length <= 0 ) {
        return global.notify("Digite o valor do veiculo")
    }

    if ( valor < 100 ) {
        return global.notify("O valor deve ser maior ou igual a 1,00 real")
    }

    objeto["valor"] = valor

    if ( todasFotos.length <= 0 ) {
        return global.notify("Adicione ao menos uma foto a sua publicacao")
    }

    objeto["desc"] = document.getElementById("desc").value

    objeto["dono"] = global.getUser()

    objeto["fotos"] = await salvarImagens()

    await global.postarCarro(objeto)

    window.location.href = `${window.location.origin}/home`

}

async function salvarImagem (img) {

    const formData = new FormData()
    formData.append("file", img)
    formData.append("texto", global.getUser());

    const response = await fetch("/upload", {
        method : "POST",
        body : formData
    })

    if ( !response.ok ) {
        throw new Error("Erro ao salvar imagens no servidor")
    }

    const data = await response.json()

    return data.src

}

async function salvarImagens () {

    list = todasFotos

    const todasFotosSalvas = []

    for ( let file of list ) {
        todasFotosSalvas.push(await salvarImagem(file))
    }

    return todasFotosSalvas

}
