import Home from "../views/Home.vue";
import Contact from "../views/contact.vue";
import _id from "../views/_id/index.vue";
import _bookId from "../views/_id/_bookId.vue";
import _innerId from "../views/_id/_inner.vue";
import Appels from "../views/rahbariyatga-murojaat.vue";
import Search from "../views/search";
export default [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact-info",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/rahbariyatga-murojaat",
    name: "Appels",
    component: Appels,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
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
