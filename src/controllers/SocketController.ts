import { Socket } from "socket.io";
import { Message } from "../models";

class SocketController {
    connection = (socket: Socket)=> {
        socket.on('join-chat', (data) =>{
            const {userId, chatId} = data
            socket.join(chatId)
            console.log('user connected', userId)
            socket.broadcast.to(chatId).emit('user-connected', userId)

            socket.on('send-message', async (content)=>{
            const message = new Message({
                content,
                userId,
                chatId
            })
            await message.save()
            socket.broadcast.to(chatId).emit('receive-message', {content, userId})
            })

            socket.on('disconnect', ()=>{ 
                console.log('user disconnected', userId)
                socket.broadcast.to(chatId).emit('user-disconnected', userId)
            })
       
        })
    }




}

export default new SocketController()