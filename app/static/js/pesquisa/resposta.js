async function filtrarVehiculo (){

    const vehs = await global.getAllVehicles()

    const objs = global.getEsp()

    const filtrados = []

    for ( let v of vehs ) {

        const keys = Object.keys(v)
        let passou = true

        for ( let i of keys ) {
            
            if ( Object.keys(objs).includes(i) ) {

                if ( !(v[i] == objs[i]) ) {
                    passou = false
                }
            }
        }

        if ( passou ) {
            filtrados.push(v)
        }

    }

    return filtrados

}

async function gerarCarrosPesquisados () {
    const filtrados = await filtrarVehiculo()

    global.gerarCarroPaginaPesquisa(filtrados)
}

gerarCarrosPesquisados()