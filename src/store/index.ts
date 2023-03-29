import { createStore } from "vuex";
import user from "./modules/user";

// import actions from './actions.ts'
// import getters from './getters.ts'
// Vue.use(Vuex)
const store = createStore({
  modules: {
    user,
  }
})

export default store;