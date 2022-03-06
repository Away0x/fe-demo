Component({
    relations: {
        '../grid/index': {
            type: 'parent', // 关联的目标节点应为子节点
        },
    },
    properties: {
        cell: Object,
        icon: String,
        iconSize: {
            type: String,
            value: '50',
        },
        text: String,
        showBadge: Boolean,
        badgeCount: Number,
    },
    data: {},
    methods: {
        handleSelect: function () {
            this.triggerEvent('select', { cell: this.data.cell }, { bubbles: true, composed: true });
        },
    },
});
