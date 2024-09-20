import express from 'express';
import {createServer} from 'node:http'
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';
import readline from "readline";
import  url  from 'node:url';

const app = express();
const server = createServer(app);
const io = new  Server(server);


const __dirname = dirname(fileURLToPath(import.meta.url));

// directory to static files
app.use(express.static(join(__dirname, 'src')));

// reading from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// home router
app.get('/*',(req,res) => {
    const requestedPath = req.path == '/' ? '/src/index.html' : `/src/routes/${req.path}/index.html`;
    res.sendFile(join(__dirname,requestedPath),(err)=>{
        if(err){
            res.status(404).sendFile(join(__dirname,'/src/routes/page-not-found/index.html'));
        }
    });
})


// first server launch
let PORT = 3000;
const launchServer = (port) => {
 server.listen(port,()=>console.log("Listening at port: http://localhost:"+port));    
}
launchServer(PORT);
 
// detect error
 server.on('error',(error)=>{
    if(error.code == 'EADDRINUSE'){
        rl.question("do you want to open the app on  another port? (y (YES),n (No))",(answer)=>{
            console.log(answer);
            if(answer.toLowerCase() == 'y'){
                launchServer(PORT+1);
            }else{
                console.log("ERR001: exiting server in use");
                rl.close();
            }
        })
    }else{
        console.log(error);
        rl.close();
    }
 })  



//  initialize the sockets connection
io.on('connection',(socket)=>{
    const code = socket.handshake.headers.referer || null;
    if(code){
        const parsedUrl = url.parse(code,true);
        const roomcode = parsedUrl.query.code;
        console.log("user connected");
        // send messages to the user
        socket.on(roomcode,(msg)=>{
            io.emit(roomcode,msg);
        })
    }
    io.on('disconnect', ()=>{
        console.log("user disconnected");
    })
})
