import Vue from 'vue'
import Router from 'vue-router'
import { backstageRoutes, forestageRoutes,commom } from './map/index'
Vue.use(Router)

console.log([...forestageRoutes,...backstageRoutes,...commom])
export default new Router({
    mode: 'hash',
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [...forestageRoutes,...backstageRoutes,...commom]
})