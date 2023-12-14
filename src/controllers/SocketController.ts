import { Socket } from "socket.io";
import { Message } from "../models";

class SocketController {
    connection = (socket: Socket)=> {
        socket.on('join-chat', (data) =>{
            const {userId, chatId} = data
            socket.join(chatId)
            console.log('user connected', userId)
            socket.broadcast.to(chatId).emit('user-connected', userId)
       
        })
        socket.on('send-message', async (data)=>{
            const {content, userId, chatId} = data
                console.log(content)
            const message = new Message({
                content: content,
                userId: userId,
                chatId: chatId
            })
            await message.save()
            console.log(message)
            socket.broadcast.to(chatId).emit('receive-message', {content, userId})
            })

            
            socket.on('disconnect', ()=>{
                console.log('user disconnected')
7            })
    }




}

export default new SocketController()