import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService {

  socket: any;

  constructor() {}

  connection(userId: string) {
    this.socket = io("http://localhost:3010", {
      extraHeaders: {
          userid: userId,
      }
  });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data)
  }

  on(event:string, callback: any) {
    this.socket.on(event, (callback))
  }

  closeSocket() {
    this.socket.close()
  }
}
