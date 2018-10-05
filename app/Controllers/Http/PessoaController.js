'use strict'
const uuid = require('uuid/v4')
const Pessoa = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with pessoas
 */
class PessoaController {
  /**
   * @api {get} /pessoas Obter uma lista de todas as pessoas
   * @apiName GetPessoas
   * @apiGroup Pessoas
   * 
   * @apiSuccess {Object[]} dados Um array com todas as pessoas cadastradas
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": [
   *        {
   *            "id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *            "nome": "Paulo Sandino",
   *            "idade": 22,
   *            "sexo": "masculino",
   *            "localizacao": "Quarentena",
   *            "mutacao": 2,
   *            "created_at": "2018-10-01 11:18:51",
   *            "updated_at": "2018-10-01 13:56:36" 
   *        },
   *        {
   *            "id": "62d42d28-f5ae-48bc-bc79-50bf40865645",
   *            "nome": "Maria Imaculada",
   *            "idade": 73,
   *            "sexo": "feminino",
   *            "localizacao": "Rua Camboriú",
   *            "mutacao": 0,
   *            "created_at": "2018-10-01 11:26:00",
   *            "updated_at": "2018-10-01 11:26:00"
   *        }
   *    ]
   * }  
   */
  async index ({ request, response }) {

    const pessoas = await Pessoa.all()

    return response.status(200).json({
      dados: pessoas
    })

  }

  /**
   * @api {post} /pessoas Criar e salvar uma nova pessoa
   * @apiName PostPessoa
   * @apiGroup Pessoas
   * 
   * @apiParam {String} nome Nome da pessoa
   * @apiParam {Number} idade Idade da pessoa
   * @apiParam {String="masculino, feminino"} sexo Sexo da pessoa
   * @apiParam {String} localizacao Localização da pessoa 
   * 
   * @apiSuccess {Object} dados Um objeto com todas as informações da pessoa
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *        "nome": "Paulo Sandino",
   *        "idade": 22,
   *        "sexo": "masculino",
   *        "localizacao": "Quarentena",
   *        "mutacao": 2,
   *        "created_at": "2018-10-01 11:18:51",
   *        "updated_at": "2018-10-01 13:56:36" 
   *    }
   * }
   * 
   * @apiError {String} erro Mensagem de erro
   * @apiErrorExample Exemplo de erro:
   * {
   *    "erro": "Preencha corretamente todos os campos"
   * }
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
        dados: pessoa
      })
    }catch(err){
      let erro = null
      if(err.errno === 1048){
        erro = 'Preencha corretamente todos os campos'
      }else if(err.errno === 1265){
        erro = 'Preencha corretamente o sexo com masculino ou feminino'
      }else if(err.errno === 1366){
        erro = 'Preencha corretamente a idade da pessoa'
      }
      return response.status(400).json({
        erro: erro
      })
    }
  }

  /**
   * @api {get} /pessoas/:pessoa_id Obter uma pessoa específica
   * @apiName GetPessoa
   * @apiGroup Pessoas
   * 
   * @apiParam {String} pessoa_id Identificador único da pessoa
   * 
   * @apiSuccess {Object} dados Um objeto com todas as informações de uma pessoa específica
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *        "nome": "Paulo Sandino",
   *        "idade": 22,
   *        "sexo": "masculino",
   *        "localizacao": "Quarentena",
   *        "mutacao": 2,
   *        "created_at": "2018-10-01 11:18:51",
   *        "updated_at": "2018-10-01 13:56:36" 
   *    }
   * }
   * 
   * @apiError {String} erro Mensagem de erro
   * @apiErrorExample Exemplo de erro:
   * {
   *    "erro": "Pessoa não encontrada"
   * }
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
   * @api {get} /pessoas/:pessoa_id/relatorios Obter uma lista de relatórios associados a uma pessoa específica
   * @apiName GetRelatoriosPorPessoa
   * @apiGroup Pessoas
   * 
   * @apiParam {String} pessoa_id Identificador único da pessoa
   * 
   * @apiSuccess {Object[]} dados Um array com todos os relatórios associados a uma pessoa específica
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": [
   *        {
   *          "id": "659aa42e-10b3-44e6-abf1-1e7ac2d167ef",
   *          "pessoa_id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *          "mutacao": 2,
   *          "created_at": "2018-10-01 13:56:36",
   *          "updated_at": "2018-10-01 13:56:36" 
   *        },
   *        {
   *          "id": "65967f462c0-7311-4e2d-ae89-ab47ae19393a",
   *          "pessoa_id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *          "mutacao": 1,
   *          "created_at": "2018-10-01 13:56:34",
   *          "updated_at": "2018-10-01 13:56:34"
   *        }
   *    ]
   * }
   * 
   * @apiError {String} erro Mensagem de erro
   * @apiErrorExample Exemplo de erro:
   * {
   *    "erro": "Pessoa não encontrada"
   * }
   */
  async showReports ({ params, request, response }) {
    const pessoa = await Pessoa.find(params.pessoa_id)

    if(pessoa){
      return response.status(200).json({
        dados: await pessoa.relatorios().fetch()
      })
    }else{
      return response.status(400).json({
        erro: 'Pessoa não encontrada'
      })
    }
  }

