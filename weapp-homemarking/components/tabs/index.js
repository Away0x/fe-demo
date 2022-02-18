import { throttle } from '../../utils/utils';

const moment = require('../../lib/moment');

Component({
    options: {
        multipleSlots: true,
    },
    properties: {
        tabs: Array,
        active: {
            type: Number,
            value: 0,
        },
    },
    data: {
        currentTabIndex: 0,
    },
    lifetimes: {
        attached() {
            this.data.lastClickTime = moment();
        },
    },
    observers: {
        active: function (value) {
            this.setData({
                currentTabIndex: this.data.active,
            });
        },
    },
    methods: {
        handleSwitchTab: function (event) {
            const index = event.currentTarget.dataset.index;
            if (this.data.currentTabIndex === index) {
                const now = moment();
                const diff = now.diff(this.data.lastClickTime);
                if (diff < 250) {
                    this.triggerEvent('doubleclicktab');
                }
                this.data.lastClickTime = now;
                return;
            }
            throttle(() => {
                this.setData({ currentTabIndex: index });
                this.triggerEvent('change', { index });
            })();
        },
        handleTouchmove: function (event) {
            const direction = event.direction;

            const currentTabIndex = this.data.currentTabIndex;
            const targetTabIndex = currentTabIndex + direction;

            if (targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1) {
                return;
            }

            const customEvent = {
                currentTarget: {
                    dataset: {
                        index: targetTabIndex,
                    },
                },
            };
            this.handleSwitchTab(customEvent);
        },
    },
});
