import Service from '../../models/service';

Page({
    data: {
        id: null,
        formData: null,
    },
    onLoad: async function (options) {
        const service = JSON.parse(options.service);
        this.init(service);
    },

    async handleSubmit(event) {
        const modalRes = await wx.showModal({
            title: '提示',
            content: '是否确认修改该服务？提交后会重新进入审核状态',
            showCancel: true,
        });

        if (!modalRes.confirm) {
            return;
        }
        wx.showLoading({ title: '正在提交...', mask: true });

        try {
            await Service.updateService(this.data.id, event.detail.formData);
        } finally {
            wx.hideLoading();
        }

        wx.redirectTo({ url: `/pages/publisher-success/index?type=${event.detail.formData.type}` });
    },

    init(service) {
        const formData = {
            type: service.type,
            title: service.title,
            category_id: service.category.id,
            description: service.description,
            designated_place: service.designated_place,
            cover_image: service.cover_image,
            begin_date: service.begin_date,
            end_date: service.end_date,
            price: service.price,
        };

        this.setData({
            id: service.id,
            formData,
        });
    },
});
