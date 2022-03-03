# LINCOLNNGUYEN18.COM
# TURN/STUN

if screen -list | grep -q "l18-coturn"; then
    echo "Server already running"
    exit 1
fi

# Start coturn server
screen -dmS l18-coturn
screen -S l18-coturn -X stuff "sudo turnserver -a -f -r -X 107.196.10.160/192.168.1.69 lincolnnguyen18.com\n$my_pass\n"
screen -dmS l18-weespeak
screen -S l18-weespeak -X stuff "node index2.js\n"
