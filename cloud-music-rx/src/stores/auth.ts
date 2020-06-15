import { BehaviorSubjectStore } from '@away0x/react-rx-store';

interface AuthState {
  userInfo: Auth.UserInfo | null;
  isLogin: boolean
}

class AuthStore extends BehaviorSubjectStore<AuthState> {

  public readonly defaultState: AuthState = {
    userInfo: null,
    isLogin: false,
  };

  public login() {
    this.commit(state => {
      state.userInfo = {name: '有只猫'}; // mock user data
      state.isLogin = true;
    });
  }

  public logout() {
    this.commit(state => {
      state.userInfo = null;
      state.isLogin = false;
    });
  }

}

export const authStore = new AuthStore();
