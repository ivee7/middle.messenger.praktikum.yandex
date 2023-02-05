import { User } from './AuthAPI';
import BaseAPI from './BaseAPI';

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User;
    time: string;
    content: string;
  };
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public getChat(): Promise<ChatData> {
    return this.http.get('/');
  }

  public create(title: string): Promise<{ id: string }> {
    return this.http.post('/', { title });
  }

  public delete(chatId: number): Promise<unknown> {
    return this.http.delete('/', { chatId });
  }

  public deleteUser(userId: number[], chatId: number): Promise<unknown> {
    return this.http.delete('/users', {
      users: userId,
      chatId: chatId
    });
  }

  public getToken(id: number) {
    return this.http.post(`/token/${id}`, {});
  }

  public addUser(userId: number[], chatId: number) {
    return this.http.put('/users', {
      users: userId,
      chatId: chatId
    });
  }

  update = undefined;
  read = undefined;
}

export default new ChatAPI();
