'use strict'

const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.create('pessoas', (table) => {
      table.increments('user_id')
      table.string('nome')
      table.integer('idade')
      table.enu('sexo', ['masculino', 'feminino'])
      table.string('localizacao')
      table.integer('mutacao')
      table.timestamps()
    })
  }

  down () {
    this.drop('pessoas')
  }
}

module.exports = PessoaSchema
