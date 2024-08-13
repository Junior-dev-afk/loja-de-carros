global.gerarCarrosPaginaInicial()

document.querySelector(".button_topo").onclick = () => {
    window.location.href = `${window.location.origin}/pesquisa`
}

document.querySelector(".adicionar_carro").onclick = () => {
    window.location.href = `${window.location.origin}/adicionar`
}