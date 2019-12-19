# PostgreSQL Deployment

## Step 1 
- Ensure Everything Works Locally

## Step 2 
- Add 'pg' as dependency

`yarn add pg` 

or 

`npm install pg`

## Step 3 
- configure knexfile file for production
```
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "./data/migrations" },
    seeds: { directory: "./data/seeds" }
  }
```

## Step 3.5 (if not done prior) 
- configure dbConfig file for production
```
require('dotenv').config();

const knex = require("knex");
const config = require("../knexfile.js");
const environment = process.env.DB_CONNECT || "development";

module.exports = knex(config[environment]);
```

## Step 4 
- Make sure everything is pushed to master

## Step 5 
- Create a new heroku app
![alt text](img/create_new_app.JPG)
![alt text](img/name_new_app.JPG)

## Step 6 
- Connect to Github Repo
![alt text](img/connect_gh_01.JPG)
![alt text](img/connect_gh_02.JPG)

## Step 7 
- Deploy and Enable Auto Deployment
![alt text](img/deploy_01.JPG)
![alt text](img/deploy_02.JPG)

## Step 8 
- Ensure Deployment Was Successful

## Step 9 
- Go To Resources Tab of Heroku App
![alt text](img/pg_01.JPG)


- Under Add-ons find Heroku Postgres
![alt text](img/pg_02.JPG)
![alt text](img/pg_03.JPG)

- choose free version and click provision
![alt text](img/pg_04.JPG)

## Step 10
### Configure ENV variables

- Go to settings tab
![alt text](img/env_01.JPG)

- Click Reveal Config Vars
![alt text](img/env_02.JPG)
![alt text](img/env_03.JPG)

- Set DB_CONNECT to production
![alt text](img/env_04.JPG)

- Set any other needed ENV variables

## Step 11 
- Check routes to ensure connection to PG DB, SHOULD get an error

## Step 12 
- run migrations on heroku via (may be prompted to login to heroku through CLI)

	`npx heroku run knex migrate:latest --app your_heroku_app_name`

## Step 12.5 (optional) 
- run seeds on heroku via 

	`npx heroku run knex seed:run --app your_heroku_app_name`

## Step 13 
- Check routes to ensure connection to PG DB, SHOULD NOT get an error
