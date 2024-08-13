
const fotosJSON = document.getElementById('foto_item').dataset.fotos;
const fotos = JSON.parse(fotosJSON); // Converte JSON para array JavaScript

if (fotos.length <= 1) {
    document.querySelector(".d").style.visibility = "hidden"
}

const valor = document.getElementById("valor")
const preco = valor.innerHTML.replace("<strong>Preço:</strong> R$ ", '')
valor.innerHTML = `<strong>Preço:</strong> ${global.formatCurrency(preco)}`

let index = 0;

function moverDireita(btn) {
    const container = document.getElementById("foto_item");
    const btn_e = document.querySelector(".e");
    const quantidade = fotos.length;
    if (index < quantidade - 1) {
        index++;
        const foto = fotos[index];
        container.src = foto;
        btn_e.style.visibility = "visible";
    }
    if (index === quantidade - 1) {
        btn.style.visibility = "hidden";
    }
}

function moverEsquerda(btn) {
    const container = document.getElementById("foto_item");
    const btn_d = document.querySelector(".d");
    const quantidade = fotos.length;
    if (index > 0) {
        index--;
        const foto = fotos[index];
        container.src = foto;
        btn_d.style.visibility = "visible";
    }
    if (index === 0) {
        btn.style.visibility = "hidden";
    }
}
