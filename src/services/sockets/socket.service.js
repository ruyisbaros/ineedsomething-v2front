import { io } from "socket.io-client";

class SocketService {
    socket;

    setupSocketConnection() {
        this.socket = io(process.env.REACT_APP_BASE_ENDPOINT, {
            transports: ['websocket'],
            secure: true
        });
        this.socketConnectionEvent()
    }

    socketConnectionEvent() {
        this.socket.on("connect", () => {
            console.log('Socket connected');
        })

        this.socket.on("disconnect", (reason) => {
            console.log(`Disconnected Reason: ${reason}`);
            this.socket.connect()
        })

        this.socket.on("connect_error", (error) => {
            console.log(`Disconnected error: ${error}`);
            this.socket.connect()
        })
    }
}

export const socketService = new SocketService()