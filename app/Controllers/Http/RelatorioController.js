'use strict'

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
    
    const pessoa = await Pessoa.find(params.pessoa_id)

    const relatorio = new Relatorio()
    relatorio.mutacao = params.flag_mutacao
  
    await pessoa.relatorios().save(relatorio)

    return response.status(201).json({
      mensagem: 'Relato criado com sucesso',
      dados: relatorio
    })

  }

  /**
   * Display a single relatorio.
   * GET relatorios/:id
   */
  async show ({ params, request, response, view }) {

    // const relatorio = await Relatorio.find(params.id)

    // return response.status(200).json({
    //   mensagem: "Relato",
    //   dados: relatorio
    // })

    const relatorio = await Relatorio.find(params.id)

    return relatorio.pessoa()

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
