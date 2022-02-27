import TIM from 'tim-wx-sdk-ws';
import TIMUploadPlugin from 'tim-upload-plugin';
import User from './user';
import timConfig from '../config/tim';

class Tim {
    /**
     *
     * @type {Tim}
     */
    static instance = null;

    _SDKInstance = null;

    _nextReqMessageID = '';
    isCompleted = false;
    _messageList = [];
    get messageList() {
        return this._messageList;
    }

    constructor() {
        this._initTim();
    }

    //静态方法
    static getInstance() {
        if (!Tim.instance) {
            Tim.instance = new Tim();
        }
        return Tim.instance;
    }

    _initTim() {
        let options = {
            SDKAppID: timConfig.appId, // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
        };
        // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
        let SDKInstance = TIM.create(options); // SDK 实例通常用 tim 表示
        // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
        SDKInstance.setLogLevel(timConfig.logLevel); // 普通级别，日志量较多，接入时建议使用
        // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

        // 注册 COS SDK 插件
        SDKInstance.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        this._SDKInstance = SDKInstance;
    }

    getSDK() {
        return this._SDKInstance;
    }

    async login() {
        const userSign = await User.getUserSign();
        await this._SDKInstance.login({
            userID: userSign.user_id.toString(),
            userSig: userSign.sign,
        });
    }

    async logout() {
        const res = await this._SDKInstance.logout();
        return res.data;
    }

    async getConversationList() {
        const res = await this._SDKInstance.getConversationList();
        return res.data.conversationList;
    }

    async getMessageList(targetUserId, count = 10) {
        if (this.isCompleted) {
            return this._messageList;
        }

        const res = await this._SDKInstance.getMessageList({
            conversationID: `C2C${targetUserId}`,
            nextReqMessageID: this._nextReqMessageID,
            count: count > 15 ? 15 : count,
        });

        this._nextReqMessageID = res.data.nextReqMessageID;
        this.isCompleted = res.data.isCompleted;
        this._messageList = res.data.messageList;

        return this._messageList;
    }

    async getUserProfile(userId) {
        const res = await this._SDKInstance.getUserProfile({
            // 请注意：即使只拉取一个用户的资料，也需要用数组类型，例如：userIDList: ['user1']
            userIDList: [userId],
        });
        return res.data;
    }

    async updateMyProfile(userInfo) {
        await this._SDKInstance.updateMyProfile({
            nick: userInfo.nickname,
            avatar: userInfo.avatar,
            gender: userInfo.gender === 1 ? TIM.TYPES.GENDER_MALE : TIM.TYPES.GENDER_FEMALE,
        });
        wx.setStorageSync('userInfo', userInfo);
    }

    createMessage(type, content, targetUserId, extension = null) {
        let message;
        const params = {
            to: targetUserId,
            conversationType: TIM.TYPES.CONV_C2C,
            payload: null,
        };

        switch (type) {
            case TIM.TYPES.MSG_TEXT:
                params.payload = { text: content };
                message = this._SDKInstance.createTextMessage({ ...params });
                break;
            case TIM.TYPES.MSG_FILE:
                params.payload = { file: content };
                message = this._SDKInstance.createImageMessage({ ...params });
                break;
            case TIM.TYPES.MSG_CUSTOM:
                params.payload = {
                    data: 'service',
                    description: JSON.stringify(content),
                    extension,
                };
                message = this._SDKInstance.createCustomMessage({ ...params });
                break;
            default:
                throw Error('未知消息类型');
        }
        return message;
    }

    async sendMessage(message) {
        const res = await this._SDKInstance.sendMessage(message);
        return res.data;
    }

    async setMessageRead(targetUserId) {
        const res = await this._SDKInstance.setMessageRead({ conversationID: `C2C${targetUserId}` });
        return res.data;
    }

    createCustomMessage(to, payload, showType = 'link') {
        return this._SDKInstance.createCustomMessage({
            to,
            conversationType: TIM.TYPES.CONV_C2C,
            payload: {
                data: 'service',
                description: payload,
                extension: showType,
            },
        });
    }

    reset() {
        this._nextReqMessageID = '';
        this.isCompleted = false;
        this._messageList = [];
        return this;
    }
}

export default Tim;
