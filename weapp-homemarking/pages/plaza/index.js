import Category from '../../models/category';
import Service from '../../models/service';

const serviceModel = new Service();

Page({
    data: {
        loading: true,
        tabs: ['全部服务', '在提供', '正在找'],
        multiple: 0,
        categoryList: [],
        serviceList: [],
        showStatus: false,
    },
    async onLoad() {
        await this.getCategoryList();
        await this.getServiceList();
        this.setData({ loading: false });
    },
    async getCategoryList() {
        const categoryList = await Category.getCategoryListWithAll();
        this.setData({ categoryList, multiple: 2 });
    },
    async getServiceList(currentTabIndex = 0, categoryId = 0) {
        this.setData({
            currentTabIndex: currentTabIndex,
            currentCategoryId: categoryId,
            showStatus: false,
        });
        const serviceList = await serviceModel.reset().getServiceList(currentTabIndex, categoryId);
        this.handleScrollToTop();
        this.setData({
            showStatus: !serviceList.length,
            serviceList,
        });
    },
    handleTabChange(ev) {
        const index = ev.detail.index;
        this.getServiceList(index, this.data.currentCategoryId);
    },
    handleCategoryChange(ev) {
        const categoryId = ev.currentTarget.dataset.id;
        if (categoryId === this.data.currentCategoryId) return;
        this.getServiceList(this.data.currentTabIndex, categoryId);
    },
    handleScrollToTop: function () {
        wx.pageScrollTo({ scrollTop: 0 });
    },
    // 下拉刷新 (需要在 json 里面配置 enablePullDownRefresh)
    onPullDownRefresh: function () {
        this.getServiceList(this.data.currentTabIndex, this.data.currentCategoryId);
        wx.stopPullDownRefresh();
    },
    //上拉加载更多
    onReachBottom: async function () {
        if (!serviceModel.hasMoreData) return;
        const serviceList = await serviceModel.getServiceList(this.data.currentTabIndex, this.data.currentCategoryId);
        this.setData({ serviceList });
    },
});
