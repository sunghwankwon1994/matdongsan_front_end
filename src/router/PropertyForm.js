const routes = [
  {
    path: "/PropertyForm",
    component: () =>
      import(/* webpackChunkName: "PropertyForm" */ "@/views/PropertyForm"),
  },
  {
    path: "/PropertyForm/:id?",
    component: () =>
      import(
        /* webpackChunkName: "PropertyForm" */ "../views/PropertyForm"
      ),
  },
];

export default routes;
