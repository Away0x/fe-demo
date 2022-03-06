Component({
    options: {
        multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    },
    relations: {
        '../grid-item/index': {
            type: 'child', // 关联的目标节点应为子节点
        },
    },
    lifetimes: {
        ready() {
            this._initGrid();
        },
    },
    properties: {
        rowNum: {
            type: Number,
            value: 3,
        },
        title: String,
        extend: String,
        extendCell: Object,
    },
    data: {
        gridItems: [],
    },

    methods: {
        _initGrid() {
            const items = this.getRelationNodes('../grid-item/index'); // 获取子组件
            const gridItems = items.map((item, index) => {
                return {
                    index,
                };
            });
            this.setData({
                gridItems,
            });
        },

        handleSelect: function (event) {
            this.triggerEvent('itemtap', { cell: event.detail.cell });
        },

        handleExtend: function () {
            this.triggerEvent('extendtap', { cell: this.data.extendCell });
        },
    },
});
