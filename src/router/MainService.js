const routes = [
    {
        path: "/Property/:id?",
        component: () =>
          import(/* webpackChunkName: "MainService" */ "../views/MainService/Property"),
      },
      {
        path: "/Agent/:id?",
        component: () =>
          import(/* webpackChunkName: "MainService" */ "../views/MainService/Agent"),
      },
      


  ];

  export default routes;