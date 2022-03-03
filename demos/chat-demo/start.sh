# # LINCOLNNGUYEN18.COM
# # TURN/STUN

# if screen -list | grep -q "l18-coturn"; then
#     echo "Server already running"
#     exit 1
# fi

# # Start coturn server
# screen -dmS l18-coturn
# screen -S l18-coturn -X stuff "sudo turnserver -a -f -r -X 107.196.10.160/192.168.1.69 lincolnnguyen18.com\n$my_pass\n"
# screen -dmS l18-weespeak
# screen -S l18-weespeak -X stuff "node index2.js\n"


if screen -list | grep -q 'd2'; then
  echo 'd2 already started'
  exit 1
else
  echo "starting d2"
fi
. /media/sda1/deployment/ports.sh
screen -dmS 'd2'
screen -S 'd2' -X stuff 'source /media/sda1/deployment/ports.sh\n'
screen -S 'd2' -X stuff '(node index2.js)\n'
echo "Checking if d2 started..."
lsof -i:$d2