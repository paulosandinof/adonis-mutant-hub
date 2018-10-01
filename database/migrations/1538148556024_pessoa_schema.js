'use strict'
const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.create('pessoas', (table) => {
      table.uuid('id').primary()
      table.string('nome').notNullable()
      table.integer('idade').notNullable()
      table.enu('sexo', ['masculino', 'feminino']).notNullable()
      table.string('localizacao', 255).notNullable()
      table.integer('mutacao')
      table.timestamps()
    })
  }

  down () {
    this.drop('pessoas')
  }
}

module.exports = PessoaSchema
