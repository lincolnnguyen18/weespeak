git pull
echo 'git pull done'
npm run build --prefix ../client/
echo 'npm run build for react done'
screen -S weespeak-node -X quit
screen -dmS weespeak-node
screen -S weespeak-node -X stuff "node server.js\n"
echo 'weespeak node server started'