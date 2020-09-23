# Teste Sky

API REST com NodeJS

## Dependencias

* Docker
* Yarn
* NodeJs > v12

## Para rodar a aplicação

1. Rode o comando "yarn", para baixar as dependencias necessárias.
1. Rode o comando "yarn dev:server", para rodar a aplicação

## Rotas

* A aplicação está rodando na porta 3333
* POST /signin, realiza a autenticação.
    * Parametros no body necessários:
        * "email": "a@a.com",
        * "senha" : "123"

* POST /signup, realiza o cadastro de um novo usuário.
    * Parametros no body necessários:
        *"nome": "Magno",
        *"email": "a@a.com",
        *"senha" : "123",
        *"telefones": [
            {
                "ddd": "11",
                "numero":"14959"
            }
        ]

* GET /users/:user_id, busca informação de um usuário especifico.
    * user_id deve ser substituido pelo id do usuário desejado.
    * É necessário um token no header de autenticação, que pode ser obtido pelo retorno pela rota /signin.