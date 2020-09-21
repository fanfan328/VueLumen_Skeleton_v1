import VueRouter from 'vue-router'

//import components
import PostsIndex from './components/posts/Index'
import PostsCreate from './components/posts/Create'
import PostsEdit from './components/posts/Edit'

import Login from "./pages/Login.vue";

import DAdmin from "./pages/Admin/DashboardAdmin.vue";
import DUser from "./pages/User/DashboardUser.vue";


const routes = [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "DashAdmin",
      component: DAdmin
    //   ,meta: { requireAuth: true }
    },
    {
        path: "/user",
        name: "DashUser",
        component: DUser
        // ,meta: { requireAuth: true }
      },
    {
      path: '/home',
      name: 'posts',
      component: PostsIndex
    },
    {
      path: '/create',
      name: 'create',
      component: PostsCreate
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: PostsEdit
    }
  ];
  
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });

//   router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//       if (!localStorage.getItem("token")) {
//         next("/");
//       } else {
//         next();
//       }
//     } else {
//       next();
//     }
//   });

export default router