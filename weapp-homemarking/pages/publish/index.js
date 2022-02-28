import Service from '../../models/service';
import { setTabBarBadge } from '../../utils/wx';

Page({
    data: {
        formData: {
            type: null,
            title: '',
            category_id: null,
            description: '',
            designated_place: false,
            begin_date: '',
            end_date: '',
            price: '',
            cover_image: null,
        },
    },

    onShow() {
        const unreadCount = wx.getStorageSync('unread-count');
        setTabBarBadge(unreadCount);
    },

    async handleSubmit(event) {
        const modalRes = await wx.showModal({
            title: '提示',
            content: '是否确认申请发布该服务？',
            showCancel: true,
        });

        if (!modalRes.confirm) {
            return;
        }
        wx.showLoading({ title: '正在发布...', mask: true });
        try {
            await Service.publishService(event.detail.formData);
            wx.hideLoading();
            this.resetForm();
            wx.navigateTo({ url: `/pages/publisher-success/index?type=${event.detail.formData.type}` });
        } catch (e) {
            console.log(e);
        }
        wx.hideLoading();
    },

    resetForm() {
        this.setData({
            formData: {
                type: null,
                title: '',
                category_id: null,
                description: '',
                designated_place: false,
                begin_date: '',
                end_date: '',
                price: '',
                coverImage: null,
            },
        });
    },
});
