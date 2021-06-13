import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouter from "vue-router";
import Login from "@/components/Login";
import OrdenPago from "@/components/OrdenPago";
import ConsultaPago from "@/components/ConsultaPago";
Vue.use(VueRouter);
Vue.use(VueSweetalert2);
const routes = [
  {path: '/', component: OrdenPago},
  {path: '/login', component: Login},
  {path: '/consulta-pago',name:'consulta-pago', component: ConsultaPago}

];
const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
