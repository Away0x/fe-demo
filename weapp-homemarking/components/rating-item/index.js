Component({
    properties: {
        rating: Object,
    },
    data: {},
    methods: {
        handlePreview: function (event) {
            this.triggerEvent('preview');
            const index = event.currentTarget.dataset.index;
            wx.previewImage({
                urls: this.data.rating.illustration,
                current: this.data.rating.illustration[index],
            });
        },
    },
});
