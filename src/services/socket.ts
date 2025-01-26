import { io, Socket } from "socket.io-client";

const SOCK_URL = "http://localhost:3000";
let socket:Socket|null;


export const connectSocket=(authId:string) => {
        if(!socket){
            socket=io(SOCK_URL,{
                query:{userId:authId}
            })
            socket.connect()

            socket.on('connect',() =>{
                console.log('connected');
                
            })
        }

        return socket
    
}

export const getSocket =()=>socket

export const disconnectSocket = () => {
    if(socket){
        socket.disconnect()
        socket=null
    }
}