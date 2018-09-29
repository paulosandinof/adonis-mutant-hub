'use strict'

const Model = use('Model')

class Relatorio extends Model {
  pessoa(){
    return this.belongsTo('App/Models/Pessoa')
  }
}

module.exports = Relatorio
