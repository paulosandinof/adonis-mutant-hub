'use strict'

const Schema = use('Schema')

class PessoaSchema extends Schema {
  up () {
    this.table('pessoas', (table) => {
      // alter table
      table.renameColumn('user_id', 'id')
    })
  }

  down () {
    this.table('pessoas', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PessoaSchema
