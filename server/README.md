# Server Startup Processes

## MongoDB server
```bash
# start mongodb server
sudo docker run -p 27017:27017 --name mdb mongo
# mongodb shell
sudo docker exec -it mdb mongo
```

## Node.js Express server
```bash
# dev
nodemon server
# production
npm start
# or
node server
```
