class Criador {

    constructor () {
        this.marca = "Todos"
        this.selectModel = false
        this.estado = "Todos"
        this.selectCidade = false
    }

    createSelectList (list) {

        const select = document.createElement("select")

        const todos = document.createElement("option")
    
        todos.value = "Todos"
    
        todos.innerHTML = "Todos"
    
        select.appendChild(todos)
        
        for ( let v of list ) {
            const option = document.createElement("option")
    
            option.value = v
    
            option.innerHTML = v
    
            select.appendChild(option)
        }

        return select

    }

    criarSelectMarcas () {

        const todosCarros = global.getMarcarEModelos()
    
        const marcas = Object.keys(todosCarros)
    
        const select = this.createSelectList(marcas)

        select.onchange = (e) => {
            this.marca = e.target.value
            this.criarSelectModelos()
        }

        select.id = "marca"

        return select
    
    }

    criarSelectModelos () {

        if ( this.selectModel === false ) {

            this.selectModel = document.createElement("select")

        }

        this.selectModel.innerHTML = ""

        const todos = document.createElement("option")
    
        todos.value = "Todos"
    
        todos.innerHTML = "Todos"
    
        this.selectModel.appendChild(todos)

        this.selectModel.id = "modelo"

        if ( this.marca == "Todos" ) {
            return this.selectModel
        }

        for ( let v of global.getMarcarEModelos()[this.marca] ) {
            
            const option = document.createElement("option")

            option.value = v

            option.innerHTML = v

            this.selectModel.appendChild(option)

        }

        return this.selectModel

    }

    criarSelectMotor () {

        const cc = global.getAllCilindradas()

        const select = this.createSelectList(cc)

        select.id = "motor"

        return select

    }

    criarSelectCambio () {

        const cambios = global.getAllCambios()

        const select = this.createSelectList(cambios)

        select.id = "cambio"

        return select

    }

    criarSelectAno () {

        const primeiroCarro = 1885

        const dataAtual = new Date();

        const anoAtual = dataAtual.getFullYear() +1

        const select = document.createElement("select")

        const todos = document.createElement("option")
    
        todos.value = "Todos"
    
        todos.innerHTML = "Todos"
    
        select.appendChild(todos)

        for ( let v = primeiroCarro; v <= anoAtual; v++) {

            const option = document.createElement("option")

            option.value = v

            option.innerHTML = v

            select.appendChild(option)

        }

        select.id = "ano"

        return select

    }

    criarSelectCor () {

        const cores = global.getColors()

        const select = this.createSelectList(cores)

        select.id = "cor"

        return select

    }

    criarSelectDirecao () {

        const direcoes = global.getDirecao()

        const select = this.createSelectList(direcoes)

        select.id = "direcao"

        return select

    }

    criarSelectPortas () {

        const select = this.createSelectList([2, 4])

        select.id = "portas"

        return select

    }

    criarSelectValor1 () {

        const input = document.createElement("input")

        input.placeholder = "Valor minimo"

        input.id = "select-valor-minimo"

        input.oninput = () => {
            input.value = global.formatCurrency(input.value)
        }

        return input

    }

    criarSelectValor2 () {

        const input = document.createElement("input")

        input.placeholder = "Valor maximo"

        input.id = "select-valor-maximo"

        input.oninput = () => {
            input.value = global.formatCurrency(input.value)
        }

        return input

    }

    criarSelectEstado () {

        const estados = Object.keys(global.getAllEstados())

        const select = this.createSelectList(estados)

        select.onchange = (e) => {
            this.estado = e.target.value
            this.criarSelectCidades()
        }

        select.id = "estado"

        return select

    }

    criarSelectCidades () {

        if ( this.selectCidade === false ) {

            this.selectCidade = document.createElement("select")

        }

        this.selectCidade.id = "cidade"

        this.selectCidade.innerHTML = ""

        const todos = document.createElement("option")
    
        todos.value = "Todos"
    
        todos.innerHTML = "Todos"
    
        this.selectCidade.appendChild(todos)

        if ( this.estado == "Todos" ) {
            return this.selectCidade
        }

        for ( let v of global.getAllEstados()[this.estado] ) {

            const option = document.createElement("option")

            option.value = v

            option.innerHTML = v

            this.selectCidade.appendChild(option)

        }

        return this.selectCidade

    }

    criarSelectValor () {

        const input = document.createElement("input")

        input.placeholder = "Valor"

        input.id = "valor"

        input.oninput = () => {
            input.value = global.formatCurrency(input.value)
        }

        return input

    }

    criarTextArea () {

        const textArea = document.createElement("textarea")

        textArea.placeholder = "Descrição..."

        textArea.id = "desc"

        textArea.rows = 7

        return textArea

    }

    criarVizualizadorImagens (listImagens, container) {

        if ( listImagens <= 0 ) {
            return console.log("nenhuma foto adicionada");
        }

        for ( let file of listImagens ) {

            const preview = document.createElement("div")

            preview.style.cssText += `
                width:130px;
                height:130px;
                font-size:20px;
                display:flex;
                justify-content: center;
                align-items: center;
                background-color:rgb(150, 150, 150);
                border-radius:10px;
                margin:5px;
            `

            const img = document.createElement("img")

            img.style.cssText = `
                width:120px;
                height:100px;
            `

            preview.appendChild(img)

            container.appendChild(preview)

            console.log(file);

            if (file) {

                const reader = new FileReader();
                
                reader.onload = function(e) {
                    img.src = e.target.result
                }
                
                reader.readAsDataURL(file);

                console.log("foi");
            } else {
                preview.src = '';
                preview.style.display = 'none';
                console.log("erro");
            }

        }

    }

}

const criador = new Criador()


