<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
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

Projeto baseado no framework [Nest](https://github.com/nestjs/nest) para efetuar compras de produtos dentro da XPTO. A seguir, estão as instruções básicas para que o projeto seja inicializado e utilizado:

1) Deve-se primeiramente adicionar as dependências com o comando

```bash
yarn add
```

2) Após a instalação, deve-se iniciar o container do banco de dados PostgreSQL com o seguinte comando
```bash
docker-compose up -d
```

3) Em seguida, digite o comando a seguir para gerar uma instância do Prisma

```bash
npx prisma generate
```

3) Por último, rode as migrations do Prisma para que alguns dados sejam adicionados previamente as tabelas do banco

```bash
npx prisma migrate dev
```

Agora a aplicação está pronta para ser iniciada!


## Iniciar a aplicação

```bash
# desenvolvimento
$ yarn start:dev

# produção
$ yarn start:prod

# depuração
$ yarn start:debug
```

** Você pode encontrar a documentação após subir o projeto em:
```bash
localhost:3000/api/docs
```

## Kubernetes com CD localmente

1) Criar um registry privado para colocar a imagem da aplicação
2) Criar um cluster que utilize esse registry
3) Buildar a imagem
4) Colocar tag e fazer o push no private registry
5) Fazer o deploy do argocd
6) Fazer o deploy da aplicação

Após tudo pronto, os processos de build tag e push devem ser feitos manualmente.

## Kubernetes com CD utilizando GitHub Actions

1) Criar um cluster
2) Buildar a imagem
3) Colocar tag e fazer o push no registry do github
4) Fazer deploy do github-controller
5) Fazer deploy dos runners passando o GITHUB_TOKEN
6) Criar a secret do registry do ghcr
7) Fazer o deploy do argocd
8) Fazer o deploy da aplicação

Após tudo pronto, agora o processo está automatizado. Deve-se trocar a imagem do package.json e do values.yaml da aplicação.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Project's author - [@anaecouto](https://github.com/anaecouto/)

## License

Nest is [MIT licensed](LICENSE).
