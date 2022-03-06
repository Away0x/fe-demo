import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { timStore } from '../../store/tim';
import { setTabBarBadge } from '../../utils/wx';

Page({
    data: {
        sdkReady: false,
        conversationList: [],
        updateConversationList: false,
    },

    onLoad: async function (options) {
        this.storeBindings = createStoreBindings(this, {
            store: timStore,
            fields: ['sdkReady', 'conversationList'],
            actions: ['getConversationList'],
        });
    },

    onShow: function () {
        if (this.data.updateConversationList) {
            this.getConversationList();
            this.data.updateConversationList = false;
        }
        const unreadCount = wx.getStorageSync('unread-count');
        setTabBarBadge(unreadCount);
    },

    async handleTapConversation(event) {
        this.data.updateConversationList = true;
        const item = event.currentTarget.dataset.item;
        const user = item.userProfile;
        wx.navigateTo({
            url: `/pages/conversation/index?targetUserId=${user.userID}&service=`,
            events: {
                sendMessage: () => {
                    this.data.updateConversationList = false;
                },
            },
        });
    },

    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },

    handleToLogin() {
        wx.navigateTo({
            url: '/pages/login/index',
        });
    },
});
