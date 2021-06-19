# Test Cases

## WeeSpeak Part 1

### WebRTC for static credentials

#### Issues

- [X] Trickle ICE test fails for both STUN and TURN server on third attempt when executed from Coturn's LAN -> WebRTC seems to work fine for the tested situations so shelved for now

#### Successes

- WebRTC works with Coturn for two tabs from Coturn's LAN
- WebRTC works with Coturn for two tabs from separate mobile network
- WebRTC works with Coturn for two tabs between Coturn's LAN and a separate mobile network

#### Coturn startup parameters

Coturn was installed on Ubuntu.

  ```bash
  sudo turnserver -a -f -r -X 107.196.10.160/192.168.1.69 lincolnnguyen18.com
  ```

#### Generate OFFER from A to B

  ```javascript
  const iceConfiguration = { }
  iceConfiguration.iceServers = [];
  //turn server
  iceConfiguration.iceServers.push({
                  urls: 'turn:turn.lincolnnguyen18.com',
                  username: 'guest',
                  credential: 'somepassword'
              })
  //stun server
  iceConfiguration.iceServers.push({
                  urls: 'stun:stun.lincolnnguyen18.com'
              })
  /*iceConfiguration.iceServers.push({
    urls: 'turn:turn01.brie.fi:5349',
    username: 'brie',
    credential: 'fi'
  })
  iceConfiguration.iceServers.push({
    urls: 'stun:turn01.brie.fi:5349'
  })*/
  
  const localConnection = new RTCPeerConnection(iceConfiguration)
  localConnection.onicecandidate = e =>  {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
   console.log(JSON.stringify(localConnection.localDescription))
  }

  const sendChannel = localConnection.createDataChannel("sendChannel");
   sendChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
     sendChannel.onopen = e => console.log("open!!!!");
       sendChannel.onclose =e => console.log("closed!!!!!!");

  localConnection.createOffer().then(o => localConnection.setLocalDescription(o) )
  ```

#### Generate ANSWER from B to A

  ```javascript
  const offer = 
  const remoteConnection = new RTCPeerConnection()

  remoteConnection.onicecandidate = e =>  {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
   console.log(JSON.stringify(remoteConnection.localDescription) )
  }

  remoteConnection.ondatachannel= e => {
        const receiveChannel = e.channel;
        receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
        receiveChannel.onopen = e => console.log("open!!!!");
        receiveChannel.onclose =e => console.log("closed!!!!!!");
        remoteConnection.channel = receiveChannel;
  }

  remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))

  //create answer
  await remoteConnection.createAnswer().then(a => remoteConnection.setLocalDescription(a)).then(a=>
  console.log(JSON.stringify(remoteConnection.localDescription)))
  //send the anser to the client
  ```

#### Set B's ANSWER for A

  ```javascript
  const answer = 
  localConnection.setRemoteDescription (answer).then(a=>console.log("done"))
  ```

#### Send MESSAGE from A to B

  ```javascript
  sendChannel.send("hoho")
  ```

#### Send MESSAGE from B to A

  ```javascript
  remoteConnection.channel.send("haha")
  ```
