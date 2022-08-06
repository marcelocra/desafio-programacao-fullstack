# Hubla Code Challenge

This is a "framework-less" approach to solving Hubla's code challenge.

I wanted to do it simple, to show what I can do without depending on a
framework.

## Why is this file called README?

Because it wants you to read it before doing anything else :).

But if you prefer to see things running first, that's ok too, haha. Just jump to
the instructions below.

(You can click on the burger menu, to the left of the README file name. That
allows navigation through the headings.)

## What does this app do?

It follows all requirements (including extras) presented in the requirements
file, which I copied below ([original here](/README-original.md)).

### Requirements

> - [x] Ter uma tela (via formulário) para fazer o upload do arquivo
> - [x] Fazer o parser do arquivo recebido, normalizar os dados e armazená-los
>       em um banco de dados relacional, seguindo as definições de interpretação
>       do arquivo
> - [x] Exibir a lista das transações de produtos importadas por
>       produtor/afiliado, com um totalizador do valor das transações realizadas
> - [x] Ser simples de configurar e rodar, compatível com ambiente Unix
>       (utilizar apenas bibliotecas gratuitas ou livres)
> - [x] Ter um README descrevendo o projeto e como fazer o setup
> - [x] Ter documentacao das APIs que o backend chama no frontend.

### Extra requirements

> - [x] Lidar com autenticação ou autorização (mas você ganha pontos extras se
>       fizer)
> - [+-] Ser escrita usando algum framework específico (mas não tem problema
>   usar)
> - [x] Documentação da API (mas você ganha pontos extras se fizer)
> - [x] Utilizar docker e docker-compose (mas você ganha pontos extras se fizer)
> - [+-] Ter testes integrados/end-to-end (mas você ganha pontos extras se
>   fizer)

### Technologies and programming practices

Details after the list.

> - [x] Escolha a linguagem que quiser
> - [x] Use qualquer banco de dados relacional
> - [x] Use commits pequenos no Git e escreva uma boa descrição para cada um
> - [x] Escreva unit tests
> - [x] Tente fazer o código mais legível e limpo possivel
> - [x] Escreva o código (nomes e comentários) em inglês. Se se sentir
>       confortável escreva as documentações também em inglês, mas pode ser em
>       Português se preferir.

## Instructions - How to run this project

All you need is Docker. FYI, I'm using the following version on win10:

```
$ docker --version
Docker version 20.10.13, build a224086
```

To run the project, the steps are: (1) clone the repo and checkout the
`features` branch; (2) build the docker image; (3) run the image as mentioned
below; (4) access `localhost:8000`.

```sh
# Clone the repo…
$ git clone https://github.com/marcelocra/desafio-programacao-fullstack
$ cd desafio-programacao-fullstack

# Build the image.
$ docker build --tag hubla-challenge .

# Run the image, forwarding port 8000.
$ docker run --rm -d -p 8000:8000 --name hubla-marcelo hubla-challenge

# Access localhost:8000 in your browser...

# Afterwards, stop the image.
$ docker stop hubla-marcelo
```

## API docs

- `[GET] /` - Serves the SPA, in the `index.html` file.
- `[POST] /log_user` - Receives email and password from the user and returns an
  auth token, required to make other API calls.
- `[POST] /upload_file` - Receives a file in the described format. The file is
  parsed, normalized and stored in the database.
- `[GET] /transactions` - Returns all transactions from the saved file.

## Instructions - How to develop this project

There are two commands to be run during development: `yarn dev:frontend` and
`yarn dev:backend`.

If you are doing changes to the frontend code (in the `src/frontend` folder),
access `localhost:1234`. The bundler provides fast refresh capabilities there,
for a very fast development workflow. And the proxy file allows that frontend to
talk to the backend, which will be running in `localhost:8000`.

Backend code is all code that is in `src` but not in `src/frontend`.

## Architecture and technologies

Today, a large number of applications use the client-server model, with a
service oriented architecture. That is what I'm using here too.

In more details…

### Backend - Node

The server (backend) is a **Node** application, running **Express** with an
**SQLite** database. Authentication is done via **JSON Web Tokens** (JWT).

The entrypoint is the `src/server.js` file.

### Database - SQLite

While SQLite might not be the best solution for large applications, it works
very well for
[small to medium ones](https://www.sqlite.org/whentouse.html#website), also
providing a very simple "getting started" story.

Here, the queries are written in SQLite dialect. Due to the simplicity of the
app, I'm not using features that would help when working on a large application
(database migrations, transactions, indexes, etc).

If this app was going to scale, we could also introduce a database abstraction
layer (e.g. Knex, Prisma, etc). Perhaps it would simplify working with the
database, but could also add complexity, so I chose not to use them now.

The database code is in the `db` folder and in the `db_handler.js` file. The
folder has code for creating the database and adding fake data, while the file
has code for interacting with the database (through the server).

### Frontend - React

The client (frontend) is a **React** single page application. All the code is in
the `src/frontend` folder and the entrypoint is the `app.jsx` file.

The code is transpiled using the **Parcel** bundler.

### Tests

Tests are done using **Jest** (unit) and **Playwright** (e2e).

At this moment, most tests are unit tests. End-to-end (e2e) still needs some
configuration (with Docker) before working.

Test files are in the `tests-*` folders.

## Points for improvement

- [ ] Use a hashing library for passwords (NEVER store plain text passwords in
      the database).
- [ ] Make a more thorough validation for the user submitted file.
- [ ] Remove `.env` from github and migrate it to Docker
- [ ] Use an i18n library, not to put pt-br string in code.
- [ ] Add pagination support to the database requests, particularly in the
      transactions table.
- [ ] Simplify React state handling with Redux.
- [ ] Add TypeScript, to improve code reliability.
- [ ] Finish e2e tests setup.
- [ ] Prepare a better onboarding, allow users to create their system user
      through the UI.
- [ ] Add a routing library (or perhaps a framework, like Next, that already
      deals with that).
- [ ] Use the database roles to allow different types of roles (editor, viewer,
      etc).
- [ ] Add more security features, like CSRF protection, refresh tokens for auth,
      etc.
