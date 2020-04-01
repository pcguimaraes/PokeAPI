// modulos
var rs = require('readline-sync')
var ax = require('axios')

// requisicao
ax.get('https://pokeapi.co/api/v2/pokemon/crobat/')
    .then(function(response){
        console.log('ID: ', response.data.id)
        console.log('Nome: ', response.data.name)

        var tipos = response.data.types.map(tipo=>{
            return tipo.type.name
        })
        console.log('Tipos: ', tipos.join(', '))

        var habilidades = response.data.abilities.map(habilidade=>{
            return habilidade.ability.name
        })
        console.log('Habilidades: ', habilidades.join(', '))         
        
    })
    .catch(function(erro){
        console.log('ERRO DE CONEXAO')
    })