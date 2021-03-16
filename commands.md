
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
