import { registerComponent } from './utils/registerComponent';
import AuthController from './controllers/AuthController';
import Router from './utils/Router';

import { Button } from './components/button';
import { IconButton } from './components/icon-button';
import { Link  } from './components/link';
import { SimpleInput } from './components/simple-input';
import { Input } from './components/input';
import { PlainInput } from './components/plain-input';
import { Burger } from './components/burger';
import { Search } from './components/search';
import { Error } from './components/error';
import { Mistake } from './components/modals/mistake';
import { Messages } from './components/messages';
import { Message } from './components/message';
import { AddUser } from './components/modals/add-user';
import { CreateChat } from './components/modals/create-chat';
import { ApproveExit } from './components/modals/approve-exit';
import { ClickMenu } from './components/modals/click-menu';
import { DeleteUser } from './components/modals/delete-user';
import { ModalSmall } from './components/modals/modal-small';
import { ProfileForm } from './components/profile-form';
import { AvatarUploader } from './components/avatar-uploader';
import { ChangeAva } from './components/modals/change-ava';
import { SuccessModal } from './components/modals/success-modal';
import { Bar } from './components/modals/bar';
import { ChatsListItem } from './components/chats-list-item';
import { ChatsList } from './components/chats-list';

import { Login } from './pages/auth/login';
import { Register } from './pages/auth/register';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/profile/edit-profile';
import { EditPassword } from './pages/profile/edit-password';
import { Chat } from './pages/chat';

import './styles/index.scss';

registerComponent('Button', Button as any);
registerComponent('IconButton', IconButton as any);
registerComponent('Link', Link as any);
registerComponent('SimpleInput', SimpleInput as any);
registerComponent('Input', Input as any);
registerComponent('PlainInput', PlainInput as any);
registerComponent('Burger', Burger as any);
registerComponent('Search', Search as any);
registerComponent('Error', Error as any);
registerComponent('Mistake', Mistake as any);
registerComponent('Messages', Messages as any);
registerComponent('Message', Message as any);
registerComponent('AddUser', AddUser as any);
registerComponent('CreateChat', CreateChat as any);
registerComponent('ApproveExit', ApproveExit as any);
registerComponent('ChatsListItem', ChatsListItem as any);
registerComponent('ChatsList', ChatsList as any);
registerComponent('ClickMenu', ClickMenu as any);
registerComponent('DeleteUser', DeleteUser as any);
registerComponent('ModalSmall', ModalSmall as any);
registerComponent('ProfileForm', ProfileForm as any);
registerComponent('AvatarUploader', AvatarUploader as any);
registerComponent('ChangeAva', ChangeAva as any);
registerComponent('SuccessModal', SuccessModal as any);
registerComponent('Bar', Bar as any);

enum Routes {
    Index = '/',
    Register = '/sign-up',
    Profile = '/settings',
    EditData = '/settings/editData',
    EditPassword = '/settings/editPassword',
    Chats = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
    Router
      .use(Routes.Index, Login)
      .use(Routes.Register, Register)
      .use(Routes.Profile, Profile)
      .use(Routes.EditData, EditProfile)
      .use(Routes.EditPassword, EditPassword)
      .use(Routes.Chats, Chat);

    let isProtectedRoute = true;

    switch (window.location.pathname) {
      case Routes.Index:
      case Routes.Register:
        isProtectedRoute = false;
        break;
    }

    try {
      await AuthController.fetchUser();

      Router.start();

      if (!isProtectedRoute) {
        Router.go(Routes.Chats)
      }
    } catch (e) {
      Router.start();

      if (isProtectedRoute) {
        Router.go(Routes.Index);
      }
    }
});
