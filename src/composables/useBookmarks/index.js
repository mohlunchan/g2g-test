import store from "@/store";
import { computed } from "vue";
import { DELETE_BOOKMARK } from "@/store/modules/bookmarks/mutation-types";

const useBookmarks = () => {
  //computed properties
  const totalBookmarks = computed(
    () => store.getters["bookmarks/totalBookmarks"]
  );
  const latestBookmarks = computed(
    () => store.getters["bookmarks/latestBookmarks"]
  );
  const list = computed(() => store.state.bookmarks.list);

  //methods
  const toggleBookmark = (payload) =>
    store.dispatch("bookmarks/toggleBookmark", payload);
  const isBookmarked = (value) =>
    store.getters["bookmarks/isBookmarked"](value);
  const deleteBookmark = (value) =>
    store.commit(`bookmarks/${DELETE_BOOKMARK}`, value);

  return {
    list,
    totalBookmarks,
    latestBookmarks,
    toggleBookmark,
    isBookmarked,
    deleteBookmark,
  };
};

export default useBookmarks;
