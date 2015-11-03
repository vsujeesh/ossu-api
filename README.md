# OSSU API

**Open Source Society University API server**

## Contribute

[How to contribute to Open Source Society University API server](https://github.com/open-source-society/ossu-api/blob/master/CONTRIBUTING.md)

Thank you for your interest in contributing!

## Project Structure

* `/api/` - Main API routes
* `/auth/` - Auth API
* `/models/` - Mongoose models
* `/controllers/` - API controllers
* `/helpers/` - Helper functions
* `/helpers/server.js` - Express.js server definition
* `/helpers/loader.js` - Require's all the modules in a folder
* `/test/api` - API tests
* `/test/models` - Model tests

See the [API documentation](http://open-source-society.github.io/ossu-api/docs/index.html).

## Installation

### Install Prerequisites
* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.org/downloads#production)

### Clone the repository
```bash
$ git clone git@github.com:open-source-society/ossu-api.git
```

### Configure Environment
Rename the file `.envsample` as `.env`. Edit the values according to your environment.

### Install the dependencies (via NPM)
```bash
$ npm install
```

## Running Server
Start MongoDB
```bash
$ mongod
```

Start server
```bash
$ npm start
```

Hit endpoint
```
$ curl localhost:$PORT/api/users
```

## Running Tests
Run all tests
```bash
$ npm test
```

Run SemiStandard style checks
```bash
$ npm run check-style
```