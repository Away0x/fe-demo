import { action, observable } from 'mobx-miniprogram';
import TIM from 'tim-wx-sdk-ws';
import Tim from '../models/tim';
import User from '../models/user';
import { setTabBarBadge } from '../utils/wx';

// https://github.com/wechat-miniprogram/mobx-miniprogram-bindings
export const timStore = observable({
    sdkReady: false,
    conversationList: [],
    messageList: [],
    _targetUserId: null,
    intoView: null,
    isCompleted: false,

    login: action(async function () {
        if (this.sdkReady) return;
        this._runListener();
        await Tim.getInstance().login();
    }),
    logout: action(async function () {
        await Tim.getInstance().logout();
    }),
    isReady: action(function () {
        return this.sdkReady;
    }),

    getConversationList: action(async function () {
        this.conversationList = await Tim.getInstance().getConversationList();
    }),

    getMessageList: action(async function () {
        if (!this._targetUserId) {
            throw Error('未指定目标用户 id');
        }

        this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId);
        this.intoView = this.messageList.length - 1;
        await Tim.getInstance().setMessageRead(this._targetUserId);
    }),

    setTargetUserId: action(function (targetUserId) {
        this._targetUserId = targetUserId;
    }),

    pushMessage: action(function (message) {
        this.messageList = this.messageList.concat([message]);
        this.intoView = this.messageList.length - 1;
    }),

    scrollMessageList: action(async function () {
        const messageList = await Tim.getInstance().getMessageList(this._targetUserId);
        this.intoView =
            this.messageList.length === Tim.getInstance().messageList.length
                ? messageList.length
                : messageList.length - 1;
        /**
         * tips
         * 1. MobX 中属性的值是 Array 的时候，他是一个被包装过的 Array，并非原生 Array，它是一个响应式对象
         * 2. 经过包装的 Array 同样具备大多数原生 Array 所具备的方法。
         * 3. 想把响应式的对象数组变成普通数组，可以调用slice()函数遍历所有对象元素生成一个新的普通数组
         */
        this.messageList = messageList.concat(this.messageList.slice());
    }),

    resetMessage: action(function () {
        this.messageList = [];
        this._targetUserId = null;
        this.intoView = 0;
        this.isCompleted = false;
    }),

    _runListener() {
        const sdk = Tim.getInstance().getSDK();
        sdk.on(TIM.EVENT.SDK_READY, this.onSDKReady, this);
        sdk.on(TIM.EVENT.SDK_NOT_READY, this.onSdkNotReady, this);
        sdk.on(TIM.EVENT.KICKED_OUT, this.onSdkNotReady, this);
        sdk.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated, this);
        sdk.on(TIM.EVENT.MESSAGE_RECEIVED, this._handleMessageReceived, this);
    },

    async onConversationListUpdated(event) {
        if (!event.data.length) {
            return;
        }

        this.conversationList = event.data;
        const unreadCount = event.data.reduce((sum, item) => sum + item.unreadCount, 0);
        setTabBarBadge(unreadCount);
    },

    async onSDKReady() {
        this.sdkReady = true;
        const userInfo = await User.getUserInfo();
        await Tim.getInstance().updateMyProfile(userInfo);
    },

    onSdkNotReady() {
        this.sdkReady = false;
        const sdk = Tim.getInstance().getSDK();
        sdk.off(TIM.EVENT.CONVERSATION_LIST_UPDATED);
        sdk.off(TIM.EVENT.MESSAGE_RECEIVED);
        sdk.off(TIM.EVENT.SDK_NOT_READY);
        sdk.off(TIM.EVENT.KICKED_OUT);
    },

    async _handleMessageReceived(event) {
        if (!this._targetUserId) {
            return;
        }
        const currentConversationMessage = event.data.filter((item) => item.from === this._targetUserId);
        if (currentConversationMessage.length) {
            this.messageList = this.messageList.concat(currentConversationMessage);
            this.intoView = this.messageList.length - 1;
            await Tim.getInstance().setMessageRead(this._targetUserId);
        }
    },
});
