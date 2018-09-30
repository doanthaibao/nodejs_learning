const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if(code !== 0 && !worker.exitedAfterDisconnect){
      console.log(`Worker ${worker.id} crashed. Starting a new worker`);
      cluster.fork();
    } 
  });
  
  process.on('SIGUSR2', ()=> {
    const workers = Object.values(cluster.workers);
    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if(!worker) return; 
      worker.on('exit', () => {
         if(!worker.exitedAfterDisconnect) return;
         console.log(`Exited process ${worker.process.pid}`);
         cluster.fork().on('listening', () => {
           restartWorker(workerIndex + 1);
         });
      });
      worker.disconnect(); 
    };
    restartWorker(0);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}