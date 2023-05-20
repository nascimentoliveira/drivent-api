![created date - drivent-api](https://img.shields.io/date/1677553200?color=007ec6&label=created&style=flat-square)
![license - drivent-api](https://img.shields.io/github/license/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)
![last commit - drivent-api](https://img.shields.io/github/last-commit/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)
![repo size - drivent-api](https://img.shields.io/github/repo-size/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)
![files - drivent-api](https://img.shields.io/github/directory-file-count/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)
![language - drivent-api](https://img.shields.io/github/languages/top/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)
![stars - drivent-api](https://img.shields.io/github/stars/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)
![forks - drivent-api](https://img.shields.io/github/forks/nascimentoliveira/drivent-api?color=007ec6&style=flat-square)

# API (Back-end) da Aplicação Driven.t

Aqui você encontrará informações sobre a estrutura da API, como executá-la localmente, configurar as dependências e realizar as requisições corretamente.

> O código-fonte do front-end da aplicação está hospedado no GitHub em: [Driven.t Front-end](https://github.com/nascimentoliveira/drivent)

> Driven.t atualmente pode ser experimentado em: [Driven.t Live Demo](https://nascimentoliveira-drivent.vercel.app)
>  
>> *A primeira requisição ao Live Demo pode levar um pouco mais de tempo para carregar. Isso ocorre porque os servidores são ativados conforme necessário e podem levar alguns instantes para iniciar!*

## Tecnologias Utilizadas

A API da aplicação Driven.t foi desenvolvido utilizando as seguintes tecnologias:

- Linguagem de Programação: [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference).

- Back-end
   - [TypeScript](https://www.typescriptlang.org/): Linguagem de programação de código aberto que estende a sintaxe do JavaScript, fornecendo tipagem estática opcional e outros recursos para melhorar o desenvolvimento.
   - [Node.js](https://nodejs.org/en/about): Plataforma de desenvolvimento JavaScript assíncrona baseada no motor V8 do Chrome.
   - [Express.js](https://expressjs.com/pt-br/): Framework web rápido e minimalista para Node.js.
   - [Dotenv](https://www.npmjs.com/package/dotenv): Pacote para carregar variáveis de ambiente a partir de um arquivo .env.
   - [Bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para criptografia de senhas.
   - [Joi](https://joi.dev/): Biblioteca para validação de dados.
   - [JWT](https://www.npmjs.com/package/jsonwebtoken): Biblioteca para geração e validação de tokens de autenticação.
   - [http-status](https://www.npmjs.com/package/http-status): Biblioteca utilizada para padronizar e facilitar o uso dos códigos de status HTTP em respostas do servidor.
   - [Jest](https://jestjs.io/): Framework de teste JavaScript com foco na simplicidade e na experiência do desenvolvedor. Utilizado para testes unitários e de integração.
   - [Supertest](https://www.npmjs.com/package/supertest): Biblioteca utilizada para testar APIs HTTP de forma fácil e eficiente. Utilizada em conjunto com o Jest para realizar testes de integração.

- Banco de Dados: 
  - [PostgreSQL](https://www.postgresql.org/about/): Sistema de gerenciamento de banco de dados relacional, utilizado para armazenar e persistir os dados da aplicação.
  - [Redis](https://redis.io/): Banco de dados em memória de código aberto, utilizado para armazenamento de cache.
  - [Prisma ORM](https://www.prisma.io/): ORM (Object-Relational Mapping) de banco de dados, utilizado para facilitar a comunicação e manipulação de dados com o banco de dados PostgreSQL.


Essas tecnologias foram escolhidas para proporcionar uma experiência de desenvolvimento moderna, eficiente e escalável.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu computador:
-   Node.js (versão 16 ou superior)
-   NPM (versão 7 ou superior)

## Instalação

Siga as etapas abaixo para instalar, configurar e executar a API localmente:

1. Clone o repositório do projeto:
    ```bash
    git clone https://github.com/nascimentoliveira/drivent-api.git
    ```
2. Acesse o diretório do projeto:
    ```bash
    cd drivent-api
    ```
3. Instale as dependências do projeto:
    ```bash
    npm install
    ```
4. Configure as variáveis de ambiente:  
   Antes de executar a aplicação, é necessário configurar as variáveis de ambiente corretamente. Siga os passos abaixo:
   -  Renomeie o arquivo `.env.example` para `.env`:
      ```bash
      m .env.example .env
      ```
   - Abra o arquivo `.env` em um editor de texto.
   - Procure a variável `DATABASE_URL` e defina-a com as configurações de acesso ao banco de dados. Exemplo:  
      ```bash
      DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
      ```
   - Procure a variável `REDIS_URL` e defina-a com as configurações de conexão ao banco de dados em memória REDIS, que é amplamente utilizado como um armazenamento de chave-valor de alto desempenho. Exemplo:  
      ```bash
      REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}
      ```
   - Procure a variável `JWT_SECRET` e configure a chave secreta usada para assinar e verificar os tokens JWT (JSON Web Tokens). Esta chave é usada para garantir a segurança e integridade dos tokens de autenticação. Certifique-se de definir uma chave forte e segura para esta variável de ambiente. Exemplo:  
      ```bash
      JWT_SECRET="jwt_secret"
      ```
   - Verifique se existem outras variáveis de ambiente necessárias para o funcionamento da aplicação e defina-as de acordo com a sua configuração.
   - Salve o arquivo `.env`.
    
   *Certifique-se de não compartilhar o arquivo `.env` contendo informações sensíveis, como senhas, chaves de API ou tokens de acesso. Mantenha-o seguro e fora do controle de versão do seu repositório.*

   Após configurar as variáveis de ambiente, a aplicação estará pronta para ser executada.

5. Realize as migrações do Prisma ORM para criar a estrutura do banco de dados. Execute o seguinte comando:

   ```bash
   npm run dev:migration:run
   ```

   Isso aplicará as migrações pendentes no banco de dados especificado no arquivo `.env`, criando as tabelas e as relações necessárias.

6. Execute o `seed` para popular o banco de dados com dados iniciais. Execute o seguinte comando:
   ```bash
   npm run dev:migration:run
   ```
Isso executará o seed do banco de dados especificado no arquivo `.env`, adicionando dados iniciais para testar a aplicação.

## Executando a API

Após a configuração, você pode iniciar a API executando o seguinte comando:
  ```bash
  npm run dev
  ```
A API será iniciada e estará pronta para receber requisições.
O servidor será iniciado na porta especificada no arquivo `.env` (por padrão, é a porta 4000).
  ```bash
  http://localhost:4000/api
  ```
ou 
  ```bash
  http://localhost:<porta_especificada>/api
  ```

## Endpoints* 🛠

**Uma descrição detalhada desssa seção está sendo construída!*

<!-- A API do Drive.t possui os seguintes endpoints disponíveis: -->

## Contribuição

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um `fork` do repositório.
2. Crie uma nova `branch` com a sua contribuição: 
    ```bash
    git checkout -b <sua-contribuicao>
    ```
3. Faça as suas modificações  no código.
4. Faça `commit` das suas alterações:
    ```bash
    git commit -m "Sua contribuição"
    ```
5. Envie as alterações para o repositório remoto: .
    ```bash
    git push origin <sua-contribuicao>
    ```
6. Abra um `pull request` no repositório original, descrevendo as modificações realizadas.

Se te ajudei de alguma forma, ficarei feliz em saber. Se possível:  
⭐️ dê uma estrela para este projeto; e   
🪲 Encontre e relate `issues`

## Licença

Este projeto é licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/). Consulte o arquivo LICENSE para obter mais informações.

Disponibilizado por [Thiago Oliveira](https://www.linkedin.com/in/nascimentoliveira/).