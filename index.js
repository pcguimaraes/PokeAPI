console.log('////////////// POKEAPI //////////////')
// modulos
var rs = require('readline-sync')
var ax = require('axios')
var fs = require('fs')

function menu(){
    var menuConteudo = rs.questionInt('MENU\n[1]Consultar Pokemon\n[2]Consultar Pokedex\n[3]Voltar ao menu\n[0]Sair\n')
    if(menuConteudo === 1){
        consultaPokemon()
    }else if(menuConteudo === 2){
        consultaPokedex()
    }else if(menuConteudo === 3){
        menu()
    }else if(menuConteudo === 0){
        console.log('Obrigado por usar o PokeAPI!')
        console.log('/////////////////////////////////////')
    }else{
        console.log('numero invalido')
    }
}

menu()

function consultaPokemon(){
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

            var novoPokemon = rs.keyInYNStrict(`Deseja salvar  ${pokeNome} na sua Pokedex?`)
            if(novoPokemon){
                var pokedex = {pokeID, pokeNome, pokeTipos, pokeHabilidades}
                var jsonSerializado = JSON.stringify(pokedex)
                var caminhoDoArquivo = 'pokedex.json'
                fs.writeFileSync(caminhoDoArquivo, jsonSerializado)
                console.log(`O Pokemon ${pokeNome} foi salvo em sua Pokedex`)
                menu()
            }else{
                menu()
            }
            
        })
        .catch(function(erro){
            console.log('POKEMON NAO ENCONTRAO! :(')
        })
}

function consultaPokedex(){
    var jsonS = fs.readFileSync('pokedex.json')
    var poke = JSON.parse(jsonS)
    console.log(poke.pokeNome)
}