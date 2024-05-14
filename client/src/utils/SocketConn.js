import { io } from "socket.io-client"

const socket = io.connect("http://localhost:3001");
console.log("Socket init");

if(!socket){
    console.log("Socket not connected to 3001");
}
export { socket };