'use strict'

const Model = use('Model')

class Pessoa extends Model {
  relatorios(){
    return this.hasMany('App/Models/Relatorio')
  }
}

module.exports = Pessoa
