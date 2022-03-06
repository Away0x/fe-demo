import Service from '../../models/service';

const serviceModel = new Service();

Page({
    data: {
        loading: {
            hideTabsLoading: false,
            hideServiceLoading: false,
        },
        tabs: ['全部服务', '待审核', '待发布', '已发布'],
        currentTabIndex: 0,
        type: null,
        status: null,
        showStatus: false,
        serviceList: [],
    },

    onLoad: async function (options) {
        // status: '-1':全部  0：待审核、1、待发布、 2 已发布
        // tabs:    0：全部  1：待审核、 2、待发布、 3 已发布
        let status = parseInt(options.status);
        this.setData({ currentTabIndex: status + 1 });
        this.data.status = status < 0 ? '' : status;
        this.data.type = options.type;
        this._getServiceList();
    },

    /**
     * @returns {void}
     * @private
     */
    async _getServiceList() {
        this.setData({
            ['loading.hideServiceLoading']: false,
        });
        const serviceList = await serviceModel.reset().getMyServiceList(this.data.type, this.data.status);
        this.setData({
            ['loading.hideServiceLoading']: true,
            serviceList,
        });
        wx.pageScrollTo({
            scrollTop: 0,
        });
    },

    handleTabChange: async function (event) {
        const index = event.detail.index;
        this.setData({
            currentTabIndex: index,
        });

        this.data.status = index < 1 ? '' : index - 1;
        this._getServiceList();
    },

    async handleSelect(event) {
        const service = event.detail.service;
        wx.navigateTo({ url: `/pages/service-detail/index?id=${service.id}` });
    },

    handleScrollToTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
        });
    },

    async onPullDownRefresh() {
        this._getServiceList();
        wx.stopPullDownRefresh();
    },

    async onReachBottom() {
        if (!serviceModel.hasMoreData) {
            return;
        }
        const myServiceList = await serviceModel.getMyServiceList(this.data.type, this.data.status);
        this.setData({
            myServiceList,
        });
    },
});
