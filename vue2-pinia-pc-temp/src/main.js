import '@/utils/commonContext'
import { createPinia, PiniaVuePlugin} from 'pinia'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import '@/styles/common.scss'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false

const pinia = createPinia()
Vue.use(PiniaVuePlugin)
new Vue({
  router,
  pinia,
  render: function(h){
    return h(App)
  }
}).$mount('#app')
