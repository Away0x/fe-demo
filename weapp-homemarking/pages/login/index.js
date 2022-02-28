import { createStoreBindings } from 'mobx-miniprogram-bindings';

import User from '../../models/user';
import { timStore } from '../../store/tim';

Page({
    data: {
        userAvatar: '',
        userName: '',
    },
    onLoad: function (options) {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            actions: { timLogin: 'login' },
        });
    },

    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },

    async handleUserInfo(event) {
        const res = await wx.getUserProfile({ desc: '完善用户信息' });

        wx.showLoading({ title: '正在授权', mask: true });

        try {
            await User.login();
            await User.updateUserInfo(res.userInfo);
            await this.timLogin();
            const eventChannel = this.getOpenerEventChannel();
            eventChannel.emit('login'); // 返回上一页会触发 login 事件
            wx.navigateBack();
        } catch (e) {
            wx.showModal({
                title: '注意',
                content: '登陆失败，请稍后重试',
                showCancel: false,
            });
            console.warn(e);
        }
        wx.hideLoading();
    },

    handleBackHome() {
        wx.switchTab({
            url: '/pages/plaza/index',
        });
    },
});
