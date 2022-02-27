import { timStore } from '../../store/tim';
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import Tim from '../../models/tim';

const tim = Tim.getInstance();

Page({
    data: {
        service: null,
        targetUserId: null,
    },
    onLoad: async function (options) {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            fields: ['sdkReady'],
            actions: ['pushMessage', 'resetMessage'],
        });
        this.setData({
            service: options.service ? JSON.parse(options.service) : null,
            targetUserId: options.targetUserId,
        });
    },

    async handleSendMessage(event) {
        const { type, content } = event.detail;
        const message = tim.createMessage(type, content, this.data.targetUserId);
        this.pushMessage(message);
        await tim.sendMessage(message);
        this.getOpenerEventChannel().emit('sendMessage');
    },

    onUnload() {
        this.resetMessage();
        this.storeBindings.destroyStoreBindings();
    },

    handleToLogin() {
        wx.navigateTo({ url: '/pages/login/index' });
    },
});
