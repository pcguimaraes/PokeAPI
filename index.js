// modulos
var rs = require('readline-sync')
var ax = require('axios')
var fs = require('fs')
var pokemons = []

// objetos
class ObjPokemon{
    constructor(pokeID, pokeNome, pokeTipos, pokeHabilidades){
        this.pokeID = pokeID
        this.pokeNome = pokeNome
        this.pokeTipos = pokeTipos
        this.pokeHabilidades = pokeHabilidades
    }
}

// consulta api
function consultaPokemon(){
    //entradas
    var buscaPokemon = rs.question('Digite o nome ou o ID do Pokemon: ').toLowerCase()
    var pokemonURL = `https://pokeapi.co/api/v2/pokemon/${buscaPokemon}`

    // requisicao
    ax.get(pokemonURL)
        .then(function(response){
             // map de tipos e habilidades
            var tipos = response.data.types.map(tipo=>tipo.type.name)
            var habilidades = response.data.abilities.map(habilidade=>habilidade.ability.name)

            // transformando o pokemon em um objeto
            var objPokemon = new ObjPokemon(response.data.id, response.data.name, tipos.join(' / '), habilidades.join(', '))


            // resposta
            console.log('\nDados coletados. Aqui estao as informacoes do Pokemon buscado. ')
            console.log(`${objPokemon.pokeID} - ${objPokemon.pokeNome}`)
            console.log('Tipo: ', objPokemon.pokeTipos)
            console.log('Habilidades: ', objPokemon.pokeHabilidades)

            // chama pokedex
            salvaPokemon(objPokemon)
            console.log('O que vc deseja fazer agora?')
            menu()
        })
        .catch(function(erro){
            console.log('POKEMON NAO ENCONTRADO! :(')
            console.log('O que vc deseja fazer agora?')
            menu()
        })

}

function salvaPokemon(objPokemon){
    var novoPokemon = rs.keyInYNStrict(`Deseja salvar ${objPokemon.pokeNome} na sua Pokedex?`)
    
     if(novoPokemon){
         pokemons.push(objPokemon)
        var objSerializado = JSON.stringify(pokemons)
        var caminhoDoArquivo = 'pokedex.json'
        fs.writeFileSync(caminhoDoArquivo, objSerializado)
        console.log(`O Pokemon ${objPokemon.pokeNome} foi salvo em sua Pokedex!`)
        
        
        
    }else{

    }
}

function inicio(){
    console.log('///////////////////// POKEAPI /////////////////////')
    console.log('Sistema desenvolvido por PC Guimaraes em um projeto da Arbyte.\nTrabalhando com API do Pokemon.')
    var jsonSerializado = fs.readFileSync('pokedex.json')
    var pokedexVazia = fs.readFileSync('pokedexVazia.json')
    if (jsonSerializado.length == pokedexVazia.length){
        console.log('Sua Pokedex ainda esta vazia!')

        var objSerializado = JSON.stringify(pokemons)
        var caminhoDoArquivo = 'pokedex.json'
        fs.appendFile(caminhoDoArquivo, objSerializado, err => {
            console.log(err || `Capture o seu primeiro Pokemon!`)
        })
    }else{
        var pokedexAtualizada = JSON.parse(jsonSerializado)
        if(pokedexAtualizada == ''){
            console.log('Sua Pokedex ainda esta vazia!')
        }else{
            var pokedexAtualizada = JSON.parse(jsonSerializado)
            pokemons = pokedexAtualizada
        }
    }
    menu()

}

function consultaPokedex(pokemons){
    console.log('SUA POKEDEX')
    var pokemonsNaPokedex = pokemons.map(function(pokemonNaPokedex){
        console.log(`${pokemonNaPokedex.pokeID} - ${pokemonNaPokedex.pokeNome}`)
    })
    console.log('\nO que vc quer fazer agora?')
    menu()
}

function menu(){
    var menuConteudo = rs.questionInt('Escolha uma das opcoes abaixo:\n[1]Consultar Pokemon\n[2]Consultar Pokedex\n[3]Voltar ao menu\n[0]Sair\n')
    if(menuConteudo === 1){
        consultaPokemon()
    }else if(menuConteudo === 2){
        consultaPokedex(pokemons)
    }else if(menuConteudo === 3){
        menu()
    }else if(menuConteudo === 0){
        console.log('Obrigado por usar o PokeAPI!')
        console.log('/////////////////////////////////////')
    }else{
        console.log('Digite um numero valido.')
        menu()
    }
}

inicio()


