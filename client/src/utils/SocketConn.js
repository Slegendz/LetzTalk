import { io } from "socket.io-client"

const socket = io.connect(`${import.meta.env.VITE_BASE_URL}`);
console.log("Socket init");

if(!socket){
    console.log("Socket not connected to 3001");
}
export { socket };