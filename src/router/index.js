import { createRouter, createWebHistory } from "vue-router";
import MyPage from "./MyPage";
import MainService from "./MainService";
import Qna from "./Qna";
import Payment from "./Payment";
import MainPage from "@/views/Mainpage";
import Signup from "./Signup";
import Adminpage from "./Adminpage";
import InvalidAccess from "@/components/InvalidAccess"; // 추가
import Auth from "@/apis/axiosConfig";
import PropertyForm from "./PropertyForm";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/FavoriteProperty",
    component: () =>
      import(
        /* webpackChunkName: "FavoriteProperty" */ "@/views/FavoriteProperty"
      ),
  },
  {
    path: "/invalid-access", // 잘못된 접근 페이지 추가
    name: "InvalidAccess",
    component: InvalidAccess
  },
  ...MyPage,
  ...MainService,
  ...Qna,
  ...Payment,
  ...Signup,
  ...Adminpage,
  ...PropertyForm
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'instant' };
  }
});

router.beforeEach((to, from, next) => {
  Auth.checkTokenExpiry();
  const token = localStorage.getItem('token');

  //로그인 토큰 유효성 & 접근 방지를 위한 네비게이션 가드
  if (!token && to.path !== '/login') {
    next();
  } else if (
    //to.matched: 현재 이동하려는 경로(to)와 일치하는 모든 라우트 기록이 담긴 배열
    //from.matched: 현재 경로(from)와 일치하는 모든 라우트 기록이 담긴 배열
    // 직접적인 url 접근을 방지하고 /Payment에서만 PaymetReult 페이지로 이동하도록 설정
    to.matched.some(record => record.path === '/Payment/PaymentResult/:product?') && 
    from.matched.every(record => record.path !== '/Payment') 
  ) {
    next({ name: 'InvalidAccess' }); // 잘못된 접근 페이지로 리디렉션
  } else {
    next();
  }
});

export default router;
