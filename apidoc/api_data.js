define({ "api": [
  {
    "type": "delete",
    "url": "/pessoas/:pessoa_id",
    "title": "Excluir uma pessoa específica",
    "name": "DeletePessoa",
    "group": "Pessoas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa_id",
            "description": "<p>Identificador único da pessoa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com todas as informações da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n       \"nome\": \"Paulo Sandino\",\n       \"idade\": 22,\n       \"sexo\": \"masculino\",\n       \"localizacao\": \"Quarentena\",\n       \"mutacao\": 2,\n       \"created_at\": \"2018-10-01 11:18:51\",\n       \"updated_at\": \"2018-10-01 13:56:36\" \n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro:",
          "content": "{\n   \"erro\": \"Pessoa não encontrada\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/PessoaController.js",
    "groupTitle": "Pessoas"
  },
  {
    "type": "get",
    "url": "/pessoas/:pessoa_id",
    "title": "Obter uma pessoa específica",
    "name": "GetPessoa",
    "group": "Pessoas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa_id",
            "description": "<p>Identificador único da pessoa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com todas as informações de uma pessoa específica</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n       \"nome\": \"Paulo Sandino\",\n       \"idade\": 22,\n       \"sexo\": \"masculino\",\n       \"localizacao\": \"Quarentena\",\n       \"mutacao\": 2,\n       \"created_at\": \"2018-10-01 11:18:51\",\n       \"updated_at\": \"2018-10-01 13:56:36\" \n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro:",
          "content": "{\n   \"erro\": \"Usuário não encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/PessoaController.js",
    "groupTitle": "Pessoas"
  },
  {
    "type": "get",
    "url": "/pessoas",
    "title": "Obter uma lista de todas as pessoas",
    "name": "GetPessoas",
    "group": "Pessoas",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dados",
            "description": "<p>Um array com todas as pessoas cadastradas</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": [\n       {\n           \"id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n           \"nome\": \"Paulo Sandino\",\n           \"idade\": 22,\n           \"sexo\": \"masculino\",\n           \"localizacao\": \"Quarentena\",\n           \"mutacao\": 2,\n           \"created_at\": \"2018-10-01 11:18:51\",\n           \"updated_at\": \"2018-10-01 13:56:36\" \n       },\n       {\n           \"id\": \"62d42d28-f5ae-48bc-bc79-50bf40865645\",\n           \"nome\": \"Maria Imaculada\",\n           \"idade\": 73,\n           \"sexo\": \"feminino\",\n           \"localizacao\": \"Rua Camboriú\",\n           \"mutacao\": 0,\n           \"created_at\": \"2018-10-01 11:26:00\",\n           \"updated_at\": \"2018-10-01 11:26:00\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/PessoaController.js",
    "groupTitle": "Pessoas"
  },
  {
    "type": "get",
    "url": "/pessoas/:pessoa_id/relatorios",
    "title": "Obter uma lista de relatórios associados a uma pessoa específica",
    "name": "GetRelatoriosPorPessoa",
    "group": "Pessoas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa_id",
            "description": "<p>Identificador único da pessoa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dados",
            "description": "<p>Um array com todos os relatórios associados a uma pessoa específica</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": [\n       {\n         \"id\": \"659aa42e-10b3-44e6-abf1-1e7ac2d167ef\",\n         \"pessoa_id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n         \"mutacao\": 2,\n         \"created_at\": \"2018-10-01 13:56:36\",\n         \"updated_at\": \"2018-10-01 13:56:36\" \n       },\n       {\n         \"id\": \"65967f462c0-7311-4e2d-ae89-ab47ae19393a\",\n         \"pessoa_id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n         \"mutacao\": 1,\n         \"created_at\": \"2018-10-01 13:56:34\",\n         \"updated_at\": \"2018-10-01 13:56:34\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro:",
          "content": "{\n   \"erro\": \"Usuário não encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/PessoaController.js",
    "groupTitle": "Pessoas"
  },
  {
    "type": "post",
    "url": "/pessoas",
    "title": "Criar e salvar uma nova pessoa",
    "name": "PostPessoa",
    "group": "Pessoas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idade",
            "description": "<p>Idade da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"masculino, feminino\""
            ],
            "optional": false,
            "field": "sexo",
            "description": "<p>Sexo da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "localizacao",
            "description": "<p>Localização da pessoa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com todas as informações da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n       \"nome\": \"Paulo Sandino\",\n       \"idade\": 22,\n       \"sexo\": \"masculino\",\n       \"localizacao\": \"Quarentena\",\n       \"mutacao\": 2,\n       \"created_at\": \"2018-10-01 11:18:51\",\n       \"updated_at\": \"2018-10-01 13:56:36\" \n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro:",
          "content": "{\n   \"erro\": \"Preencha corretamente todos os campos\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/PessoaController.js",
    "groupTitle": "Pessoas"
  },
  {
    "type": "put",
    "url": "/pessoas/:pessoa_id",
    "title": "Atualizar informações sobre uma pessoa específica",
    "name": "PutPessoa",
    "group": "Pessoas",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa_id",
            "description": "<p>Identificador único da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>Nome da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "idade",
            "description": "<p>Idade da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"masculino, feminino\""
            ],
            "optional": false,
            "field": "sexo",
            "description": "<p>Sexo da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "localizacao",
            "description": "<p>Localização da pessoa</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com todas as informações da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n       \"nome\": \"Paulo Sandino\",\n       \"idade\": 22,\n       \"sexo\": \"masculino\",\n       \"localizacao\": \"Quarentena\",\n       \"mutacao\": 2,\n       \"created_at\": \"2018-10-01 11:18:51\",\n       \"updated_at\": \"2018-10-01 13:56:36\" \n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro 1:",
          "content": "{\n   \"erro\": \"Preencha corretamente todos os campos\"\n}",
          "type": "json"
        },
        {
          "title": "Exemplo de erro 2:",
          "content": "{\n   \"erro\": \"Pessoa não encontrada\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/PessoaController.js",
    "groupTitle": "Pessoas"
  },
  {
    "type": "get",
    "url": "/relatorios/:relatorio_id/pessoa",
    "title": "Obter a pessoa associada a um relatório específico",
    "name": "GetPessoaPorRelatorio",
    "group": "Relatorios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "relatorio_id",
            "description": "<p>Identificador único do relatório</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com os dados da pessoa associada ao relatório específico</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n   \"dados\": {\n       \"id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n       \"nome\": \"Paulo Sandino\",\n       \"idade\": 22,\n       \"sexo\": \"masculino\",\n       \"localizacao\": \"Quarentena\",\n       \"mutacao\": 2,\n       \"created_at\": \"2018-10-01 11:18:51\",\n       \"updated_at\": \"2018-10-01 13:56:36\" \n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro:",
          "content": "{\n   \"erro\": \"Relatório não encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/RelatorioController.js",
    "groupTitle": "Relatorios"
  },
  {
    "type": "get",
    "url": "/relatorios/:relatorio_id",
    "title": "Obter um relatório específico",
    "name": "GetRelatorio",
    "group": "Relatorios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "relatorio_id",
            "description": "<p>Identificador único do relatório</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com as informações de um relatório específico</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"id\": \"659aa42e-10b3-44e6-abf1-1e7ac2d167ef\",\n       \"pessoa_id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n       \"mutacao\": 2,\n       \"created_at\": \"2018-10-01 13:56:36\",\n       \"updated_at\": \"2018-10-01 13:56:36\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "erro",
            "description": "<p>Mensagem de erro</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de erro:",
          "content": "{\n   \"erro\": \"Relatório não encontrado\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/RelatorioController.js",
    "groupTitle": "Relatorios"
  },
  {
    "type": "get",
    "url": "/relatorios",
    "title": "Obter uma lista de todos os relatórios",
    "name": "GetRelatorios",
    "group": "Relatorios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "dados",
            "description": "<p>Um array com todos os relatórios cadastrados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": [\n       {\n           \"id\": \"659aa42e-10b3-44e6-abf1-1e7ac2d167ef\",\n           \"pessoa_id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n           \"mutacao\": 2,\n           \"created_at\": \"2018-10-01 13:56:36\",\n           \"updated_at\": \"2018-10-01 13:56:36\"\n       },\n       {\n           \"id\": \"67f462c0-7311-4e2d-ae89-ab47ae19393a\",\n           \"pessoa_id\": \"10400ddb-2620-4fa9-864f-a44dad641add\",\n           \"mutacao\": 2,\n           \"created_at\": \"2018-10-01 13:56:35\",\n           \"updated_at\": \"2018-10-01 13:56:35\"\n       }   \n   ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/RelatorioController.js",
    "groupTitle": "Relatorios"
  },
  {
    "type": "get",
    "url": "/relatorios/porcentagem",
    "title": "Obter a porcentagem de mutantes, não-mutantes e de cada mutação",
    "name": "GetRelatoriosPorcentagem",
    "group": "Relatorios",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto com a porcentagem de mutantes, não-mutantes e de cada mutação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"porcentagemDeMutantes\": \"33.33\",\n       \"porcentagemDeNaoMutantes\": \"66.67\",\n       \"porcentagemDeDenteDeNeon\": \"16.67\",\n       \"porcentagemDeOlhoNaNuca\": \"16.67\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/RelatorioController.js",
    "groupTitle": "Relatorios"
  },
  {
    "type": "post",
    "url": "/relatorios/:pessoa_id/:flag_mutacao",
    "title": "Cria e salva um novo relato sobre uma pessoa com mutação",
    "name": "PostRelatorio",
    "group": "Relatorios",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pessoa_id",
            "description": "<p>Identificador único da pessoa</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "\"1,2\""
            ],
            "optional": false,
            "field": "flag_mutacao",
            "description": "<p>Flag de identificação da doença. <code>1</code> para Dente de neon e <code>2</code> para Olho na nuca</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "dados",
            "description": "<p>Um objeto contendo as informações sobre a pessoa relatada, com a mutação e a localização atualizadas caso ela esteja com mutação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo de resposta:",
          "content": "{\n   \"dados\": {\n       \"id\": \"d7dedfd4-efdb-4126-8911-74e40fa5509f\",\n       \"nome\": \"Nathanael Derick\",\n       \"idade\": 19,\n       \"sexo\": \"masculino\",\n       \"localizacao\": \"Quarentena\",\n       \"mutacao\": 1,\n       \"created_at\": \"2018-10-01 11:19:57\",\n       \"updated_at\": \"2018-10-03 20:45:50\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/Controllers/Http/RelatorioController.js",
    "groupTitle": "Relatorios"
  }
] });
