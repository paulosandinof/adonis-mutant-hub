'use strict'
const uuid = require('uuid/v4')
const Relatorio = use('App/Models/Relatorio')
const Pessoa = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with relatorios
 */
class RelatorioController {
  /**
   * Show a list of all relatorios.
   * GET relatorios
   */
  async index ({ request, response, view }) {

    // Pega todas as entradas da tabela relatório
    const relatorios = await Relatorio.all()

    return response.status(200).json({
      mensagem: 'Todos os relatórios',
      dados: relatorios
    })
  }
    /**
   * Create/save a new relatorio.
   * GET relatorios/porcentagem
   */
  async indexPercentage({ request, response }){
    // Pega a quantidade de entradas da tabela de pessoas
    let quantidadeTotalDePessoas = await Pessoa.getCount()

    // Pega a quantidade de entradas da tabela de pessoas que possuem a mutação 1
    let quantidadeDeDenteDeNeon = await Pessoa.query().where('mutacao', '1').getCount()

    // Pega a quantidade de entradas da tabela de pessoas que possuem a mutação 2
    let quantidadeDeOlhoNaNuca = await Pessoa.query().where('mutacao', '2').getCount()

    // Para não fazer outra query ao banco, somamos as querys anteriores para 
    // obter a quantidade total de mutantes
    let quantidadeDeMutantes = quantidadeDeDenteDeNeon + quantidadeDeOlhoNaNuca
    
    // Para não fazer outra query ao banco, subtraímos as querys anteriores para
    // obter a quantidade total de pessoas saudáveis
    let quantidadeDeNaoMutantes = quantidadeTotalDePessoas - quantidadeDeMutantes

    return response.status(200).json({
      mensagem: "Relatórios por porcentagem",
      dados: {
        porcentagemDeMutantes: (quantidadeDeMutantes / quantidadeTotalDePessoas) * 100,
        porcentagemDeNaoMutantes: (quantidadeDeNaoMutantes / quantidadeTotalDePessoas) * 100,
        porcentagemDeDenteDeNeon: (quantidadeDeDenteDeNeon / quantidadeTotalDePessoas) * 100,
        porcentagemDeOlhoNaNuca: (quantidadeDeOlhoNaNuca / quantidadeTotalDePessoas) * 100 
      }
    })
  }

  /**
   * Create/save a new relatorio.
   * POST relatorios/:pessoa_id/:flag_mutacao
   */
  async store ({ params, request, response }) {
    
    // Acha a pessoa na tabela de pessoas
    const pessoa = await Pessoa.find(params.pessoa_id)

    if(pessoa){
      // Cria um novo relatório
      const relatorio = new Relatorio()
      
      relatorio.primaryKeyValue = uuid() 
      // Atribui ao relatório a flag de mutação recebida
      relatorio.mutacao = params.flag_mutacao
    
      // Salva os relatórios com a relação hasMany
      await pessoa.relatorios().save(relatorio)

      // Pega a quantidade de relatos que a pessoa recebeu
      const numeroDeRelatos = await pessoa.relatorios().getCount()

      // Quando a quantidade de relatos for igual a 3,
      // uma comparação é feita para identificar o tipo de mutação
      // e a pessoa é colocada em quarentena
      if(numeroDeRelatos === 3){
        let numeroDeDenteDeNeon = await pessoa.relatorios().where('mutacao', 1).getCount()
        let numeroDeOlhoNaNuca = await pessoa.relatorios().where('mutacao', 2).getCount()

        pessoa.localizacao = "Quarentena"

        if(numeroDeDenteDeNeon > numeroDeOlhoNaNuca){
          pessoa.mutacao = 1
        }else{
          pessoa.mutacao = 2
        }
        await pessoa.save()
      }

      return response.status(201).json({
        mensagem: 'Relato criado com sucesso',
        dados: await relatorio.pessoa().fetch()
      })
    }else{
      return response.status(400).json({
        erro: 'Usuário não encontrado'
      })
    }
  }

  /**
   * Display a single relatorio.
   * GET relatorios/:relatorio_id
   */
  async show ({ params, request, response, view }) {
    
    // Acha o relatório na tabela de relatórios
    const relatorio = await Relatorio.find(params.relatorio_id)

    if(relatorio){

    }else{

    }
  }
}

module.exports = RelatorioController
