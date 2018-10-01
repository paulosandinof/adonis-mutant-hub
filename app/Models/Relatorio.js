'use strict'

const Model = use('Model')

class Relatorio extends Model {
  static get incrementing(){
    return false
  }
  pessoa(){
    return this.belongsTo('App/Models/Pessoa')
  }
}

module.exports = Relatorio
