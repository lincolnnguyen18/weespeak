# Server Startup Processes

## NGINX

### setup process

```bash
# on mac if needed
brew install letsencrypt
# stop nginx before running letsencrypt
nginx -s stop
# run certbot; remember to add subdomains as well
sudo certbot certonly --standalone
# 
```

### commands

```bash
# nginx conf
vim /etc/nginx/nginx.conf
```

## MongoDB

### Server commands

```bash
# mongodb conf
vim /etc/mongod.conf
# start, stop, restart, status
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl restart mongod
sudo systemctl status mongod
# connect to mdb shell
mongo mongodb://username:password@mdb.weespeak.xyz
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
