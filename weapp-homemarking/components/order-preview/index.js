import orderStatus from '../../enum/order-status';
import roleType from '../../enum/role-type';

Component({
    properties: {
        hideTop: {
            type: Boolean,
            value: false,
        },
        role: Number,
        order: Object,
    },
    data: {
        OrderStatus: orderStatus,
        RoleType: roleType,
    },

    methods: {
        handleNavToServiceDetail() {
            const serviceId = this.data.order.service_snap.id;
            wx.navigateTo({ url: `/pages/service-detail/index?id=${serviceId}` });
        },
    },
});
