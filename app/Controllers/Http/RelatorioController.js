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

    const relatorios = await Relatorio.all()

    let quantidadeTotalDePessoas = await Pessoa.getCount()

    let quantidadeDeDenteDeNeon = await Pessoa.query().where('mutacao', '1').getCount()
    let quantidadeDeOlhoNaNuca = await Pessoa.query().where('mutacao', '2').getCount()

    // let quantidadeDeMutantes = quantidadeDeDenteDeNeon + quantidadeDeOlhoNaNuca
    // let quantidadeDeNaoMutantes = quantidadeTotalDePessoas - quantidadeDeMutantes

    let quantidadeDeMutantes = quantidadeDeDenteDeNeon + quantidadeDeOlhoNaNuca
    let quantidadeDeNaoMutantes = quantidadeTotalDePessoas - quantidadeDeMutantes
    
    console.log(quantidadeDeNaoMutantes)

    return response.status(200).json({
      mensagem: 'Todos os relatórios',
      dados: relatorios
    })

  }

  /**
   * Create/save a new relatorio.
   * POST relatorios/:pessoa_id/:flag_mutacao
   */
  async store ({ params, request, response }) {
    
    // Acha a pessoa na tabela de pessoas
    const pessoa = await Pessoa.find(params.pessoa_id)

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

  }

  /**
   * Display a single relatorio.
   * GET relatorios/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update relatorio details.
   * PUT or PATCH relatorios/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a relatorio with id.
   * DELETE relatorios/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RelatorioController
