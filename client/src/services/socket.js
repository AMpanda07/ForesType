import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('Connected to real-time session service');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('Disconnected from real-time session service');
      });
    }
  }

  emitSessionStart(data) {
    if (this.socket?.connected) {
      this.socket.emit('session:start', data);
    }
  }

  emitSessionUpdate(data) {
    if (this.socket?.connected) {
      this.socket.emit('session:update', data);
    }
  }

  emitSessionPause(data) {
    if (this.socket?.connected) {
      this.socket.emit('session:pause', data);
    }
  }

  emitSessionResume(data) {
    if (this.socket?.connected) {
      this.socket.emit('session:resume', data);
    }
  }

  emitSessionFinish(data) {
    if (this.socket?.connected) {
      this.socket.emit('session:finish', data);
    }
  }
}

export const socketService = new SocketService();
