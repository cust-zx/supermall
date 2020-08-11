import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import FastClick from "fastclick"
import vueLazyLoad from "vue-lazyload"
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//移动端300ms的延迟
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
