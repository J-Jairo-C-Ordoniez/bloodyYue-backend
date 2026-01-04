import { Server } from "socket.io";

let io;

export default function socketConfig(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        const userId = socket.handshake.auth.userId;

        if(userId) {
            socket.join(`notificationUser-${userId}`);
        }

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    return io;
}

export const getIO = () => {
    if (!io) {
        throw({message: "Socket.io no ha sido inicializado", status: 500});
    }
    
    return io;
}