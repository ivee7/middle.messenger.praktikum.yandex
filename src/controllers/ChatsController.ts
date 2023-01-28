import API, {ChatAPI, ChatData} from '../api/ChatAPI';
import store from '../utils/Store';
import Socket from '../utils/WebSocket';
import UserController from './UserController';

export class ChatsController {

  private readonly api: ChatAPI;
  private _sockets: any | [];

  constructor() {
    this.api = API;
    this._sockets = {};
  }

  async get() {
    try {
      const chats = await this.api.getChat() as unknown as ChatData[];
      store.set('chat.list', chats)
      chats.map(async (chat) => {
        const userId = store.getState().user.id;
        await this.connectSocket(chat.id, userId);
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  async refetch() {
    try {
      const chats = await this.api.getChat();
      store.set('chat.list', chats)
    } catch (e: any) {
      console.error(e);
    }
  }

  async create(title:string) {
    try {
      const chat = await this.api.create(title);
      if(chat.id) {
        await this.get();
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  async deleteUser(login: string, chatID: number) {
    try {
      const user = await UserController.searchUser(login);

      if (!user) {
        return
      };
      if (user.length === 0) {
        console.error(`Пользователь ${login} не найден!`);
        return;
      }
      await this.api.deleteUser([user[0].id], chatID);
      await this.get()

    } catch (e: any) {
      console.error(e);
    }
  }

  async addUser(login: string, chatID: number) {
    try {
      const user = await UserController.searchUser(login);

      if (!user) {
        return
      };
      if (user.length === 0) {
        console.error(`Пользователь ${login} не найден!`);
        return;
      }

      await this.api.addUser([user[0].id], chatID)
      await this.get()

    } catch(e: any) {
      console.error(e)
    }
  }

  public async connectSocket(chatId: number, userId: number) {
    try {
      const {token} = await this.api.getToken(chatId) as unknown as Record<string, unknown>;
      const endpoint = `${userId}/${chatId}/${token}`;

      this._sockets[chatId] = new Socket(endpoint, chatId)
    } catch (error) {
      console.error(error)
    }
  }

  public async sendMessage(message: string, chatId: string) {
    try {
      if (this._sockets) {
        this._sockets[chatId].sendMessage(message);
        await this.refetch()
      }
    } catch (error) {
      console.error(error)
    }
  }

}

export default new ChatsController();
