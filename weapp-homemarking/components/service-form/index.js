import Category from '../../models/category';
import serviceType from '../../enum/service-type';

const moment = require('../../lib/moment');

Component({
    properties: {
        form: Object,
    },
    data: {
        typeList: [
            {
                id: 1,
                name: '提供服务',
            },
            {
                id: 2,
                name: '找服务',
            },
        ],
        categoryList: [],
        typePickerIndex: null,
        categoryPickerIndex: null,
        files: [],
        formData: {
            type: null,
            title: '',
            category_id: null,
            cover_image_id: null,
            description: '',
            designated_place: false,
            begin_date: '',
            end_date: '',
            price: '',
        },
        rules: [
            {
                name: 'type',
                rules: { required: true, message: '请指定服务类型' },
            },
            {
                name: 'title',
                rules: [
                    { required: true, message: '服务标题内容不能为空' },
                    { minlength: 5, message: '服务描述内容不能少于 5 个字' },
                ],
            },
            {
                name: 'category_id',
                rules: { required: true, message: '未指定服务所属分类' },
            },
            {
                name: 'cover_image_id',
                rules: { required: true, message: '请上传封面图' },
            },
            {
                name: 'description',
                rules: [
                    { required: true, message: '服务描述不能为空' },
                    { minlength: 20, message: '服务描述内容不能少于 20 个字' },
                ],
            },
            {
                name: 'begin_date',
                rules: [{ required: true, message: '请指定服务有效日期开始时间' }],
            },
            {
                name: 'end_date',
                rules: [
                    { required: true, message: '请指定服务有效日期结束时间' },
                    {
                        validator: function (rule, value, param, models) {
                            if (moment(value).isSame(models.begin_date) || moment(value).isAfter(models.begin_date)) {
                                return null;
                            }
                            return '结束时间必须大于开始时间';
                        },
                    },
                ],
            },
            {
                name: 'price',
                rules: [
                    { required: true, message: '请指定服务价格' },
                    {
                        validator: function (rule, value, param, models) {
                            const pattern = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
                            const isNum = pattern.test(value);

                            if (isNum) {
                                return null;
                            }
                            return '价格必须是数字';
                        },
                    },
                    { min: 1, message: '天下没有免费的午餐' },
                ],
            },
        ],
        resetForm: true,
        showForm: true,
        serviceTypeEnum: serviceType,
    },

    pageLifetimes: {
        show: function () {
            if (this.data.resetForm) {
                this.init(this.data.form);
            }
            this.data.resetForm = true;
        },
        hide: function () {
            // 页面被隐藏
            if (this.data.resetForm) {
                this.setData({
                    showForm: false,
                });
            }
        },
    },

    methods: {
        submit() {
            this.selectComponent('#form').validate(async (valid, errors) => {
                if (!valid) {
                    const errMsg = errors.map((error) => error.message);
                    this.setData({
                        error: errMsg.join('；'),
                    });
                    return;
                }
                this.triggerEvent('submit', { formData: this.data.formData });
            });
        },

        async init(form) {
            const categoryList = await Category.getCategoryList();
            const typePickerIndex = this.data.typeList.findIndex((item) => item.id === form.type);
            const categoryPickerIndex = categoryList.findIndex((item) => item.id === form.category_id);

            this.setData({
                showForm: true,
                showSwitch: typePickerIndex === 0,
                files: form.cover_image ? [form.cover_image] : [],
                categoryPickerIndex: categoryPickerIndex > -1 ? categoryPickerIndex : null,
                typePickerIndex: typePickerIndex > -1 ? typePickerIndex : null,
                categoryList,
                formData: {
                    type: form.type,
                    title: form.title,
                    category_id: form.category_id,
                    cover_image_id: form.cover_image ? form.cover_image.id : null,
                    description: form.description,
                    designated_place: form.designated_place,
                    begin_date: form.begin_date,
                    end_date: form.end_date,
                    price: form.price,
                },
            });
        },

        bindTypePickerChange(event) {
            const index = event.detail.value;
            this.setData({
                typePickerIndex: index,
                'formData.type': this.data.typeList[event.detail.value].id,
            });
        },

        bindCategoryChange(event) {
            this.setData({
                categoryPickerIndex: event.detail.value,
                'formData.category_id': this.data.categoryList[event.detail.value].id,
            });
        },

        bindBeginDateChange(event) {
            this.setData({
                'formData.begin_date': event.detail.value,
            });
        },

        bindEndDateChange(event) {
            this.setData({
                'formData.end_date': event.detail.value,
            });
        },

        bindInputChange(event) {
            const { field } = event.currentTarget.dataset;
            this.setData({
                [`formData.${field}`]: event.detail.value,
            });
        },

        handleSwitchChange(event) {
            this.setData({
                'formData.designated_place': event.detail.value,
            });
        },

        handleHidePage() {
            this.data.resetForm = false;
        },

        handleUploadSuccess: function (event) {
            const files = event.detail.files;
            this.setData({
                'formData.cover_image_id': files[0].id,
            });
        },
    },
});
