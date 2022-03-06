import orderStatus from '../../enum/order-status';
import roleType from '../../enum/role-type';

Page({
    data: {},
    onLoad: function (options) {},

    handleCheckOrder: function () {
        wx.redirectTo({
            url: `/pages/my-order/index?role=${roleType.CONSUMER}&status=${orderStatus.UNCONFIRMED}`,
        });
    },

    handleNavToHome: function (event) {
        wx.switchTab({
            url: '/pages/plaza/index',
        });
    },
});
