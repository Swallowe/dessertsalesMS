import Vue from 'vue'
import router from "./router";
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
