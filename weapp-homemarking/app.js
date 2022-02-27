import { createStoreBindings } from 'mobx-miniprogram-bindings';

import Token from './models/token';
import { timStore } from './store/tim';

App({
    async onLaunch() {
        const res = await Token.verifyToken();

        // 把 store 里面的 login 挂载到 this 对象上
        const storeBindings = createStoreBindings(this, {
            store: timStore,
            actions: ['login'],
        });

        if (res.valid) {
            await this.login(); // tim login
        }

        storeBindings.destroyStoreBindings();
    },
});
