import { createStore } from "vuex";
import bookmarks from "./modules/bookmarks";

export default createStore({
  modules: {
    bookmarks,
  },
});
