import Home from "../views/Home.vue";
import _id from "../views/_id/index.vue";
import _bookId from "../views/_id/_bookId.vue";
import _innerId from "../views/_id/_inner.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:id",
    name: "_id",
    component: _id,
  },
  {
    path: "/:id/:bookId",
    name: "_bookId",
    component: _bookId,
  },
  {
    path: "/:id/:typeId/:innerId",
    name: "_innerId",
    component: _innerId,
  },
];
