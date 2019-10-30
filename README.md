# dojo-nodejs
De acordo com Roy Fielding, um dos idealizadores do modelo arquitetural REST, para que uma API seja considerada RESTful, esta deve obrigatoriamente seguir todas as constraints pré-definidas. Porém, existem casos que precisaremos seguir uma abordagem mais simples, e foi nesse ponto que Leonard Richardson propôs o modelo de quatro níveis para alcançar a “glória” da API REST.

O modelo desenvolvido por Leonard Richardson divide os principais elementos de REST em três passos: recursos (resources), verbos http (http verbs) e controles de hypermedia (hypermedia controls). O modelo de Richardson é facilitador para a construção de APIs. Porém, vale levar em consideração que não é possível considerarmos uma API RESTful só implementando os níveis 0, 1 e 2 porque esses níveis não alcançam todas as constraints definidas por Roy Fielding.

# Instalando dependências
#### [NPM](https://www.npmjs.com/get-npm)
```
$ npm install
```
#### [Yarn](https://yarnpkg.com/lang/en/)
```
$ yarn
```

# Executando o projeto
#### Em ambiente de desenvolvimento
```
$ npm run dev
```
OU
```
$ yarn dev
```
#### Em ambiente de produção
```
$ npm start
```
OU
```
$ yarn start
```

### Middleware
#### Helmet
```
Helmet helps you secure your Express apps by setting various HTTP headers.
```
* https://github.com/helmetjs/helmet

#### Cors
```
CORS is a node.js package for providing a Connect/Express middleware that can
be used to enable CORS with various options.
```
* https://github.com/expressjs/cors

#### Body-parser
```
Node.js body parsing middleware.

Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
```
* https://github.com/expressjs/body-parser

#### Compression
```
Node.js compression middleware.

Suports deflate and gzip compression.
```
* https://github.com/expressjs/compression

### UUID
```
Simple, fast generation of RFC4122 UUIDS.
```
* https://github.com/kelektiv/node-uuid

### Joi
```
The most powerful schema description language and data validator for JavaScript.
```
* https://github.com/hapijs/joi

### PUT vs PATCH
* https://stackoverflow.com/questions/28459418/rest-api-put-vs-patch-with-real-life-examples

### File System as a Promises - fsPromises
* https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_promises_api

### .env no Git
Optei por remover o arquivo `.env` do `.gitignore` para facilitar a execução do projeto, mas isso não é uma boa prática para projetos reais.
Normalmente, o `.env` fica no `.gitignore` para proteger dados sensíveis como keys, tokens e senhas que são utilizadas no projeto.
