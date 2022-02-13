import Http from '../utils/http';
import Base from './base';

class Rating extends Base {
    static async createRating(order_id, score, content, illustration = []) {
        return Http.request({
            url: 'v1/rating',
            data: {
                order_id,
                score,
                content,
                illustration,
            },
            method: 'POST',
        });
    }

    static getRatingByOrderId(orderId) {
        return Http.request({
            url: `v1/rating/order`,
            data: {
                order_id: orderId,
            },
            method: 'get',
        });
    }

    async getMyRatingByServiceId(id) {
        return await Http.request({
            url: 'v1/rating/my',
            data: {
                service_id: id,
            },
        });
    }

    async getRatingListByServiceId(id) {
        if (!this.hasMoreData) {
            return this.data;
        }
        const ratingList = await Http.request({
            url: 'v1/rating/service',
            data: {
                service_id: id,
                page: this.page,
                count: this.count,
            },
        });
        this.data = this.data.concat(ratingList.data);
        this.hasMoreData = !(this.page === ratingList.last_page);
        this.page++;
        return this.data;
    }
}

export default Rating;
