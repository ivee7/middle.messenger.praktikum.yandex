import Block from '../../utils/Block';
import template from './home.hbs';
import { Auth } from '../auth/index';
import { Registr } from '../registr/index';
import { Main } from '../main/index';
import { MainChat } from '../mainChat/index';
import { ToProfile } from '../toProfile/index';
import { Profile } from '../profile/index';
import { EditProfile } from '../editProfile/index';
import { ChangePassword } from '../changePassword/index';
import { ServerError } from '../serverError/index';
import { NotFound } from '../notFound/index';
import { SuccessModal } from '../../components/success-modal';
import { Mistake } from '../../components/mistake';
import { AddUser } from '../../components/add-user';
import { ApproveExit } from '../../components/approve-exit';
import { DeleteUser } from '../../components/delete-user';

export class HomePage extends Block {
    constructor() {
        super();
    }
    private root = document.querySelector("#root") as HTMLElement;

    render() {
        return this.compile(template, {
            children: this.children,
            goToAuth: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const authPage = new Auth();

                this.root.append(authPage.getContent());
            },
            goToRegistr: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const registrPage = new Registr();

                this.root.append(registrPage.getContent());
            },
            goToMain: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const mainPage = new Main();

                this.root.append(mainPage.getContent());
            },
            goToMainChat: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const mainChatPage = new MainChat();

                this.root.append(mainChatPage.getContent());
            },
            goToShowProfile: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const toProfilePage = new ToProfile();

                this.root.append(toProfilePage.getContent());
            },
            goToProfile: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const profilePage = new Profile();

                this.root.append(profilePage.getContent());
            },
            goToChangePassword: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const changePasswordPage = new ChangePassword();

                this.root.append(changePasswordPage.getContent());
            },
            goToEditProfile: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const editProfilePage = new EditProfile();

                this.root.append(editProfilePage.getContent());
            },
            goToServerError: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new ServerError();

                this.root.append(errorPage.getContent());
            },
            goToNotFoundError: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new NotFound();

                this.root.append(errorPage.getContent());
            },
            goToSuccessModal: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new SuccessModal();

                this.root.append(errorPage.getContent());
            },
            goToMistakeModal: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new Mistake();

                this.root.append(errorPage.getContent());
            },
            goToAddUser: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new AddUser();

                this.root.append(errorPage.getContent());
            },
            goToDeleteUser: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new DeleteUser();

                this.root.append(errorPage.getContent());
            },
            goToApproveExit: (e: Event) => {
                e.preventDefault();
                this.root.innerHTML = "";
                const errorPage = new ApproveExit();

                this.root.append(errorPage.getContent());
            },
        });
    }
}
