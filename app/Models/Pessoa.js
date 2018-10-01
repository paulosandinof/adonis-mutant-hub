'use strict'

const Model = use('Model')

class Pessoa extends Model {
  static get incrementing(){
    return false
  }
  relatorios(){
    return this.hasMany('App/Models/Relatorio')
  }
}

module.exports = Pessoa
