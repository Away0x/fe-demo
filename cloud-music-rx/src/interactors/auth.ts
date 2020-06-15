import { Singleton } from '@/tools/Singleton';
import { authStore } from '@/stores';

class AuthInteractor extends Singleton {

  public get isLogin(): boolean {
    return authStore.state.isLogin;
  }

  public async login() {
    authStore.login();
  }

  public async logout() {
    authStore.logout();
  }

}

export const authInteractor = AuthInteractor.instance<AuthInteractor>();
