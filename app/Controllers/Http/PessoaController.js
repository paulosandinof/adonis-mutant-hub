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
    try{
      const { nome, idade, sexo, localizacao } = request.post()
      const pessoa = new Pessoa()

      // Como a função notNullable do Lucid permite valores vazios
      // temos que fazer a verificação para poder dar throw no erro de campo nulo
      pessoa.nome = nome ? nome : null
      pessoa.idade = idade ? idade : null
      pessoa.sexo = sexo ? sexo : null
      pessoa.localizacao = localizacao ? localizacao : null
      pessoa.mutacao = 0
  
      await pessoa.save()

      return response.status(201).json({
        mensagem: 'Usuário criado com sucesso',
        dados: pessoa
      })
    }catch(err){
      let erro = {}
      if(err.errno === 1048){
        erro = {
          codigo: 1048,
          mensagem: "Preencha corretamente todos os campos"
        }
      }
      if(err.errno === 1265){
        erro = {
          codigo: 1265,
          mensagem: "Preencha corretamente o sexo com masculino ou feminino"
        }
      }
      if(err.errno === 1366){
        erro = {
          codigo: 1366,
          mensagem: "Preencha corretamente a idade da pessoa"
        }
      }
      return response.status(400).json({
        erro: erro
      })
    }
  }

  /**
   * Display a single pessoa.
   * GET pessoas/:pessoa_id
   */
  async show ({ params, request, response }) {
    try{
      const pessoa = await Pessoa.findOrFail(params.pessoa_id)

      return response.status(200).json({
        mensagem: 'Usuário',
        dados: pessoa
      })
    }catch(err){
      console.log(err)
      return response.status(400).json({
        erro: "Usuário não encontrado"
      })
    }
  }

  /**
   * Update pessoa details.
   * PUT or PATCH pessoas/:pessoa_id
   */
  async update ({ params, request, response }) {
    //TODO tratamento de exceção e de localização
    try {
      const { nome, idade, sexo, localizacao } = request.post()

      const pessoa = await Pessoa.find(params.pessoa_id)
  
      pessoa.nome = nome
      pessoa.idade = idade
      pessoa.sexo = sexo
      pessoa.localizacao = localizacao
  
      await pessoa.save()
  
      return response.status(200).json({
        mensagem: 'Usuário atualizado',
        dados: pessoa
      }) 
    } catch (err) {
      
    }

  }

  /**
   * Delete a pessoa with id.
   * DELETE pessoas/:pessoa_id
   */
  async destroy ({ params, request, response }) {

    const pessoa = await Pessoa.find(params.pessoa_id)

    await pessoa.delete()

    return response.status(200).json({
      mensagem: 'Usuário excluído',
      dados: pessoa
    })

  }
}

module.exports = PessoaController
