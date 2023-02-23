import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  scrollBehavior:(to,from,savePosition)=>{
    if(savePosition){
      return savePosition
    }else{
      return{
        top:0
      }
    }
  },
  routes: [
    // {
    //   path: "",
    //   name: "login",
    //   meta:{
    //     keepAlive: false
    //   },
    //   component: () => import("@/views/RegisterLogin.vue"),
    // },
    {
      path: "/",
      name: "",
      meta:{
        keepAlive: false
      },
      component: () => import("@/views/welcome/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta:{
        keepAlive: false
      },
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta:{
        keepAlive: false
      },
      component: () => import("@/views/register/index.vue"),
    },
    {
      path: "/home",
      name: "home",
      meta:{
        keepAlive: false
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/main/index.vue"),
    },
  ],
});

export default router;
