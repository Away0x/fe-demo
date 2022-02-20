Component({
    properties: {
        selected: {
            type: Number,
            value: 0,
        },
        count: {
            type: Number,
            value: 5,
        },
        size: {
            type: String,
            value: 40,
        },
        defaultColor: {
            type: String,
            value: '#888888',
        },
        selectedColor: {
            type: String,
            value: '#f3d066',
        },
    },
    data: {
        score: 0,
        currentIndex: -1,
    },
    methods: {
        handleSelect(event) {
            if (this.data.selected > 0) {
                return;
            }
            const index = event.currentTarget.dataset.index;
            this.setData({
                currentIndex: index,
            });
            const score = index + 1;
            this.triggerEvent('rating', { rating: score });
        },
    },
});
