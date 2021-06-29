# Server Startup Processes

## NGINX

### setup process

```bash
# on mac if needed
brew install letsencrypt
# stop nginx before running letsencrypt
nginx -s stop
# run certbot; remember to add subdomains and add all domains to hosts file for computers on same LAN
sudo certbot certonly --standalone
# add additional domains
certbot -d original, extra, extra --expand
# 
```

### commands

```bash
# nginx conf
vim /etc/nginx/nginx.conf
# nginx start, stop, restart, status
sudo systemctl start nginx
sudo systemctl stop nginx`
sudo systemctl restart nginx
sudo systemctl status nginx
```

## MongoDB

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
