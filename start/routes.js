'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

// Rotas de CRUD para Pessoas
Route.get('/pessoas', 'PessoaController.index')
Route.post('/pessoas', 'PessoaController.store')
Route.get('/pessoas/:pessoa_id', 'PessoaController.show')
Route.put('/pessoas/:pessoa_id', 'PessoaController.update')
Route.delete('/pessoas/:pessoa_id', 'PessoaController.destroy')

// Rotas dos relatos de doenças
Route.get('/relatorios', 'RelatorioController.index')
Route.post('/relatorios/:pessoa_id/:flag_mutacao', 'RelatorioController.store')
Route.get('/relatorios/:id', 'RelatorioController.show')