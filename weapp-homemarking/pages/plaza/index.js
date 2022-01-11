Page({
    data: {
        currentTabIndex: 0,
        tabs: ['全部服务', '在提供', '正在找'],
        categoryList: [
            {
                id: 1,
                name: 'c1'
            },
            {
                id: 2,
                name: 'c2'
            },
            {
                id: 3,
                name: 'c3'
            },
        ],
    },
    handleTabChange(ev) {
        const index = ev.currentTarget.dataset.index
        this.setData({
            currentTabIndex: index
        })
    },
    handleCategoryChange(ev) {
        const id = ev.currentTarget.dataset.id
        console.log(id)
    }
})