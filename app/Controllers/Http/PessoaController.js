'use strict'
const uuid = require('uuid/v4')
const Pessoa = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with pessoas
 */
class PessoaController {
  /**
   * Retorna uma lista de todas as pessoas
   * GET pessoas
   */
  async index ({ request, response }) {

    const pessoas = await Pessoa.all()

    return response.status(200).json({
      mensagem: 'Todas as pessoas',
      dados: pessoas
    })

  }

  /**
   * Cria e salva uma nova pessoa
   * POST pessoas
   */
  async store ({ request, response }) {
    try{
      const { nome, idade, sexo, localizacao } = request.post()
      const pessoa = new Pessoa()

      // Como a função notNullable do Lucid permite valores vazios
      // temos que fazer a verificação para poder dar throw no erro de campo nulo
      pessoa.id = uuid()
      pessoa.nome = nome ? nome : null
      pessoa.idade = idade ? idade : null
      pessoa.sexo = sexo ? sexo : null
      pessoa.localizacao = localizacao ? localizacao : null
      pessoa.mutacao = 0
  
      await pessoa.save()

      return response.status(201).json({
        mensagem: 'Pessoa criada com sucesso',
        dados: pessoa
      })
    }catch(err){
      let erro = {}
      if(err.errno === 1048){
        erro = {
          codigo: 1048,
          mensagem: 'Preencha corretamente todos os campos'
        }
      }
      if(err.errno === 1265){
        erro = {
          codigo: 1265,
          mensagem: 'Preencha corretamente o sexo com masculino ou feminino'
        }
      }
      if(err.errno === 1366){
        erro = {
          codigo: 1366,
          mensagem: 'Preencha corretamente a idade da pessoa'
        }
      }
      return response.status(400).json({
        erro: erro
      })
    }
  }

  /**
   * Retorna uma pessoa específica
   * GET pessoas/:pessoa_id
   */
  async show ({ params, request, response }) {
      const pessoa = await Pessoa.find(params.pessoa_id)

      if(pessoa){
        return response.status(200).json({
          mensagem: 'Pessoa',
          dados: pessoa
        })
      }else{
        return response.status(400).json({
          erro: 'Pessoa não encontrada'
        })
      }
  }

  /**
   * Retorna uma lista de relatórios associados à pessoa específica
   * GET pessoas/:pessoa_id/relatorios
   */
  async showReports ({ params, request, response }) {
    const pessoa = await Pessoa.find(params.pessoa_id)

    if(pessoa){
      return response.status(200).json({
        mensagem: 'Relatórios associados a esta pessoa',
        dados: await pessoa.relatorios().fetch()
      })
    }else{
      return response.status(400).json({
        erro: 'Pessoa não encontrada'
      })
    }
  }

  /**
   * Atualiza informações sobre uma pessoa específica
   * PUT or PATCH pessoas/:pessoa_id
   */
  async update ({ params, request, response }) {
    try{
      const { nome, idade, sexo, localizacao } = request.post()
      const pessoa = await Pessoa.find(params.pessoa_id)
  
      if(pessoa){
        pessoa.nome = nome ? nome : null
        pessoa.idade = idade ? idade : null
        pessoa.sexo = sexo ? sexo : null

        let mensagem = null
        if(pessoa.localizacao === 'Quarentena'){
          mensagem = 'Pessoa atualizada, porém ela está em quarentena e sua localização não foi alterada'
        }else{
          mensagem = 'Pessoa atualizada'
          pessoa.localizacao = localizacao ? localizacao : null
        }
    
        await pessoa.save()

        return response.status(201).json({
          mensagem: mensagem,
          dados: pessoa
        })
      }else{
        return response.status(400).json({
          erro: 'Pessoa não encontrado'
        })
      }
    }catch(err){
      let erro = {}
      if(err.errno === 1048){
        erro = {
          codigo: 1048,
          mensagem: 'Preencha corretamente todos os campos'
        }
      }
      if(err.errno === 1265){
        erro = {
          codigo: 1265,
          mensagem: 'Preencha corretamente o sexo com masculino ou feminino'
        }
      }
      if(err.errno === 1366){
        erro = {
          codigo: 1366,
          mensagem: 'Preencha corretamente a idade da pessoa'
        }
      }
      return response.status(400).json({
        erro: erro
      })
    }

  }

  /**
   * Deleta uma pessoa específica
   * DELETE pessoas/:pessoa_id
   */
  async destroy ({ params, request, response }) {

    const pessoa = await Pessoa.find(params.pessoa_id)

    if(pessoa){
      await pessoa.delete()

      return response.status(200).json({
        mensagem: 'Pessoa excluída com sucesso',
        dados: pessoa
      })
    }else{
      return response.status(400).json({
        erro: 'Pessoa não encontrada'
      })
    }
  }
}

module.exports = PessoaController
