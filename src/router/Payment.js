const routes = [
  {
    path: "/Payment",
    component: () =>
      import(/* webpackChunkName: "Payment" */ "@/views/Payment/Payment"),
  },
  {
    path: "/Payment/PaymentInfo",
    component: () =>
      import(/* webpackChunkName: "Payment" */ "@/views/Payment/PaymentInfo"),
  },
  {
    path: "/Payment/PaymentResult/:product?",
    component: () =>
      import(/* webpackChunkName: "Payment" */ "@/views/Payment/PaymentResult"),
  },
];

export default routes;
