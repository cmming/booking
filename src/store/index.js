import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from "./modules/common/user";


import booking from "./modules/forestage/booking";
import record from "./modules/forestage/record";





const store = new Vuex.Store({
    modules: { user,booking,record }
})
export default store