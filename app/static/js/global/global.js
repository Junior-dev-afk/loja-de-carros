class Global {

    constructor () {
      this.notifys = {
        container : false,
        tempo : 7000,
      }
    }

    async postarCarro (objeto) {

      const response = await fetch("/addVehicle", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(objeto)
      })

    }

    notify (msg) {

        if ( this.notifys.container === false ) {
          this.notifys.container = document.createElement("div")
          this.notifys.container.style.cssText += `
            width:660px;
            height:auto;
            position:fixed;
            right:-320px;
            top:10%;
          `
          document.querySelector(".container").appendChild(this.notifys.container)
        }

        const div = document.createElement("div")
        const label = document.createElement("label")

        div.style.cssText += `
          width: auto;
          max-width: 300px;
          height: auto;
          padding: 10px;
          background-color: rgb(4, 131, 0);
          color: white;
          border-radius: 10px;
          display:flex;
          align-items: center;
          margin-bottom:10px;
          margin-left:320px;
          transition: opacity 1s;
          z-index: 2;
        `
  
        div.innerHTML = msg

        this.notifys.container.appendChild(div)

        const pxs = 7

        const interal = setInterval(()=>{

          console.log(pxs);

          let margin = div.style["margin-left"].replace("px", "")

          div.style["margin-left"] = `${margin-pxs}px`

          if ( margin <= 0 ) {
              div.style["margin-left"] = `${0}px`
              clearInterval(interal)
              setTimeout(()=>{
                div.style.opacity = 0
              }, this.notifys.tempo-1000)
              setTimeout(()=>{
                div.remove()
              }, this.notifys.tempo)
          }

        }, 0.5)

        
    }

    async LoadPageItemFromId (id) {
      window.location.href = `${window.location.origin}/item/${id}`
    }

    getUser () {
      return "Junior"
    }

    clearFormatReal (value) {
      return value.replace(/\D/g, ''); 
    }
    
    formatCurrency(value) {
      const cleanedValue = value.replace(/\D/g, '');
  
      const number = parseFloat(cleanedValue) / 100; 
  
      const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
      });
  
      return formatter.format(number);
    }

    setEsp (tab) {
        localStorage.setItem("especificacao", JSON.stringify(tab))
    }

    getEsp () {
        return JSON.parse(localStorage.getItem("especificacao"))
    }

    async getAllVehicles () {

        const response = await fetch ( "/getAllVehicles" )

        if ( !response.ok ) {
            throw new Error("Erro ao pegar todos veiculos")
        }

        const data = await response.json()

        return data.response

    }

    async gerarCarrosPaginaInicial () {

        const todosVeh = await this.getAllVehicles()

        const container = document.querySelector(".container-carros")
        
        const quantidade = 10

        let index = 0

        for (let veh of todosVeh) {

            if ( index >= quantidade ) {
                break
            }

            index++

            let foto = "#"

            try {
                const fotos = JSON.parse(veh.fotos)
                if (fotos.length > 0) {
                    foto = fotos[0]
                }
            } catch {
                console.error("Não foi possivel converter json em list")
            }

            foto = foto.replace("app/", "")
            
            let text = `
                <div onclick = "global.LoadPageItemFromId('${veh.id}')" class="item">
                    <div class="imgs">
                        <div style=" width: 80%; height: 80%; background: url('../../${foto}') no-repeat center center / contain;" class="img"></div>
                    </div>
                    <div class="infos">
                        <div class="container-infos">
                            <label for="">Marca : ${veh.marca}</label>
                            <label for="">Modelo : ${veh.modelo}</label>
                            <label for="">Ano : ${veh.ano}</label>
                            <label for="">Valor : ${this.formatCurrency(veh.valor)}</label>
                        </div>
                    </div>
                </div>
            `

            container.innerHTML += text

        }

    }

    gerarCarroPaginaPesquisa ( carros ) {

      const container = document.querySelector(".container-carros")

      if ( carros.length < 1 ) {
          return container.innerHTML = `
              Nenhum carro encontrado
          `
      }

      for (const veh of carros) {
        
          let foto = "#"

          const fotos = JSON.parse(veh.fotos)

          try {
              if (fotos.length > 0) {
                  foto = fotos[0]
              }
          } catch {
              console.error("Não foi possivel converter json em list")
          }

          foto = foto.replace("app/", "")

          const item = document.createElement("div")
  
            const imgs = document.createElement("div")
              const btn_e = document.createElement("button")
              const img = document.createElement("div")
              const btn_d = document.createElement("button")

            const infos = document.createElement("div")
              const cont_infos = document.createElement("div")
      
          item.className = "item"

          btn_e.innerHTML = "&#171"
          btn_d.innerHTML = "&#187"

          imgs.className = "imgs"
          btn_e.className = "esquerda"
          img.className = "img"
          img.style.background = `url('../../${foto}') no-repeat center center / contain`
          btn_d.className = "direita"

          infos.className = "infos"
          cont_infos.className = "container-infos"

          cont_infos.innerHTML = `
            <label for="">Marca : ${veh.marca}</label>
            <label for="">Modelo : ${veh.modelo}</label>
            <label for="">Ano : ${veh.ano}</label>
            <label for="">Valor : ${this.formatCurrency(veh.valor)}</label>
          `

          img.onclick = () => {
            this.LoadPageItemFromId(veh.id)
          }

          imgs.appendChild(btn_e)
          imgs.appendChild(img)
          imgs.appendChild(btn_d)
          infos.appendChild(cont_infos)

          item.appendChild(imgs)
          item.appendChild(infos)

          container.appendChild(item)

          btn_e.style.visibility = "hidden"

          if (fotos.length <= 1) {
            btn_d.style.visibility = "hidden"
          } else {

            btn_e.onclick = () => {

              const img_atual = img.style.backgroundImage

              const url = img_atual.slice(5, -2).replace("../../", 'app/')

              const index = fotos.indexOf(url)

              if ( index >= 1 ) {
                const foto = fotos[index-1].replace("app/", "")
                img.style.background = `url('../../${foto}') no-repeat center center / contain`
                btn_d.style.visibility = "visible"
                if (index-1 <= 0) {
                  btn_e.style.visibility = "hidden"
                }
              }
  
            }

            btn_d.onclick = () => {

              const img_atual = img.style.backgroundImage

              const url = img_atual.slice(5, -2).replace("../../", 'app/')

              const index = fotos.indexOf(url)

              if ( index < fotos.length - 1 ) {
                const foto = fotos[index+1].replace("app/", "")
                img.style.background = `url('../../${foto}') no-repeat center center / contain`
                btn_e.style.visibility = "visible"
                if (index + 1 == fotos.length - 1) {
                  btn_d.style.visibility = "hidden"
                }
              }

            }

          }

      }

    }

    getMarcarEModelos(){
        return {
            "Toyota": ["Corolla", "Camry", "RAV4", "Highlander", "Supra"],
            "Honda": ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
            "Ford": ["Focus", "Fusion", "Escape", "Explorer", "Mustang"],
            "Chevrolet": ["Malibu", "Impala", "Equinox", "Traverse", "Camaro"],
            "Bmw": ["320i", "X5", "Z4", "M3", "M5"],
            "Audi": ["A3", "A4", "Q5", "Q7", "A6"],
            "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLA", "GLE"],
            "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
            "Kia": ["Forte", "Optima", "Sportage", "Sorento", "Stinger"],
            "Nissan": ["Altima", "Maxima", "Rogue", "Murano", "370Z"],
            "Volkswagen": ["Gol","Polo","Virtus","Jetta","Tiguan","Nivus","Taos","Arteon","Up!","Amarok","Passat","Touran","T-Cross","ID.3","ID.4","ID. Buzz"
  ]
        };
    }

    getAllCilindradas () {
        return [
            '1.0',
            '1.2',
            '1.5',
            '1.6',
            '1.8',
            '2.0',
            '2.4',
            '2.5',
            '3.0',
            '3.5',
            '4.0',
            '4.5',
            '5.0'
        ];
    }

    getAllCambios () {
        return [
            "Manual",
            "Automatico",
            "Semi-Automatico"
        ]
    }

    getColors () {
        return [
            "Branco",
            "Preto",
            "Prata",
            "Cinza",
            "Azul",
            "Vermelho",
            "Bege",
            "Verde",
            "Marrom",
            "Amarelo",
            "Laranja",
            "Rosa"
          ];
    }

    getDirecao () {
        return [
            "Manual",
            "Hidráulica",
            "Eletrica"
        ]
    }

    getAllEstados () {
        return {
            "AC": [
              "Rio Branco", "Cruzeiro do Sul", "Senador Guiomard", "Tarauacá", "Feijó", "Mâncio Lima", "Brasiléia", "Epitaciolândia", "Plácido de Castro", "Senador Guiomard"
            ],
            "AL": [
              "Maceió", "Arapiraca", "Palmeira dos Índios", "São Miguel dos Campos", "São Sebastião", "Penedo", "Delmiro Gouveia", "Coruripe", "Teotônio Vilela", "Satuba"
            ],
            "AP": [
              "Macapá", "Santana", "Laranjal do Jari", "Mazagão", "Oiapoque", "Porto Grande", "Tartarugalzinho", "Vitória do Jari", "Serra do Navio", "Amapá"
            ],
            "AM": [
              "Manaus", "Parintins", "Itacoatiara", "Coari", "Manacapuru", "Tabatinga", "Tefé", "Humaitá", "Benjamin Constant", "São Gabriel da Cachoeira"
            ],
            "BA": [
              "Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Juazeiro", "Ilhéus", "Itabuna", "Lauro de Freitas", "Eunápolis", "Porto Seguro"
            ],
            "CE": [
              "Fortaleza", "Juazeiro do Norte", "Sobral", "Maracanaú", "Crato", "Itapipoca", "Acarape", "Caucaia", "Quixadá", "Barbalha"
            ],
            "DF": [
              "Brasília", "Gama", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina", "Recanto das Emas", "Águas Claras", "Sobradinho", "Guará"
            ],
            "ES": [
              "Vitória", "Vila Velha", "Serra", "Cariacica", "Colatina", "Linhares", "Guarapari", "São Mateus", "Aracruz", "Domingos Martins"
            ],
            "GO": [
              "Goiânia", "Aparecida de Goiânia", "Anápolis", "Catalão", "Rio Verde", "Jataí", "Formosa", "Trindade", "Planaltina", "Águas Lindas de Goiás"
            ],
            "MA": [
              "São Luís", "Imperatriz", "Caxias", "Bacabal", "Timon", "Paço do Lumiar", "São José de Ribamar", "Açailândia", "Codó", "Pedreiras"
            ],
            "MT": [
              "Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Lucas do Rio Verde", "Cáceres", "Jaciara", "São Félix do Araguaia", "Nova Mutum"
            ],
            "MS": [
              "Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã", "Aquidauana", "Paranaíba", "Naviraí", "Amambai", "Terenos"
            ],
            "MG": [
              "Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem", "Betim", "Montes Claros", "Poços de Caldas", "Sete Lagoas", "Divinópolis", "Uberaba"
            ],
            "PA": [
              "Belém", "Ananindeua", "Santarém", "Marabá", "Altamira", "Paragominas", "Castanhal", "Capanema", "Barcarena", "Bragança"
            ],
            "PB": [
              "João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux", "Sousa", "Guarabira", "Cajazeiras", "Mamanguape", "Princesa Isabel"
            ],
            "PR": [
              "Curitiba", "Londrina", "Maringá", "Foz do Iguaçu", "Ponta Grossa", "São José dos Pinhais", "Cascavel", "Guarapuava", "Toledo", "Campo Largo"
            ],
            "PE": [
              "Recife", "Olinda", "Jaboatão dos Guararapes", "Caruaru", "Petrolina", "Igarassu", "Paulista", "Cabo de Santo Agostinho", "São Lourenço da Mata", "Vitoria de Santo Antão"
            ],
            "PI": [
              "Teresina", "Parnaíba", "Picos", "Floriano", "Bom Jesus", "Oeiras", "Esperantina", "São João do Piauí", "Parnaíba", "Batalha"
            ],
            "RJ": [
              "Rio de Janeiro", "Niterói", "Campos dos Goytacazes", "Petrópolis", "Volta Redonda", "Duque de Caxias", "Nova Iguaçu", "São Gonçalo", "Teresópolis", "Macaé"
            ],
            "RN": [
              "Natal", "Mossoró", "Caicó", "Açu", "Parnamirim", "Santa Cruz", "São Paulo do Potengi", "Currais Novos", "João Câmara", "Nova Cruz"
            ],
            "RS": [
              "Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria", "São Leopoldo", "Gravataí", "Canoas", "Novo Hamburgo", "Passo Fundo", "Santana do Livramento"
            ],
            "RO": [
              "Porto Velho", "Ji-Paraná", "Vilhena", "Cacoal", "Rolim de Moura", "Buritis", "Ouro Preto do Oeste", "Ariquemes", "São Francisco do Guaporé", "Costa Marques"
            ],
            "RR": [
              "Boa Vista", "Rorainópolis", "Caracaraí", "Mucajaí", "Serrinha", "Cantá", "Normandia", "Amajari", "Iracema", "São Luiz"
            ],
            "SC": [
              "Florianópolis", "Joinville", "Blumenau", "Chapecó", "Criciúma", "Lages", "Itajaí", "São José", "Jaraguá do Sul", "Balneário Camboriú"
            ],
            "SP": [
              "São Paulo", "Campinas", "Santos", "São Bernardo do Campo", "São José dos Campos", "Sorocaba", "Ribeirão Preto", "Osasco", "Jundiaí", "Piracicaba"
            ],
            "SE": [
              "Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância", "Simão Dias", "Propriá", "Nossa Senhora das Dores", "Telha", "Boquim"
            ],
            "TO": [
              "Palmas", "Araguaína", "Gurupi", "Paraíso do Tocantins", "Colinas do Tocantins", "Porto Nacional", "Tocantinópolis", "Miracema do Tocantins", "São Félix do Tocantins", "Augustinópolis"
            ]
          }
          
    }

    paginaInicialPesquisa (btn) {

      const id = btn.id

      this.setEsp({"marca" : id})

      window.location.href = `${window.location.origin}/resposta`

    }

}

const global = new Global()