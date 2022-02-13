import serviceType from '../../enum/service-type';

Component({
    properties: {
        service: Object,
    },
    data: {
        serviceType: serviceType,
    },
    methods: {
        handleSelect() {
            this.triggerEvent('select', { service: this.properties.service });
        },
    },
});
