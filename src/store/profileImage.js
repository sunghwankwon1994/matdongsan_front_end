import axios from "axios";
export default {
    namespaced: true,
  
    state: {
      profile: null,
    },
    getters: {
      getProfile(state, getters, rootState, rootGetters) {
        return state.profile;
      },
    },
    mutations: {
      setProfile(state, payload) {
        state.profile = payload;
      },
    },
    actions: {
      addAction(context, payload){
        context.commit("setCount",payload);
      }
    },
  };
  