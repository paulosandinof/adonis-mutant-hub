'use strict'

const Schema = use('Schema')

class RelatorioSchema extends Schema {
  up () {
    this.create('relatorios', (table) => {
      table.increments()
      table.integer('pessoa_id').unsigned().references('id').inTable('pessoas')
      table.integer('mutacao')
      table.timestamps()
    })
  }

  down () {
    this.drop('relatorios')
  }
}

module.exports = RelatorioSchema
