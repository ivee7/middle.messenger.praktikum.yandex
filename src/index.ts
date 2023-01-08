import { registerComponent } from './utils/registerComponent';

import { HomePage } from './pages/home';
import { Button } from './components/button';
import { Link  } from './components/link';
import { SimpleInput } from './components/simple-input';
import { Input } from './components/input';
import { PlainInput } from './components/plain-input';
import { Burger } from './components/burger';
import { Search } from './components/search';
import { Error } from './components/error';
import { Mistake } from './components/mistake';
import { Message } from './components/message';
import { AddUser } from './components/add-user';
import { ApproveExit } from './components/approve-exit';
import { ChatItem } from './components/chat-item';
import { ClickMenu } from './components/click-menu';
import { DeleteUser } from './components/delete-user';
import { ModalSmall } from './components/modal-small';
import { ProfileForm } from './components/profile-form';
import { SuccessModal } from './components/success-modal';

registerComponent("Button", Button as any);
registerComponent("Link", Link as any);
registerComponent("SimpleInput", SimpleInput as any);
registerComponent("Input", Input as any);
registerComponent("PlainInput", PlainInput as any);
registerComponent("Burger", Burger as any);
registerComponent("Search", Search as any);
registerComponent("Error", Error as any);
registerComponent("Mistake", Mistake as any);
registerComponent("Message", Message as any);
registerComponent("AddUser", AddUser as any);
registerComponent("ApproveExit", ApproveExit as any);
registerComponent("ChatItem", ChatItem as any);
registerComponent("ClickMenu", ClickMenu as any);
registerComponent("DeleteUser", DeleteUser as any);
registerComponent("ModalSmall", ModalSmall as any);
registerComponent("ProfileForm", ProfileForm as any);
registerComponent("SuccessModal", SuccessModal as any);

window.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#root");

    const homePage = new HomePage();

    if (!root) {
        return;
    }

    root.append(homePage.getContent());
});
