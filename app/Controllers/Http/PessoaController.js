'use strict'

const Pessoa = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with pessoas
 */
class PessoaController {
  /**
   * Show a list of all pessoas.
   * GET pessoas
   */
  async index ({ request, response, view }) {

    const pessoas = await Pessoa.all()

    return response.status(200).json({
      mensagem: "Todos os usuários",
      dados: pessoas
    })

  }

  /**
   * Render a form to be used for creating a new pessoa.
   * GET pessoas/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pessoa.
   * POST pessoas
   */
  async store ({ request, response }) {

    const { nome, idade, sexo, localizacao } = request.post()

    const pessoa = new Pessoa()

    pessoa.nome = nome
    pessoa.idade = idade
    pessoa.sexo = sexo
    pessoa.localizacao = localizacao

    await pessoa.save()

    return response.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      dados: pessoa
    })

  }

  /**
   * Display a single pessoa.
   * GET pessoas/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pessoa.
   * GET pessoas/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pessoa details.
   * PUT or PATCH pessoas/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pessoa with id.
   * DELETE pessoas/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PessoaController
