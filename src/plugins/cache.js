import { getDataStorage, setDataStorage, removeDataStorage } from '@/utils/util';

// 在vue实例上注入设置localstorage的方法

export default {
  install(Vue) {
    const context = Vue;
    context.prototype.$readCache = getDataStorage;
    context.prototype.$writeCache = setDataStorage;
    context.prototype.$removeCache = removeDataStorage;
  },
};
