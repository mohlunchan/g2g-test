import { ADD_BOOKMARK, DELETE_BOOKMARK } from "./mutation-types";

const latestBookmarksSize = 5;

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    [ADD_BOOKMARK](state, payload) {
      state.list.push(payload);
    },
    [DELETE_BOOKMARK](state, value) {
      state.list = state.list.filter((item) => item.uuid !== value);
    },
  },
  actions: {
    toggleBookmark({ commit, state, getters }, payload) {
      if (!getters.isBookmarked(payload.uuid)) commit(ADD_BOOKMARK, payload);
      else commit(DELETE_BOOKMARK, payload.uuid);
    },
  },
  getters: {
    totalBookmarks(state) {
      return state.list.length;
    },
    isBookmarked(state) {
      return (value) =>
        state.list.findIndex((item) => item.uuid === value) !== -1;
    },
    latestBookmarks(state) {
      return state.list.slice(-latestBookmarksSize);
    },
  },
};
