// import User from "./components/user/User.vue";
// import UserStart from "./components/user/UserStart.vue";
// import UserEdit from "./components/user/UserEdit.vue";
// import UserDetails from "./components/user/UserDetails.vue";
import Home from "./components/Home.vue";
import Header from "./components/Header.vue";

// Lazy Loading
const User = resolve => {
  require.ensure(["./components/user/User.vue"], () => {
    resolve(require("./components/user/User.vue"));
  });
};

const UserStart = resolve => {
  require.ensure(["./components/user/UserStart.vue"], () => {
    resolve(require("./components/user/UserStart.vue"));
  });
};

const UserEdit = resolve => {
  require.ensure(["./components/user/UserEdit.vue"], () => {
    resolve(require("./components/user/UserEdit.vue"));
  });
};

const UserDetails = resolve => {
  require.ensure(["./components/user/UserDetails.vue"], () => {
    resolve(require("./components/user/UserDetails.vue"));
  });
};

/*
// we can group bundle by adding group name as a parameter ('user')

const UserEdit = resolve => {
  require.ensure(["./components/user/UserEdit.vue"], () => {
    resolve(require("./components/user/UserEdit.vue"));
  }, 'user');
};

const UserDetails = resolve => {
  require.ensure(["./components/user/UserDetails.vue"], () => {
    resolve(require("./components/user/UserDetails.vue"));
  }, 'user');
};
*/

export const routes = [
  {
    path: "",
    name: "home",
    components: {
      default: Home,
      "header-top": Header
    }
  },
  {
    path: "/user",
    // component: User,
    components: {
      default: User,
      "header-bottom": Header
    },
    children: [
      { path: "", component: UserStart },
      {
        path: ":id",
        component: UserDetails,
        beforeEnter: (to, from, next) => {
          console.log("inside route setup");
          next();
        }
      },
      { path: ":id/edit", component: UserEdit, name: "userEdit" }
    ]
  },
  // { path: "/user/:id", component: User }
  // { path: "/redirect-me", redirect: "/user" },
  { path: "/redirect-me", redirect: { name: "home" } },
  { path: "*", redirect: "/" }
];
