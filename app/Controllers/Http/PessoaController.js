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
  async index ({ request, response }) {

    const pessoas = await Pessoa.all()

    return response.status(200).json({
      mensagem: "Todos os usuários",
      dados: pessoas
    })

  }

  /**
   * Create/save a new pessoa.
   * POST pessoas
   */
  async store ({ request, response }) {
    //TODO tratamento de exceção
    const { nome, idade, sexo, localizacao } = request.post()

    const pessoa = new Pessoa()

    pessoa.nome = nome
    pessoa.idade = idade
    pessoa.sexo = sexo
    pessoa.localizacao = localizacao
    pessoa.mutacao = 0

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
  async show ({ params, request, response }) {
    //TODO tratamento de exceção
    const pessoa = await Pessoa.find(params.id)

    return response.status(200).json({
      mensagem: 'Usuário',
      dados: pessoa
    })

  }

  /**
   * Update pessoa details.
   * PUT or PATCH pessoas/:id
   */
  async update ({ params, request, response }) {
    //TODO tratamento de exceção e de localização
    const { nome, idade, sexo, localizacao } = request.post()

    const pessoa = await Pessoa.find(params.id)

    pessoa.nome = nome
    pessoa.idade = idade
    pessoa.sexo = sexo
    pessoa.localizacao = localizacao

    await pessoa.save()

    return response.status(201).json({
      mensagem: 'Usuário atualizado',
      dados: pessoa
    })

  }

  /**
   * Delete a pessoa with id.
   * DELETE pessoas/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PessoaController
