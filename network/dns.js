const dns = require("dns");

dns.lookup('pluralsight.com', (err, address)=> {
    if(err){
        console.log(`Error ${err}`);
    }
    else{
           console.log(address);  
    }
});
dns.reverse("52.26.150.57", (err, hostnames) => {
   console.log(hostnames); 
});