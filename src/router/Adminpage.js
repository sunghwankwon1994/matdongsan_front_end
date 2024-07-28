const routes = [
    {
      path: "/Adminpage/CustomerInquiry",
      component: () =>
        import(/* webpackChunkName: "MainService" */ "@/views/Adminpage/CustomerInquiry"),
    },
    {
      path: "/Adminpage/ReportFalse",
      component: () =>
        import(/* webpackChunkName: "MainService" */ "@/views/Adminpage/ReportFalse"),
    },
    {
      path: "/ReportFalseDetail",
      component: () =>
        import(/* webpackChunkName: "MainService" */ "@/views/Adminpage/ReportFalseDetail"),
    },
    {
      path: "/CustomerInquiryDetail",
      component: () =>
        import(/* webpackChunkName: "MainService" */ "@/views/Adminpage/CustomerInquiryDetail"),
    },

      


  ];

  export default routes;