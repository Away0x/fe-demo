import Http from '../utils/http';
import Token from './token';

class User {
    static async login() {
        const token = await Token.getToken();
        wx.setStorageSync('token', token);
        wx.setStorageSync('isLogin', true);
    }

    static getUserInfoByLocal() {
        return wx.getStorageSync('userInfo');
        // return {
        //     id: 1870,
        // };
    }

    static async getUserInfo() {
        const userInfo = await Http.request({ url: 'v1/user' });
        if (userInfo) {
            return userInfo;
        } else {
            return null;
        }
    }

    static async getUserSign() {
        return await Http.request({
            url: 'v1/user/sign',
        });
    }

    static async updateUserInfo(data) {
        const res = await Http.request({
            url: 'v1/user',
            data: {
                nickname: data.nickName,
                avatar: data.avatarUrl,
                gender: data.gender,
            },
            method: 'PUT',
        });
        wx.setStorageSync('userInfo', res);
    }
}

export default User;
