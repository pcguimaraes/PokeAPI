var rs = require('readline-sync')
    class Pokemon{
        constructor(nomeI, modelo, cor){
            this.nome = nome
            this.modelo = modelo
            this.cor = cor
        }
    }
    
    // PEGANDO DADOS DO PRIMEIRO CARRO
        var nomeC = rs.question('Digite o nome do primeiro carro: ')
        var modeloC = rs.question('Digite o modelo do primeiro carro: ')
        var corC = rs.question('Digite a cor do primeiro carro: ')
    
        var carro1 = new Carro(nomeC, modeloC, corC)
        console.log('\nPRIMEIRO CARRO CADASTRADO!')
        console.log(`Nome: ${carro1.nome}`)
        console.log(`Modelo: ${carro1.modelo}`)
        console.log(`Cor: ${carro1.cor}`)

/*
    
    // PEGANDO DADOS DO SEGUNDO CARRO
        nomeC = rs.question('Digite o nome do segundo carro: ')
        modeloC = rs.question('Digite o modelo do segundo carro: ')
        corC = rs.question('Digite a cor do segundo carro: ')
    
        var carro2 = new Carro(nomeC, modeloC, corC)
        console.log('\nSEGUNDO CARRO CADASTRADO!')
        console.log(`Nome: ${carro2.nome}`)
        console.log(`Modelo: ${carro2.modelo}`)
        console.log(`Cor: ${carro2.cor}`)
    
    // VERIFICA SE SAO IGUAIS
        if((carro1.nome === carro2.nome) && (carro1.modelo === carro2.modelo)){
            console.log('\nCARROS IGUAIS!')
        }else{
            console.log('\nCARROS DIFERENTES!')
        }
    
*/