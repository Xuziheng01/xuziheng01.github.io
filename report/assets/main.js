import { createApp } from 'vue';
import App from '@/App.vue';

// copy大家的
import { httpPost, httpGet, httpPut } from "./utils/axios";
// naive-ui 全局引入(UI组件)
import naive from 'naive-ui';
// pinia 存储
import { createPinia } from 'pinia'
// viewerjs 全局引入(很好用的图片查看器)
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
// swiper
import './assets/swiper/swiper-bundle.min.css'
import './assets/swiper/swiper-bundle.min.js'
// 自己写的
import router from '@/router';
import api from '@/config/api';
import serve from '@/config/serve';
import testDataSource from '@/config/data';
import Images from '@/assets/index';

import { computed, ref } from "vue";
import { createDiscreteApi , darkTheme, lightTheme } from "naive-ui";
const themeRef = ref("light");
const configProviderPropsRef = computed(() => ({
  theme: themeRef.value === "light" ? lightTheme : darkTheme,
}));
const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"],
  { configProviderProps: configProviderPropsRef }
);

const app = createApp(App);
app.use(router);
app.use(naive);
app.use(createPinia());
app.use(VueViewer);
app.config.globalProperties.$api = api;
app.config.globalProperties.$serve = serve;
app.config.globalProperties.$testDataSource = testDataSource;
app.config.globalProperties.$assets = Images;
app.config.globalProperties.$get = httpGet;
app.config.globalProperties.$post = httpPost;
app.config.globalProperties.$put = httpPut;
app.config.globalProperties.$message = message;
app.config.globalProperties.$notification = notification;
app.config.globalProperties.$dialog = dialog;
app.config.globalProperties.$loadingBar = loadingBar;

app.mount('#app')
