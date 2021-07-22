# LINCOLNNGUYEN18.COM
# TURN/STUN

# Start coturn server
screen -dmS lincolnnguyen18-turn-stun-coturn
screen -S lincolnnguyen18-turn-stun-coturn -X stuff "sudo turnserver -a -f -r -X 107.196.10.160/192.168.1.69 lincolnnguyen18.com\n"