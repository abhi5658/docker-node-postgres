# docker-node-postgres

### Basic express app

- Create docker image  
```bash
docker build . --tag node-server
```

- Run docker image with name as `local-server`
```bash
docker run --name local-server node-server
```

- Run docker image with name as `node-server-app` + internal port 5000 exposed to external port 5000 + detached mode
```bash
docker run --name node-server-app -p 5000:5000 -d node-server
```

- Create docker image with tag `node-server` - this will be image name also. This will remove the tag from the earlier image and will now only exist with image ID and no name or tag
```bash
# build new image
docker build --tag node-server .

# run the image
docker run --name node-server-app -p 5000:5000 -d node-server

# call localhost:5000 multiple times
```

- Now after adding .dockerignore => _node_modules, Dockerfile, README.md, commands.md_ will not be copied into the image while building it
```bash
# build new image
docker build --tag node-server .

# run the image
docker run --name node-server-app -p 5000:5000 -d node-server

# check container file system
docker exec -it node-server-app bash

# run ls command inside this bash
# call localhost:5000 multiple times
```

- Commands that can be run inside
```bash
ls 
# node_modules  package-lock.json  package.json  server.js
```

- Direct command(s)
```bash
docker exec node-server-app npm list
# docker-node-postgres@1.0.0 /app
# `-- express@4.17.1
# 
# npm notice
# npm notice New patch version of npm available! 7.6.0 -> 7.6.3
# npm notice Changelog: <https://github.com/npm/cli/releases/tag/v7.6.3>
# npm notice Run `npm install -g npm@7.6.3` to update!
# npm notice
```

### Postgres 

- Clone intial code setup from repo
```bash
git clone https://github.com/hidjou/classsed-docker-tutorial.git .
# clones the content into current directory
```

- Run postgres image (port = external:internal)
```bash
docker run --name postgres-docker -e POSTGRES_PASSWORD=12345678 -d -p 4321:5432 postgres
```

- Run psql with containerised postgres database
```bash
# if psql is installed on sytem
psql -d postgres -h localhost -p 4321 -U postgres

# OR we can use postgres container's psql
docker exec -it postgres-docker psql -U postgres

# postgres-#
# now all psql commands can be executed here (data shown from container)

# postgres-# \l
#                                  List of databases
#    Name    |  Owner   | Encoding |  Collate   |   Ctype    |   Access privileges
# -----------+----------+----------+------------+------------+-----------------------
#  postgres  | postgres | UTF8     | en_US.utf8 | en_US.utf8 |
#  template0 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
#            |          |          |            |            | postgres=CTc/postgres
#  template1 | postgres | UTF8     | en_US.utf8 | en_US.utf8 | =c/postgres          +
#            |          |          |            |            | postgres=CTc/postgres
```

- Run migrations
```bash
npm run migrate
# > docker-node-postgres@1.0.0 migrate D:\Path\docker-node-postgres
# > node scripts/migrate.js
# 
# Created users table!

# Run psql command to check new table at postgres=#
 \t
# public | users        | table    | postgres
# public | users_id_seq | sequence | postgres
```

- Clear everyting up for next part
```bash
# remove all older running containers/images 
docker ps # show running containers
docker stop CONTAINER_ID1 CONTAINER_ID2
docker rm CONTAINER_ID1 CONTAINER_ID2

# OR force stop + remove conatiner
docker rm -f CONTAINER_ID1 CONTAINER_ID2

docker images # show docker images
docker rmi node-server IMAGE_ID2
```

- Docker compose will do everything for you...
```bash
# warning: this will create+run containers in attached mode (As soon as you exit terminal containers are shut down)
docker-compose up

# use detached mode
docker-compose up -d
# Creating network "docker-node-postgres_default" with the default driver
# Creating docker-node-postgres_server_1 ... done
# Creating docker-node-postgres_db_1     ... done
```

- DB migrate+seed for docker composed containers
```bash
# migrate
docker exec -it docker-node-postgres_server_1 npm run migrate
# > docker-node-postgres@1.0.0 migrate
# > node scripts/migrate.js
# 
# Created users table!
# ------------------------------------------------------
# seed DB
docker exec -it docker-node-postgres_server_1 npm run seed
# > docker-node-postgres@1.0.0 seed
# > node scripts/seed.js
# 
# Added dummy users!
# ------------------------------------------------------
# Try localhost:5000
# Try localhost:5000/users -> 2 users
# Try POST localhost:5000/users body {"name":"Abhishek"}
# Try localhost:5000/users -> 3 users
```
