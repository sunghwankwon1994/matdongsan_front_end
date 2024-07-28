import axios from "axios";
export default {
    namespaced: true,
  
    state: {
      changeProfile: false,
    },
    getters: {
      getChangeProfile(state, getters, rootState, rootGetters) {
        return state.changeProfile;
      },
    },
    mutations: {
      setChangeProfile(state) {
        state.changeProfile = !state.changeProfile;
        console.log("프로필 사진 변경을 의미하는 전역 함수 실행");
      },
    },
    actions: {
      
    },
  };
  