
const dgram = require("dgram");
const PORT = 3333;
const HOST = '127.0.0.1';

    const client = dgram.createSocket('udp4');
    const msg = Buffer.from("Pluralsight rockks");
    client.send(msg,0, 11, PORT, HOST, (err)=>{
       if (err) throw err;
       console.log('UDP message sent');
       client.close();
    });