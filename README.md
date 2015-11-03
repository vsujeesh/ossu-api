# OSSU API

**Open Source Society University API server**

## Contribute

[How to contribute to Open Source Society University API server](https://github.com/open-source-society/ossu-api/blob/master/CONTRIBUTING.md)

Thank you for your interest in contributing!

## Project Structure
* `/api/index.js` is the base api file, from here, we mount API routes
* `/auth/index.js` will be the authentication api file. Add auth strategies to files in the `/auth` folder
* `/models` is the folder for individual model files

## Installation

### Install Prerequisites
* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.org/downloads#production)

### Clone the repository
```bash
$ git clone git@github.com:open-source-society/ossu-api.git
```

### Configure Environment
Take a look at `.envsample` and rename it to `.env`. Edit the values according to your environment (please do not bring `.env` into source control)

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