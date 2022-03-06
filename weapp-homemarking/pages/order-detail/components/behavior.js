import orderStatus from '../../../enum/order-status';
import orderAction from '../../../enum/order-action';

const behavior = Behavior({
    behaviors: [],
    properties: {
        order: Object,
    },
    data: {
        orderStatus,
        orderAction,
    },

    methods: {
        handleUpdateOrderStatus: function (event) {
            const action = event.currentTarget.dataset.action;
            this.triggerEvent('update-status', { action });
        },
    },
});

export default behavior;
