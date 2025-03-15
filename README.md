<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is project Nest Js Sample with Fake API from https://jsonplaceholder.typicode.com/

Additional config :
1. Caching with Redis
2. Clean Code
3. Architectural Pattern

## Clone this repository
```bash
git clone https://github.com/afieyudha/nestjs-sample.git
```

## Project setup install nest js

```bash
npm install
```

## Connect database Mysql
```bash
CREATE DATABASE nestjs_sample;
```

## Run project

```bash
npm run start:dev
```

## API test - Test API with Postman

#GET /posts - Get all posts
```bash
localhost:3000/posts
```

#GET /posts/1 - Get post by ID => id 1
```bash
localhost:3000/posts/1
```

#POST /posts - Add new post
add this endpoint to body parameter
```bash
{
    "id": 100,
    "title": "add nest js sample",
    "body": "add nest js sample body,
    "userId": 1
}
```
#PUT /posts/100 - Update post 
add this endpoint to body parameter
```bash
{
  "title": "Updated Post",
  "body": "This is an updated post"
}
```
#PATCH /posts/100 - Update post parsial
add this endpoint to body parameter
```bash
{
  "title": "Patched Title"
}
```
#DELETE /posts/1 - Delete post 
```bash
localhost:3000/posts/1
```

