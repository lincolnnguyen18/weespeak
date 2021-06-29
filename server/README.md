# Commands

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

### Server management

```bash
# mongodb conf
vim /etc/mongod.conf
# start, stop, restart, status
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl restart mongod
sudo systemctl status mongod
# connect to mdb shell
mongo mongodb://username:password@mdb.weespeak.xyz/db-name
```

### Databae management

```bash
# switch to a db
use db-name
# create user
db.createUser(
  {
    user: "username",
    pwd: passwordPrompt(),  // or cleartext password
    roles: [
       { role: "readWrite", db: "db-name" }
    ]
  }
)
# show db admin users
show users
# delete user
db.dropUser('their name here')
# show collections
show collections
# show everything in a collection
db.collection-name.find()
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
