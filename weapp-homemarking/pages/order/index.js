import Order from '../../models/order';

Page({
    data: {
        service: null,
        address: null,
    },
    onLoad: function (options) {
        const service = JSON.parse(options.service);
        this.setData({
            service,
        });
    },
    onShow() {
        let userInfo = wx.getStorageSync('userInfo');

        if (userInfo.id === this.data.service.publisher.id) {
            wx.redirectTo({
                url: '/pages/service-detail/index',
            });
        }
    },
    async handleSelectAddress() {
        let address;
        try {
            address = await wx.chooseAddress();
        } catch (e) {
            address = null;
        }

        this.setData({
            address,
        });
    },

    async handleOrder() {
        if (this.data.service.designated_place && !this.data.address) {
            await wx.showModal({
                title: '错误',
                content: '该服务必须指定服务地点',
                showCancel: false,
            });
            return;
        }

        const modalRes = await wx.showModal({
            title: '注意',
            content: '是否确认预约该服务？',
            showCancel: true,
        });

        if (!modalRes.confirm) return;
        const order = {
            service_id: this.data.service.id,
            address: this.data.address,
        };

        wx.showLoading({ title: '正在预约...', mask: true });
        try {
            await Order.createOrder(order);
            wx.navigateTo({
                url: '/pages/order-success/index',
            });
            wx.hideLoading();
        } catch (e) {
            wx.hideLoading();
        }
    },
});
