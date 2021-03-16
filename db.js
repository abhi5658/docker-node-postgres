const knex = require('knex')

module.exports = knex({
  client: 'postgres',
  connection: {
    // host- same name as service in docker-compose; docker will automatically replace the address of db here
    host: 'db',
    user: 'docker', // same as mentioned in docker-compose
    password: '12345678',
    // name of user set to 'docker' in docker-compose hence a DB with same name created.
    // Read more at Docker Hub -> postgres -> Environment variables -> POSTGRES_USER
    database: 'docker',
    // port: 4321, // present inside the network hence default port 5432
  },
})
