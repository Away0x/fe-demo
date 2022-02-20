import Rating from '../../models/rating';
import Service from '../../models/service';
import ServiceStatus from '../../enum/ServiceStatus';
import serviceAction from '../../enum/service-action';
import User from '../../models/user';
import serviceType from '../../enum/service-type';
import { getEventParam } from '../../utils/utils';

const ratingModel = new Rating();

Page({
    data: {
        ServiceStatus,
        serviceAction: serviceAction,
        serviceType: serviceType,
        isPublisher: false, // 是不是服务的所有者
        id: null,
        service: null,
        ratingList: [],
        noRefresh: false,
    },
    onLoad: async function (options) {
        this.data.id = options.id; // 路由参数
        await this._getService(this.data.id);
        await this._getServiceRatingList();
        this._checkRole();
    },

    async _getService(serviceId) {
        const service = await Service.getServiceById(serviceId);
        this.setData({
            service,
        });
    },

    async _getServiceRatingList() {
        const ratingList = await ratingModel.reset().getRatingListByServiceId(this.data.service.id);
        this.setData({
            ratingList,
        });
    },

    async handleUpdateServiceStatus(event) {
        const action = getEventParam(event, 'action');

        const content = this._generateModalContent(action);
        const modalRes = await wx.showModal({
            title: '注意',
            content,
            showCancel: true,
        });

        if (!modalRes.confirm) return;

        await Service.updateServiceStatus(this.data.id, action);
        await this.getService(this.data.id);
    },

    async handleUpdateService() {
        wx.navigateTo({
            url: `/pages/service-management/index?service=${JSON.stringify(this.data.service)}`,
        });
    },

    handleChat() {
        wx.navigateTo({
            url: `/pages/conversation/index?targetUserId=${this.data.service.publisher.id}&service=${JSON.stringify(
                this.data.service,
            )}`,
        });
    },

    handleOrder() {
        if (!wx.getStorageSync('token')) {
            wx.navigateTo({
                url: '/pages/login/index',
                events: {
                    login: () => {
                        this._checkRole();
                    },
                },
            });
            return;
        }
        const service = JSON.stringify(this.data.service);
        wx.navigateTo({
            url: `/pages/order/index?service=${service}`,
        });
    },

    _checkRole() {
        const userInfo = User.getUserInfoByLocal();
        if (userInfo && userInfo.id === this.data.service.publisher.id) {
            this.setData({
                isPublisher: true,
            });
        }
    },

    _generateModalContent(action) {
        let content;
        switch (action) {
            case serviceAction.PAUSE:
                content =
                    '暂停后服务状态变为“待发布”，' + '可在个人中心操作重新发布上线，' + '是否确认暂停发布该服务？';
                break;
            case serviceAction.PUBLISH:
                content = '发布后即可在广场页面中被浏览到，是否确认发布？';
                break;
            case serviceAction.CANCEL:
                content =
                    '取消后不可恢复，需要重新发布并提交审核；' +
                    '已关联该服务的订单且订单状态正在进行中的，仍需正常履约；' +
                    '是否确认取消该服务？';
                break;
        }

        return content;
    },

    async onReachBottom() {
        if (!ratingModel.hasMoreData) {
            return;
        }
        const ratingList = await ratingModel.getRatingListByServiceId(this.data.id);
        this.setData({
            ratingList,
        });
    },

    handlePreview() {
        this.data.noRefresh = true;
    },
});
