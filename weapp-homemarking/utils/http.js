import APIConfig from '../config/api';
import { wxToPromise } from './wx';
import exceptionMessage from '../config/exception-message';
// import { createStoreBindings } from 'mobx-miniprogram-bindings';
// import { timStore } from '../store/tim';
// import User from '../models/user';

class Http {
    static async request({ url, data, method = 'GET', refetch = true }) {
        let res;
        try {
            res = await wxToPromise('request', {
                url: `${APIConfig.baseUrl}/${url}`,
                data,
                method,
                header: {
                    'content-type': 'application/json',
                    token: wx.getStorageSync('token'),
                },
            });
        } catch (e) {
            // 代码逻辑异常、无网络、请求超时会走这里
            Http._showError(-1);
            throw new Error(e.errMsg);
        }

        if (res.statusCode < 400) {
            return res.data.data;
        }

        if (res.statusCode === 401) {
            // wx.setStorageSync('isLogin', false);
            // Http.storeBindings = createStoreBindings(Http, {
            //     store: timStore,
            //     actions: ['logout', 'isReady'],
            // });
            // if (res.data.error_code === 10001) {
            //     if (Http.isReady()) {
            //         await Http.logout();
            //     }
            //     wx.navigateTo({
            //         url: '/pages/login/index',
            //     });
            //     throw Error('请求未携带令牌');
            // }
            // if (refetch) {
            //     return await Http._refetch({ url, data, method, refetch });
            // }
            // if (Http.isReady()) {
            //     await Http.logout();
            // }
        }

        this._showError(res.data.error_code, res.data.message);

        throw new Error(
            typeof res.data.message === 'object' ? Object.values(res.data.message).join(';') : res.data.message,
        );
    }

    // static async _refetch(data) {
    //     try {
    //         await User.login();
    //     } catch (error) {
    //         console.log('refetch-login', error);
    //     }
    //     data.refetch = false;
    //     return await Http.request(data);
    // }

    static _showError(errorCode, message = '') {
        let title;
        const errorMessage = exceptionMessage[errorCode];
        title = errorMessage || message || '未知异常';

        title = typeof title === 'object' ? Object.values(title).join(';') : title;

        wx.showToast({
            title,
            icon: 'none',
            duration: 3000,
        });
    }
}

export default Http;
