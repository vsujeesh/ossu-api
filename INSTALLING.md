# OSSU API

**Open Source Society University API server**

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

### Create the data folder for MongoDB

```bash
$ mkdir data
```

### Verify MongoDB is set up properly
#### Start MongoDB

```bash
$ mongod --dbpath ./data
```

#### Test MongoDB Connection
```bash
$ node connected.js
> Connection OK
```

#### Create a collection (ie table)
```bash
$ node collection.js --create [name]
> Collection: [name] created successfully
```

#### Delete a collection
```bash
$ node collection.js --destroy [name]
> Collection: [name] deleted successfully
```

### Test server configuration 

#### Start the server
```
$ npm start
```

#### Test an api route
```
$ curl localhost:PORT/api/users
```
If it doesn't return an error or `Cannot GET /api/users` then it is set up successfully.