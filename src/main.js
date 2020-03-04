import Vue from "vue"
import VueRouter from "vue-router"
import App from "./App.vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(fas)
Vue.component("fas", FontAwesomeIcon)
Vue.config.productionTip = false

import routes from "./routes.js"
Vue.use(VueRouter)
const router = new VueRouter({routes})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
