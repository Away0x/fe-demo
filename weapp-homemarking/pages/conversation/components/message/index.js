import { formatTime } from '../../../../utils/date';
import TIM from 'tim-wx-sdk-ws';

Component({
    properties: {
        message: Object,
    },
    observers: {
        message: function (message) {
            message.time = formatTime(message.time);
            this.setData({
                _message: message,
            });
        },
    },
    data: {
        _message: Object,
        TIM: TIM,
        flowEnum: {
            IN: 'in',
            OUT: 'out',
        },
    },
    methods: {
        async handleImageTap(event) {
            await wx.previewImage({
                urls: [event.currentTarget.dataset.image.url],
                current: event.currentTarget.dataset.image.url,
            });
        },

        handleSendLink(event) {
            this.triggerEvent('send', { service: event.detail.service });
        },

        handleSelect(event) {
            this.triggerEvent('select', { service: event.detail.service });
        },
    },
});
