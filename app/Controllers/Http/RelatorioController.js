'use strict'
const uuid = require('uuid/v4')
const Relatorio = use('App/Models/Relatorio')
const Pessoa = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with relatorios
 */
class RelatorioController {
  /**
   * Retorna uma lista de todos os relatorios
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
   * Retorna os relatorios de porcentagem da população
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
        porcentagemDeMutantes: ((quantidadeDeMutantes / quantidadeTotalDePessoas) * 100).toFixed(2),
        porcentagemDeNaoMutantes: ((quantidadeDeNaoMutantes / quantidadeTotalDePessoas) * 100).toFixed(2),
        porcentagemDeDenteDeNeon: ((quantidadeDeDenteDeNeon / quantidadeTotalDePessoas) * 100).toFixed(2),
        porcentagemDeOlhoNaNuca: ((quantidadeDeOlhoNaNuca / quantidadeTotalDePessoas) * 100).toFixed(2) 
      }
    })
  }

  /**
   * Cria e salva um novo relatorio
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
   * Retorna um relatório específico
   * GET relatorios/:relatorio_id
   */
  async show ({ params, request, response, view }) {
    // Acha o relatório na tabela de relatórios
    const relatorio = await Relatorio.find(params.relatorio_id)

    if(relatorio){
      return response.status(200).json({
        mensagem: 'Relatório',
        dados: relatorio
      })
    }else{
      return response.status(400).json({
        erro: 'Relatório não encontrado'
      })
    }
  }

  /**
   * Retorna a pessoa associada ao relatório específico
   * GET relatorios/:relatorio_id/pessoa
   */
  async showPerson ({ params, request, response }) {
    const relatorio = await Relatorio.find(params.relatorio_id)

    if(relatorio){
      return response.status(200).json({
        mensagem: 'Pessoa associada a este relatório',
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
