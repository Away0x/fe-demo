import { BehaviorSubject } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { RouteState } from 'aw-react-router-helper';
import { BehaviorSubjectStore } from '@away0x/react-rx-store';

type RedirectStatus = {
  path: string;    // 路由
  isLink?: boolean; // 是否为外链
};

export interface GlobalState {
  loading: boolean;
  loadingTip: string;
  redirect: RedirectStatus | null;
}

/**
 * 全局 store
 */
class GlobalStore extends BehaviorSubjectStore<GlobalState> {

  public readonly defaultState: GlobalState = {
    loading: false,
    loadingTip: '',
    redirect: null,
  };

  // 存储当前路由信息
  private currentRouteState = new BehaviorSubject<RouteState | null>(null);
  public get routeState() {
    return this.currentRouteState.getValue();
  }

  constructor() {
    super();

    // 监听路由变化
    this.currentRouteState.pipe(
      filter(s => !!s),
      map(s => s!.path),
      filter(s => s !== '/'),
      distinctUntilChanged(),
    ).subscribe(currentPath => {
      console.log(`[GlobalStore] watch route change: ${currentPath}`);
    });
  }

  unsubscribe() {
    super.unsubscribe();
    this.currentRouteState.unsubscribe();
  }

  public startLoading(tip = '') {
    if (this.state.loading && tip === '') return;

    this.commit(state => {
      state.loading = true;
      state.loadingTip = tip;
    });
  }

  public stopLoading() {
    this.commit(state => {
      state.loading = false;
      state.loadingTip = '';
    });
  }

  public saveRouteState(route: RouteState) {
    this.currentRouteState.next(route);
  }

  public redirect(rs: RedirectStatus | null) {
    this.commit(state => {
      state.redirect = rs;
    });
  }

}

export const globalStore = new GlobalStore();
