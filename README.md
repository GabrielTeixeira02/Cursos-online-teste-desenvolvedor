<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
Node version v20.11.0
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Para a criação desse projeto foi necessário que eu aprendesse Prisma e NestJS, por conta disso acabei usando de 3 a 4 dias quase que exclusivamente para aprender ambos os Frameworks. Portanto, acabou faltando tempo para fazer os testes unitários.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API's para teste

Uma boa parte do sistema está funcional, porém, como citado acima, não houve tempo suficiente para deselver todas as API's necessárias.

{port} = A porta padrão do sistema está definida para 8090, porém é possivel altera-lá no arquivo *main.ts*

### Professor
```bash
# Cadastro de professor
Path: http://localhost:{port}/professor
Método: POST

# Listar todos os professores cadastrados
Path: http://localhost:{port}/professor/findAll
Método: GET
```

### Aluno
```bash
# Cadastro de alunos
Path: http://localhost:{port}/aluno
Método: POST
Body: {
    "nome": "string",
    "nomeusuário": "string"
}

# Listar todos os alunos cadastrados
Path: http://localhost:{port}/aluno/findAll
Método: GET
```

### Cursos
```bash
# Criar curso
Path: http://localhost:{port}/curso
Método: POST
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.
Body: {
    "nome": "string",
    "descricao": "string",
    "banner": "string",
    "idProfessor": number
}

# Atualizar Curso
Path: http://localhost:{port}/curso/{idCurso}
Método: PATCH
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.
Body: {
    "nome": "string",
    "descricao": "string",
    "banner": "string",
    "idProfessor": number
}

# Deletar Curso
Path: http://localhost:{port}/curso/{idCurso}
Método: DELETE
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.

# Listar todos os cursos cadastrados
Path: http://localhost:{port}/curso/findAll
Método: GET
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.

# Dar acesso ao curso para um aluno
Path: http://localhost:{port}/curso/acesso
Método: POST
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.
Body: {
    "idAluno": number,
    "idCurso": number
}

# Listar alunos cadastrados em um curso
Path: http://localhost:{port}/curso/find/alunos-cadastrados/{idCurso}
Método: GET
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.

# Listar cursos em que um aluno está cadastrado
Path: http://localhost:{port}/curso/find/cursos-aluno
Método: GET
header: Não necessário, o aluno é pego pelo usuário do token.
```

### Aula
```bash
# Criar aulas e relacioná-las a um curso
Path: http://localhost:{port}/aula
Método: POST
header: Necessário passar um token de nome 'user-token' e o valor é o nome do usuário(Aluno ou Professor) cadastrado.
Body: "aulas": [
        {
            "link": "string",
            "conteudo": "string",
            "arquivo": "string",
            "idCurso": number
        },
        {
            "link": "string",
            "conteudo": "string",
            "arquivo": "string",
            "idCurso": number
        }
    ]

# Visualizar uma aula
Path: http://localhost:8090/visualizar-aula/{idAula}
Método: PATCH
Body: Não necessário, o usuário é pego pelo token.
```
