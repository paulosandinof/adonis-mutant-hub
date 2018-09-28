'use strict'

/**
 * Resourceful controller for interacting with relatorios
 */
class RelatorioController {
  /**
   * Show a list of all relatorios.
   * GET relatorios
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new relatorio.
   * GET relatorios/create
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new relatorio.
   * POST relatorios
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single relatorio.
   * GET relatorios/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing relatorio.
   * GET relatorios/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update relatorio details.
   * PUT or PATCH relatorios/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a relatorio with id.
   * DELETE relatorios/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RelatorioController
