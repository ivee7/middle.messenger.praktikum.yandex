import store from './Store';

interface IMessage {
  id: number;
  user_id: number;
  chat_id: number;
  type: 'message';
  time: string;
  content: string;
  is_read: boolean;
  file: null;
  not_mine?: boolean
}

export default class Socket {
  private _socket;
  private _timeout?: any;
  static API_URL = 'wss://ya-praktikum.tech/ws/chats/';

  constructor(endpoint: string, chatId: number) {
    this._socket = new WebSocket(`${Socket.API_URL}${endpoint}`);
    this._timeout = undefined;
    this.startSocketListeners(chatId);
  }

  private startSocketListeners(chatId: number) {
    this._socket.addEventListener('open', () => {
      clearInterval(this._timeout);
      this.ping();
      this.getMessages('0');
    });

    this._socket.addEventListener('message', (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data
        && data.type !== 'error'
        && data.type !== 'pong'
        && data.type !== 'user connected'
      ) {
        this.formatMessages(data);
        if (Array.isArray(data)) {
          store.set(`messages.${chatId}`, data);
        } else {
          store.set(`messages.${chatId}`, [
            ...store.getState().messages[chatId], data
          ]);
        }
      }
    });

    this._socket.addEventListener('close', (event: CloseEvent) => {
      if (event.wasClean) {
        store.set(`messages.${chatId}`, []);
      } else {
        console.error('[chat socket] Соединение прервано');
      }
      console.warn(`[chat socket] Закрытие соединения, причина: ${event.reason}`);
    });

    this._socket.addEventListener('error', (error: Event) => {
      console.error(`[chat socket] Ошибка: ${error}`);
    });
  }

  private ping() {
    this._timeout = setInterval(() => {
      this._socket.send(JSON.stringify({
        type: 'ping'
      }));
    }, 1000);
  }

  private getMessages(count: string) {
    this._socket.send(
      JSON.stringify({
        content: count,
        type: 'get old',
      })
    );
  }

  private formatMessages(data: IMessage | IMessage[]) {
    if (!Array.isArray(data)) {
      const day = new Date(data.time);
      data.time = day.toString();
    } else {
      data.sort((a, b) => {
        return Date.parse(a.time) - Date.parse(b.time);
      });
      data.map((item: IMessage) => {
        const day = new Date(item.time);
        item.time = day.toString();
        item.not_mine = (!store.getState().user || store.getState().user?.id !== item.user_id);
      })
    }
  }

  public sendMessage(message: string) {
    this._socket.send(
      JSON.stringify({
        content: message,
        type: 'message',
      })
    );
  }
}
