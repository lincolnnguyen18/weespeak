# # LINCOLNNGUYEN18.COM
# # TURN/STUN

# # Kill coturn server
# sudo kill $(sudo lsof -t -i:3478) &>/dev/null
# sudo kill $(sudo lsof -t -i:3479) &>/dev/null
# sudo kill $(sudo lsof -t -i:5349) &>/dev/null
# sudo kill $(sudo lsof -t -i:5350) &>/dev/null
# sudo kill $(sudo lsof -t -i:7002) &>/dev/null
# screen -S l18-coturn -X quit
# screen -S l18-weespeak -X quit

# # Confirm killed
# echo "Checking if coturn is still alive..."
# sudo lsof -i :3478
# sudo lsof -i :3479
# sudo lsof -i :5349
# sudo lsof -i :5350
# sudo lsof -i :7002

if ! screen -list | grep -q 'd2'; then
  echo 'd2 already killed'
  exit 1
else
  echo "killing d2"
fi
. /media/sda1/deployment/ports.sh
screen -S 'd2' -X quit
echo "Checking if d2 still alive..."
lsof -i:$d2