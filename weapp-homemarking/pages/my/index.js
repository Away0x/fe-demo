import Service from '../../models/service';
import Order from '../../models/order';
import roleType from '../../enum/role-type';
import { setTabBarBadge } from '../../utils/wx';
import serviceType from '../../enum/service-type';
import Token from '../../models/token';
import { appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid } from '../../config/grid';

Page({
    data: {
        userInfo: {
            nickname: '点击授权登录',
            avatar: '../../images/logo.png',
        },
        // 状态展示
        appointWithMeStatus: null,
        myAppointStatus: null,
        provideServiceStatus: null,
        seekServiceStatus: null,

        // 宫格配置
        // 预约我的宫格
        appointWithMeGrid: appointWithMeGrid,
        // 我的预约宫格
        myAppointGrid: myAppointGrid,
        // 我在提供宫格
        myProvideGird: myProvideGird,
        // 正在找宫格
        mySeekGrid: mySeekGrid,
    },

    async onShow() {
        const unreadCount = wx.getStorageSync('unread-count');
        setTabBarBadge(unreadCount);

        const res = await Token.verifyToken();
        if (res.valid) {
            const userInfo = wx.getStorageSync('userInfo');
            this.setData({
                ['userInfo.nickname']: userInfo.nickname,
                ['userInfo.avatar']: userInfo.avatar,
            });
            this._getOrderStatus();
            this._getServiceStatus();
        }
    },

    /**
     * @return void
     */
    async _getOrderStatus() {
        const appointWithMeStatus = Order.getOrderStatus(roleType.PUBLISHER);
        const myAppointStatus = Order.getOrderStatus(roleType.CONSUMER);
        this.setData({
            appointWithMeStatus: await appointWithMeStatus,
            myAppointStatus: await myAppointStatus,
        });
    },

    /**
     * @return void
     */
    async _getServiceStatus() {
        const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE);
        const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK);
        this.setData({
            provideServiceStatus: await provideServiceStatus,
            seekServiceStatus: await seekServiceStatus,
        });
    },

    handleToLogin() {
        wx.navigateTo({
            url: '/pages/login/index',
        });
    },

    handleNavToMyOrder(event) {
        const cell = event.detail.cell;
        if (!('status' in cell)) {
            wx.navigateTo({
                url: `/pages/refund-list/index?role=${cell.role}`,
            });
            return;
        }

        wx.navigateTo({
            url: `/pages/my-order/index?role=${cell.role}&status=${cell.status}`,
        });
    },

    handleNavToMyService(event) {
        const { type, status } = event.detail.cell;
        wx.navigateTo({
            url: `/pages/my-service/index?type=${type}&status=${status}`,
        });
    },
});
