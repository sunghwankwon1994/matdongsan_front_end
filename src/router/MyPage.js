const routes = [
  {
    path: "/MyPage/CustomerInquiry",
    component: () =>
      import(/* webpackChunkName: "MyPage" */ "@/views/Mypage/CustomerInquiry"),
  },
  {
    path: "/MyPage/ManageMyProperty",
    component: () =>
      import(
        /* webpackChunkName: "MyPage" */ "@/views/Mypage/ManageMyProperty"
      ),
  },

  {
    path: "/MyPage/ReportFalseListing",
    component: () =>
      import(
        /* webpackChunkName: "MyPage" */ "@/views/Mypage/ReportFalseListing"
      ),
  },
  {
    path: "/MyPage/DeleteAccount",
    component: () =>
      import(/* webpackChunkName: "MyPage" */ "@/views/Mypage/DeleteAccount"),
  },
  {
    path: "/MyPage/MyInfomation",
    component: () =>
      import(/* webpackChunkName: "MyPage" */ "@/views/Mypage/MyInfomation"),
  },

  // //아래 틀로 나중에 바꿀수 있음 후에 안쓰이면 삭제 해야함
  // {
  //   path: "/MyPage/Sidebar",
  //   component: () =>
  //     import(/* webpackChunkName: "MyPage" */ "@/views/Mypage/Sidebar.vue"),
  // },
];

export default routes;
