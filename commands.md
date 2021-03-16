
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
