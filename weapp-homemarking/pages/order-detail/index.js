import orderStatus from '../../enum/order-status';
import Order from '../../models/order';
import roleType from '../../enum/role-type';
import Rating from '../../models/rating';
import orderAction from '../../enum/order-action';

Page({
    data: {
        order: null,
        role: null,
        rating: null,
        OrderStatus: orderStatus,
        RoleType: roleType,
    },
    onLoad: function (options) {
        const order = JSON.parse(options.order);
        const role = parseInt(options.role);

        this.setData({
            order,
            role,
        });
        if (order.status === orderStatus.COMPLETED) {
            this._getRating(order.id);
        }
    },

    async _getRating(orderId) {
        const rating = await Rating.getRatingByOrderId(orderId);
        this.setData({
            rating,
        });
    },

    async _getOrderById() {
        const order = await Order.getOrderById(this.data.order.id);
        this.setData({
            order,
        });
    },

    handleToChat: function (event) {
        const { targetUserId } = event.detail;
        wx.navigateTo({
            url: `/pages/conversation/index?targetUserId=${targetUserId}&service=${JSON.stringify(
                this.data.order.service_snap,
            )}`,
        });
    },

    handleRefund() {
        // 跳转售后服务页面
        wx.navigateTo({
            url: `/pages/refund/index?order=${JSON.stringify(this.data.order)}`,
        });
    },

    handleRating() {
        // 跳转评价页面
        wx.navigateTo({
            url: `/pages/rating/index?order=${JSON.stringify(this.data.order)}`,
            events: {
                rating: () => {
                    this._getOrderById();
                    this._getRating(this.data.order.id);
                },
            },
        });
    },

    async handlePay() {
        const modalRes = await wx.showModal({
            title: '注意',
            content: `您即将支付该服务费用：￥${this.data.order.price}元，是否确认支付`,
            showCancel: true,
        });
        if (!modalRes.confirm) return;
        // 模拟支付后订单状态改变
        await Order.updateOrderStatus(this.data.order.id, orderAction.PAY);
        // 跳转支付成功页面
        wx.navigateTo({
            url: '/pages/pay-success/index',
        });
        this._getOrderById();
    },

    async handleUpdateOrderStatus(event) {
        const action = event.detail.action;
        const content = this._generateModalContent(action);

        const modalRes = await wx.showModal({
            title: '注意',
            content,
            showCancel: true,
        });

        if (!modalRes.confirm) return;

        wx.showLoading({
            title: '正在提交...',
            mask: true,
        });
        try {
            await Order.updateOrderStatus(this.data.order.id, action);
        } catch (e) {
            return;
        }
        wx.hideLoading();
        this._getOrderById();
    },

    _generateModalContent(action) {
        let content;
        switch (action) {
            case orderAction.AGREE:
                content = '是否确认同意本次服务预约，同意后不可以撤销。';
                break;
            case orderAction.DENY:
                content = '是否确认拒绝本次服务预约，同意后不可以撤销。';
                break;
            case orderAction.CONFIRM:
                content = '是否确认本次服务已完成？';
                break;
            case orderAction.CANCEL:
                content = '是否确认取消本次服务订单，确认取消后不可以撤销。';
                break;
        }

        return content;
    },
});
