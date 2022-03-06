Component({
    properties: {
        service: Object,
    },
    observers: {
        service: function (service) {
            this.setData({
                _service: JSON.parse(service.payload.description),
            });
        },
    },
    data: {
        _service: null,
    },
    methods: {
        handleSelect() {
            this.triggerEvent('select', { service: this.data._service });
        },
        handleSendLink() {
            this.triggerEvent('send', { service: this.data._service });
        },
    },
});
