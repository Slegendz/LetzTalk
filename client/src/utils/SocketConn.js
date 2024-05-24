import { io } from "socket.io-client"

const socket = io.connect("https://letztalk.onrender.com");
console.log("Socket init");

if(!socket){
    console.log("Socket not connected to 3001");
}
export { socket };