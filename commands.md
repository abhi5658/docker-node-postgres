
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
