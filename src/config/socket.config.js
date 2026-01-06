import { Server } from "socket.io";
import chatService from "../modules/chat/chat.service.js";

let io;

export default function socketConfig(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId || 1;

        if (userId) {
            socket.join(`notificationUser-${userId}`);
        }

        socket.on('joinChat', async (data) => {
            const isParticipant = await chatService.userBelongsToChat(
                data.chatId,
                userId
            );

            if (!isParticipant) {
                return;
            }

            socket.join(`chatRoom-${data.chatId}`);
        });


        socket.on('sendMessage', async ({ chatId, content }) => {
            const message = await chatService.sendMessage({
                chatId,
                senderId: userId,
                content
            });

            socket.to(`chatRoom-${chatId}`).emit('newMessage', message);
        });
    });

    return io;
}

export const getIO = () => {
    if (!io) {
        throw ({ message: "Socket.io no ha sido inicializado", status: 500 });
    }

    return io;
}