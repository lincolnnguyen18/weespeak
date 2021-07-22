# LINCOLNNGUYEN18.COM
# TURN/STUN

# Kill coturn server
sudo kill $(sudo lsof -t -i:3478) &>/dev/null
sudo kill $(sudo lsof -t -i:3479) &>/dev/null
sudo kill $(sudo lsof -t -i:5349) &>/dev/null
sudo kill $(sudo lsof -t -i:5350) &>/dev/null
screen -S lincolnnguyen18-turn-stun-coturn -X quit

# Confirm killed
echo "Checking if coturn is still alive..."
sudo lsof -i :3478
sudo lsof -i :3479
sudo lsof -i :5349
sudo lsof -i :5350