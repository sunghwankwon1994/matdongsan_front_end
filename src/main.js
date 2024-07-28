import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// bootstrap 관련 js와 css 로딩
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import axiosConfig from "./apis/axiosConfig";
// app 컴포넌트를 <div id="app"></div>에 내용으로 추가
import { quillEditor } from "vue3-quill";
store.dispatch("loadAuth"); //비동기
createApp(App).use(router).use(store).use(quillEditor).mount("#app");
