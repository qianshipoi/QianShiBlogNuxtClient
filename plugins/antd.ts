// 1. 引入组件
import Antd from 'ant-design-vue';
// 2. 引入组件样式
import 'ant-design-vue/dist/antd.css';
// 3. 注册
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd);
});
