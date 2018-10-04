'use strict'
const uuid = require('uuid/v4')
const Relatorio = use('App/Models/Relatorio')
const Pessoa = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with relatorios
 */
class RelatorioController {
  /**
   * @api {get} /relatorios Obter uma lista de todos os relatórios
   * @apiName GetRelatorios
   * @apiGroup Relatorios
   * 
   * @apiSuccess {Object[]} dados Um array com todos os relatórios cadastrados
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": [
   *        {
   *            "id": "659aa42e-10b3-44e6-abf1-1e7ac2d167ef",
   *            "pessoa_id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *            "mutacao": 2,
   *            "created_at": "2018-10-01 13:56:36",
   *            "updated_at": "2018-10-01 13:56:36"
   *        },
   *        {
   *            "id": "67f462c0-7311-4e2d-ae89-ab47ae19393a",
   *            "pessoa_id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *            "mutacao": 2,
   *            "created_at": "2018-10-01 13:56:35",
   *            "updated_at": "2018-10-01 13:56:35"
   *        }   
   *    ]
   * }
   */
  async index ({ request, response, view }) {

    // Pega todas as entradas da tabela relatório
    const relatorios = await Relatorio.all()

    return response.status(200).json({
      dados: relatorios
    })
  }

  /**
   * @api {get} /relatorios/porcentagem Obter a porcentagem de mutantes, não-mutantes e de cada mutação
   * @apiName GetRelatoriosPorcentagem
   * @apiGroup Relatorios
   * 
   * @apiSuccess {Object} dados Um objeto com a porcentagem de mutantes, não-mutantes e de cada mutação
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "porcentagemDeMutantes": "33.33",
   *        "porcentagemDeNaoMutantes": "66.67",
   *        "porcentagemDeDenteDeNeon": "16.67",
   *        "porcentagemDeOlhoNaNuca": "16.67"
   *    }
   * }
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
      dados: {
        porcentagemDeMutantes: ((quantidadeDeMutantes / quantidadeTotalDePessoas) * 100).toFixed(2),
        porcentagemDeNaoMutantes: ((quantidadeDeNaoMutantes / quantidadeTotalDePessoas) * 100).toFixed(2),
        porcentagemDeDenteDeNeon: ((quantidadeDeDenteDeNeon / quantidadeTotalDePessoas) * 100).toFixed(2),
        porcentagemDeOlhoNaNuca: ((quantidadeDeOlhoNaNuca / quantidadeTotalDePessoas) * 100).toFixed(2) 
      }
    })
  }

  /**
   * @api {post} /relatorios/:pessoa_id/:flag_mutacao Cria e salva um novo relato sobre uma pessoa com mutação
   * @apiName PostRelatorio
   * @apiGroup Relatorios
   * 
   * @apiparam {String} pessoa_id Identificador único da pessoa
   * @apiparam {Number="1,2"} flag_mutacao Flag de identificação da doença.
   * <code>1</code> para Dente de neon e <code>2</code> para Olho na nuca
   * 
   * @apiSuccess {Object} dados Um objeto contendo as informações sobre a pessoa relatada,
   * com a mutação e a localização atualizadas caso ela esteja com mutação
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "id": "d7dedfd4-efdb-4126-8911-74e40fa5509f",
   *        "nome": "Nathanael Derick",
   *        "idade": 19,
   *        "sexo": "masculino",
   *        "localizacao": "Quarentena",
   *        "mutacao": 1,
   *        "created_at": "2018-10-01 11:19:57",
   *        "updated_at": "2018-10-03 20:45:50"
   *    }
   * }
   */
  async store ({ params, request, response }) {
    
    // Acha a pessoa na tabela de pessoas
    const pessoa = await Pessoa.find(params.pessoa_id)

    if(params.flag_mutacao )

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
        mensagem: 'Relatorio criado com sucesso',
        dados: await relatorio.pessoa().fetch()
      })
    }else{
      return response.status(400).json({
        erro: 'Pessoa não encontrada'
      })
    }
  }

  /**
   * @api {get} /relatorios/:relatorio_id Obter um relatório específico
   * @apiName GetRelatorio
   * @apiGroup Relatorios
   * 
   * @apiParam {String} relatorio_id Identificador único do relatório
   * 
   * @apiSuccess {Object} dados Um objeto com as informações de um relatório específico
   * @apiSuccessExample Exemplo de resposta:
   * {
   *    "dados": {
   *        "id": "659aa42e-10b3-44e6-abf1-1e7ac2d167ef",
   *        "pessoa_id": "10400ddb-2620-4fa9-864f-a44dad641add",
   *        "mutacao": 2,
   *        "created_at": "2018-10-01 13:56:36",
   *        "updated_at": "2018-10-01 13:56:36"
   *    }
   * }
   * 
   * @apiError {String} erro Mensagem de erro
   * @apiErrorExample Exemplo de erro:
   * {
   *    "erro": "Relatório não encontrado"
   * }
   */
  async show ({ params, request, response, view }) {
    // Acha o relatório na tabela de relatórios
    const relatorio = await Relatorio.find(params.relatorio_id)

    if(relatorio){
      return response.status(200).json({
        dados: relatorio
      })
    }else{
      return response.status(400).json({
        erro: 'Relatório não encontrado'
      })
    }
  }

  /**
   * @api {get} /relatorios/:relatorio_id/pessoa Obter a pessoa associada a um relatório específico
   * @apiName GetPessoaPorRelatorio
   * @apiGroup Relatorios
   * 
   * @apiParam {String} relatorio_id Identificador único do relatório
   * 
   * @apiSuccess {Object} dados Um objeto com os dados da pessoa associada ao relatório específico
   * @apiSuccessExample 
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
   *    "erro": "Relatório não encontrado"
   * }
   */
  async showPerson ({ params, request, response }) {
    const relatorio = await Relatorio.find(params.relatorio_id)

    if(relatorio){
      return response.status(200).json({
        dados: await relatorio.pessoa().fetch()
      })
    }else{
      return response.status(400).json({
        erro: 'Relatório não encontrado'
      })
    }
  }
}

module.exports = RelatorioController
