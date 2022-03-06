import Tim from '../../../../models/tim';
import TIM from 'tim-wx-sdk-ws';
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings';
import { timStore } from '../../../../store/tim';

const tim = Tim.getInstance();

Component({
    behaviors: [storeBindingsBehavior],
    properties: {
        targetUserId: String,
        service: Object,
    },
    data: {
        scrollHeight: 0,
        content: '',
    },
    storeBindings: {
        store: timStore,
        fields: ['messageList', 'intoView'],
        actions: ['getMessageList', 'pushMessage', 'scrollMessageList', 'setTargetUserId'],
    },
    lifetimes: {
        attached: async function () {
            // 在组件实例进入页面节点树时执行
            this._setNavigationBarTitle();
            this.setScrollHeight();
            this.setTargetUserId(this.data.targetUserId);
            await this.getMessageList();

            if (this.data.service) {
                const createCustomMessage = tim.createMessage(
                    TIM.TYPES.MSG_CUSTOM,
                    this.data.service,
                    this.data.targetUserId,
                    'link',
                );
                this.pushMessage(createCustomMessage);
            }
        },
    },
    methods: {
        /**
         * @returns {void}
         */
        async _setNavigationBarTitle() {
            const res = await tim.getUserProfile(this.data.targetUserId);
            wx.setNavigationBarTitle({ title: res[0].nick || '慕慕到家' });
        },

        async handleScrolltoupper(event) {
            if (tim.isCompleted) {
                return;
            }
            wx.showLoading({ title: '加载中。。。', mask: true });
            await this.scrollMessageList();
            setTimeout(() => wx.hideLoading(), 1000);
        },

        async handleSendPicture() {
            const chooseImage = await wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
            });
            this.triggerEvent('sendmessage', {
                type: TIM.TYPES.MSG_FILE,
                content: chooseImage,
            });
        },

        async handleSend() {
            const text = this.data.content.trim();
            if (text === '') {
                return;
            }
            this.triggerEvent('sendmessage', {
                type: TIM.TYPES.MSG_TEXT,
                content: text,
            });
            this.setData({
                content: '',
            });
        },

        async handSendLink(event) {
            const service = event.detail.service;
            this.triggerEvent('sendmessage', {
                type: TIM.TYPES.MSG_CUSTOM,
                content: service,
            });
        },

        async handleSelect(event) {
            const service = event.detail.service;
            wx.navigateTo({ url: `/pages/service-detail/index?id=${service.id}` });
        },

        handleInput(event) {
            this.data.content = event.detail.value;
        },

        /**
         * @returns {void}
         */
        async setScrollHeight() {
            const systemInfo = await wx.getSystemInfo();
            const scrollHeight = systemInfo.windowHeight - (systemInfo.screenHeight - systemInfo.safeArea.bottom) - 95;
            this.setData({
                scrollHeight,
            });
        },
    },
});
