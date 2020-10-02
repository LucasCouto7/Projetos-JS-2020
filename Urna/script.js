//Atribuição de variáveis globais

let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span')
let descricao = document.querySelector('.d1-4')
let aviso = document.querySelector('.d2')
let lateral = document.querySelector('.d1-right')
let numeros = document.querySelector('.d1-3')

// variáveis de ambiente
let etapaAtual = 0;
let numero = ''
let votoBranco = false
let votos = []


//Função que inicia o processo de voto
function comecarEtapa() {
    let etapa = etapas[etapaAtual]


    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {

            numeroHtml += '<div class="numero pisca"></div>'

        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }



    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}



// Função que atualiza a interface
function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.canditatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`
        aviso.style.display = 'block'

        let fotosHtml = ''
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d1-image small"><img src= "Images/${candidato.fotos[i].url}"alt = ""/>${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d1-image"><img src= "Images/${candidato.fotos[i].url}"alt = ""/>${candidato.fotos[i].legenda}</div>`
            }
        }


        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'

    }

    console.log("Candidato", candidato)

}



// Função que atribui a ação do clique para os números do teclado 
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (numero != null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }

    }
}


// Função que atribui a ação do botão 'branco'
function branco() {
    numero = ''
    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    lateral.innerHTML = ''



}


// Função que atribui a ação do botão 'confirma'
function confirma() {

    let etapa = etapas[etapaAtual]


    let votoConfirmado = false;

    if (votoBranco === true) {
        console.log("Confirmando como BRANCO")
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })

    } else if (numero.length === etapa.numeros) {
        console.log("Confirmando como " + numero)
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }


    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos)
        }
    }

}


// Função que atribui a função do botão 'corrige
function corrige() {
    comecarEtapa()

}


// Chamada da função que dá o display da tela inicial
comecarEtapa()