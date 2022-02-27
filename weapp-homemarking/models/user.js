import Http from '../utils/http';
import Token from './token';
import { genTestUserSig } from '../lib/tim/GenerateTestUserSig';

class User {
    static async login() {
        const token = await Token.getToken();
        wx.setStorageSync('token', token);
        wx.setStorageSync('isLogin', true);
    }

    static getUserInfoByLocal() {
        return wx.getStorageSync('userInfo');
        // return { id: 1870 };
    }

    static async getUserInfo() {
        const userInfo = await Http.request({ url: 'v1/user' });
        return userInfo || null;
    }

    static async getUserSign() {
        // 本地测试时前端生成 sign
        const user = User.getUserInfoByLocal();
        if (!user) return {};
        return { sign: genTestUserSig(user.id.toString()).userSig, user_id: user.id };

        // return await Http.request({
        //     url: 'v1/user/sign',
        // });
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
