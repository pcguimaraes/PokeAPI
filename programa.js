var rs = require('readline-sync')
var ax = require('axios')

//entradas
var pokemonNomeId = rs.question('Digite o nome ou o ID do Pokemon: ').toLowerCase()
var pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonNomeId}`

// requisicao
ax.get(pokemonURL)
    .then(function(response){
        // map de tipos
        var tipos = response.data.types.map(tipo=>{
            return tipo.type.name
        })

        // map de habilidades
        var habilidades = response.data.abilities.map(habilidade=>{
            return habilidade.ability.name
        })
        
        var pokeID = response.data.id
        var pokeNome = response.data.name
        var pokeTipos = tipos.join(' / ')
        var pokeHabilidades = habilidades.join(', ')

        console.log('\nDados coletados. Aqui estao as informacoes do Pokemon buscado. ')
        console.log('ID do Pokemon: ', pokeID)
        console.log('Nome do Pokemon:', pokeNome)
        console.log('Tipo do Pokemon: ', pokeTipos)
        console.log('Habilidades do Pokemon: ', pokeHabilidades)
        
    })
    .catch(function(erro){
        console.log('POKEMON NAO ENCONTRAO! :(')
    })