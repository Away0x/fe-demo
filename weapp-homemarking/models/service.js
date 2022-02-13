import Http from '../utils/http';
import Base from './base';

class Service extends Base {
    static async publishService(data) {
        return await Http.request({
            url: 'v1/service',
            data,
            method: 'POST',
        });
    }

    static async getServiceStatus(type) {
        return Http.request({
            url: `v1/service/count?type=${type}`,
        });
    }

    static async getServiceById(id) {
        return Http.request({
            url: `v1/service/${id}`,
        });
    }

    static async updateServiceStatus(id, action) {
        return await Http.request({
            url: `v1/service/${id}`,
            data: {
                action: action,
            },
            method: 'POST',
        });
    }

    static async updateService(id, data) {
        return await Http.request({
            url: `v1/service/${id}`,
            data,
            method: 'PUT',
        });
    }

    async getServiceList(type = null, category_id = null) {
        if (!this.hasMoreData) {
            return this.data;
        }
        const serviceList = await Http.request({
            url: 'v1/service/list',
            data: {
                page: this.page,
                count: this.count,
                type: type || '',
                category_id: category_id || '',
            },
        });

        this.data = this.data.concat(serviceList.data);
        this.hasMoreData = !(this.page === serviceList.last_page);
        this.page++;
        return this.data;
    }

    async getMyServiceList(type, status) {
        if (!this.hasMoreData) {
            return this.data;
        }
        const serviceList = await Http.request({
            url: 'v1/service/my',
            data: {
                page: this.page,
                count: this.count,
                type,
                status,
            },
        });

        this.data = this.data.concat(serviceList.data);
        this.hasMoreData = !(this.page === serviceList.last_page);
        this.page++;
        return this.data;
    }
}

export default Service;
