# Teste Tecnico Back-End
## Tarefa (funcional)
Desenvolva um sistema de autenticação JWT.
Você deve construir uma CRUD de um catálogo de filmes. Todos os endpoints dessa CRUD só devem ser consumidos por um usuário autenticado.

## Stack utilizada

TypeScript

Nest.js

TypeORM

Swagger

Docker

Redis

## Instalação


```bash
$ npm install
```

```bash
$ docker pull postgres
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


## Documentação

[Documentação](http://localhost:8080/api#/)


## Documentação da API

#### Retorna todos os itens

```http
  GET /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `string` | **Obrigatório**. Token de login |

#### Retorna um item

```http
  GET /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Avaliação de filme dos usuarios
```http
  GET /user/films/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |


#### Adiciona um novo usuario
```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Nome no body da Requisição |
| `email`      | `string` | **Obrigatório**. Email no body da Requisição |
| `password` | `string` | **Obrigatório**. Password no body da Requisição |

#### Adiciona um novo administrador
```http
  POST /user/admin
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name` | `string` | **Obrigatório**. Nome no body da Requisição |
| `email`      | `string` | **Obrigatório**. Email no body da Requisição |
| `password` | `string` | **Obrigatório**. Password no body da Requisição |

#### Login
```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email no body da Requisição |
| `password` | `string` | **Obrigatório**. Password no body da Requisição |

#### Adiciona uma nova avaliação
```http
  POST /films
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `name`      | `string` | **Obrigatório**. Email no body da Requisição |
| `user_id` | `number` | **Obrigatório**. User_id no body da Requisição |
| `release_year`      | `number` | **Obrigatório**. Release_year no body da Requisição |
| `category` | `string` | **Obrigatório**. Category no body da Requisição |
| `assessment`      | `string` | **Obrigatório**. Assessment no body da Requisição |

#### Atualiza um filme
```http
  PATCH /films/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `category`      | `string` | **Opcional**. Email no body da Requisição |
| `release_year`      | `number` | **Opcional**. Release_year no body da Requisição |
| `assessment`      | `string` | **Opcional**. Assessment no body da Requisição |

#### Atualiza um usuario
```http
  PATCH /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `name` | `string` | **Opcional**. Nome no body da Requisição |
| `email`      | `string` | **Opcional**. Email no body da Requisição |
| `password` | `string` | **Opcional**. Password no body da Requisição |

#### Deleta Usuario
```http
  DELETE /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Deleta Filme
```http
  DELETE /films/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization` | `string` | **Obrigatório**. Token de login |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |




## Aprendizados

Um projeto que me desafiou do começo ao fim, tive que ir em busca de novos conhecimentos para a elaboração do mesmo, principalmente em Docker, TypeOrm e Swagger. Infelizmente não consegui aplicar o Redis, mas coloquei em pratica o Cacahe Manager do proprio Nestjs. Tenho um pouco mais de 2 anos de estudos na área, por isso motivo mesmo com dificuldades consegui desenvolver essa api que me foi proposto
