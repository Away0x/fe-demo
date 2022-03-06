import Rating from '../../models/rating';

Page({
    data: {
        order: null,
        formData: {
            content: '',
            score: null,
        },
        illustration: [],
        rules: [
            {
                name: 'score',
                rules: [{ required: true, message: '请为该服务评分' }],
            },
            {
                name: 'content',
                rules: [
                    { required: true, message: '评价内容不能为空' },
                    { minlength: 10, message: '评价内容不能少于 10 个字' },
                ],
            },
        ],
    },
    onLoad: function (options) {
        const order = JSON.parse(options.order);
        this.setData({
            order,
        });
    },

    async handleSubmit(event) {
        this.selectComponent('#form').validate(async (valid, errors) => {
            if (!valid) {
                const errMsg = errors.map((error) => error.message);
                this.setData({
                    error: errMsg.join('；'),
                });
                return;
            }

            try {
                wx.showLoading({ title: '正在发布...', mask: true });

                const illustration = this.data.illustration.map((item) => item.url);
                await Rating.createRating(
                    this.data.order.id,
                    this.data.formData.score,
                    this.data.formData.content,
                    illustration,
                );
                wx.hideLoading();
                await wx.showModal({
                    title: '提示',
                    content: '评价成功，点击确定返回订单详情',
                    showCancel: false,
                });

                this.getOpenerEventChannel().emit('rating');
                wx.navigateBack();
            } catch (e) {
                wx.hideLoading();
            }
        });
    },

    handleRating(event) {
        this.setData({
            ['formData.score']: event.detail.rating,
        });
    },

    handleInputChange(event) {
        this.setData({
            ['formData.content']: event.detail.value,
        });
    },

    handleUploadSuccess(event) {
        this.data.illustration = event.detail.files;
    },

    handleUploadDelete: function (event) {
        const deleteIndex = this.data.illustration.findIndex((item) => item.key === event.detail.item.key);
        this.data.illustration.splice(deleteIndex, 1);
    },
});
