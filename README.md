# MutantHub API

Projeto de uma API Rest para cadastrar usuários e reportá-los com mutação.

Para o propósito deste projeto, foi utilizado flags para representar as doenças, sendo:

| Flag da mutação | Mutação |
|--|--|
| 1 | Dente de neon |
| 2 | Olho na nuca |

## Rodando a aplicação

Foram utilizados neste projeto o **NodeJs 8.12.0**, o **AdonisJs 4.1.0** e o **MySQL Community 8.0.12**.

- Com o **NodeJs** e o **MySQL** instalados, instale o pacote do **Adonis** globalmente:
```bash
npm install @adonisjs/cli -g
```

- Clone o repositório:
```bash
git clone https://github.com/paulosandinof/MutantHub.git
```

- Será criada a pasta do repositório chamada **MutantHub**, acesse 
esta pasta:
```bash
cd MutantHub
```

- Dentro desta pasta, instale as dependências do projeto:
```bash
npm install
```

- Na pasta haverá um arquivo `.env.example` que contém as informações do seu projeto, faça uma cópia deste arquivo removendo o `.example`:
```bash
cp .env.example ./.env
```

- Neste novo arquivo criado, você precisará inserir as informações sobre o seu banco de dados:
```
APP_KEY=defina um valor para sua APP KEY de pelo menos 16 caracteres

DB_CONNECTION=mysql
DB_HOST=O endereço de host do seu banco de dados, geralmente 127.0.0.1
DB_PORT= A porta utilizada pelo seu banco de dados, geralmente 3306
DB_USER= O usuário do seu banco de dados
DB_PASSWORD= A senha do seu banco de dados
DB_DATABASE= O nome do banco schema que você criou para o projeto
```

- Configurado o arquivo `.env`, você precisará criar as migrations do projeto para criar as tabelas no banco de dados:
```bash
adonis migration:run
```

- Para rodar a API:
```bash
adonis serve --dev
```

## Endpoints da API

**TODO**