  /**
   * @api {put} /pessoas/:pessoa_id Atualizar informações sobre uma pessoa específica
   * @apiName PutPessoa
   * @apiGroup Pessoas
   * 
   * @apiParam {String} pessoa_id Identificador único da pessoa
   * 
   * @apiParam {String} nome Nome da pessoa
   * @apiParam {Number} idade Idade da pessoa
   * @apiParam {String="masculino, feminino"} sexo Sexo da pessoa
   * @apiParam {String} localizacao Localização da pessoa 
   * 
   * @apiSuccess {Object} dados Um objeto com todas as informações da pessoa
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *        "nome": "Paulo Sandino",
   *        "idade": 22,
   *        "sexo": "masculino",
   *        "localizacao": "Quarentena",
   *        "mutacao": 2,
   *        "created_at": "2018-10-01 11:18:51",
   *        "updated_at": "2018-10-01 13:56:36" 
   *    }
   * }
   * 
   * @apiError {String} erro Mensagem de erro
   * @apiErrorExample Exemplo de erro 1:
   * {
   *    "erro": "Preencha corretamente todos os campos"
   * }
   * @apiErrorExample Exemplo de erro 2:
   * {
   *    "erro": "Pessoa não encontrada"
   * }
   */
  async update ({ params, request, response }) {
    try{
      const { nome, idade, sexo, localizacao } = request.post()
      const pessoa = await Pessoa.find(params.pessoa_id)
  
      if(pessoa){
        pessoa.nome = nome ? nome : null
        pessoa.idade = idade ? idade : null
        pessoa.sexo = sexo ? sexo : null

        if(!(pessoa.localizacao === 'Quarentena')){
          pessoa.localizacao = localizacao ? localizacao : null
        }
    
        await pessoa.save()

        return response.status(201).json({
          dados: pessoa
        })
      }else{
        return response.status(400).json({
          erro: 'Pessoa não encontrada'
        })
      }
    }catch(err){
      let erro = null
      if(err.errno === 1048){
        erro = 'Preencha corretamente todos os campos'
      }
      if(err.errno === 1265){
        erro = 'Preencha corretamente o sexo com masculino ou feminino'
      }
      if(err.errno === 1366){
        erro = 'Preencha corretamente a idade da pessoa'
      }
      return response.status(400).json({
        erro: erro
      })
    }

  }

  /**
   * @api {delete} /pessoas/:pessoa_id Excluir uma pessoa específica
   * @apiName DeletePessoa
   * @apiGroup Pessoas
   * 
   * @apiParam {String} pessoa_id Identificador único da pessoa
   * 
   * @apiSuccess {Object} dados Um objeto com todas as informações da pessoa
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *        "nome": "Paulo Sandino",
   *        "idade": 22,
   *        "sexo": "masculino",
   *        "localizacao": "Quarentena",
   *        "mutacao": 2,
   *        "created_at": "2018-10-01 11:18:51",
   *        "updated_at": "2018-10-01 13:56:36" 
   *    }
   * }
   * 
   * @apiError {String} erro Mensagem de erro
   * @apiErrorExample Exemplo de erro:
   * {
   *    "erro": "Pessoa não encontrada"
   * }
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
