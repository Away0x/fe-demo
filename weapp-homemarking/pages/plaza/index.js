Page({
    data: {
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
        console.log(ev)
    },
    handleCategoryChange(ev) {
        console.log(ev)
    }
})
