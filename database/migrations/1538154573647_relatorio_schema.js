'use strict'

const Schema = use('Schema')

class RelatorioSchema extends Schema {
  up () {
    this.create('relatorios', (table) => {
      table.uuid('id').primary()
      table.uuid('pessoa_id').notNullable()
      table.foreign('pessoa_id').references('id').inTable('pessoas')
      table.integer('mutacao')
      table.timestamps()
    })
  }

  down () {
    this.drop('relatorios')
  }
}

module.exports = RelatorioSchema
