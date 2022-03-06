import { formatTime } from '../../../../utils/date';

Component({
    properties: {
        user: Object,
        lastMessage: Object,
        unreadCount: Number,
    },
    observers: {
        lastMessage: function (lastMessage) {
            lastMessage.lastTime = formatTime(lastMessage.lastTime);
            this.setData({
                _lastMessage: lastMessage,
            });
        },
    },
    data: {
        _lastMessage: null,
    },
    methods: {},
});
