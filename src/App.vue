<template>
  <q-layout>
    <q-header class="text-white" elevated>
      <q-toolbar>
        <q-btn flat icon="house" label="Home" to="/" />

        <q-btn-dropdown
          class="q-ml-auto"
          ref="bookmarksDropdown"
          :label="`Bookmarks (${totalBookmarks})`"
          :persistent="false"
        >
          <q-list>
            <template v-if="totalBookmarks <= 0">
              <q-item>
                <q-item-section> No records found </q-item-section>
              </q-item>
            </template>
            <template v-else>
              <q-item
                v-for="bookmark in latestBookmarksInDescOrder"
                :key="bookmark.uuid"
              >
                <q-item-section>
                  {{ bookmark.name }}
                </q-item-section>
                <q-item-secion avatar>
                  <q-btn
                    class="q-ml-md"
                    flat
                    rounded
                    dense
                    icon="delete"
                    @click="onClickDeleteBookmark(bookmark.uuid)"
                  ></q-btn>
                </q-item-secion>
              </q-item>

              <template
                v-if="totalBookmarks > latestBookmarksInDescOrder.length"
              >
                <hr />
                <q-item class="justify-center">
                  <q-btn to="/bookmarks">View all</q-btn>
                </q-item>
              </template>
            </template>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container style="overflow-x: hidden">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import useBookmarks from "./composables/useBookmarks";

export default {
  setup() {
    //composables
    const { totalBookmarks, latestBookmarks, deleteBookmark } = useBookmarks();
    const bookmarksDropdown = ref(null);

    //computed properties
    const latestBookmarksInDescOrder = computed(() =>
      latestBookmarks.value.reverse()
    );

    //methods
    const onClickDeleteBookmark = (value) => {
      deleteBookmark(value);

      //temporary use this way to resize the dropdown e.g. position of dropdown will be very weird after deleting a bookmark with long name
      bookmarksDropdown.value.hide();
      bookmarksDropdown.value.show();
    };

    return {
      bookmarksDropdown,
      latestBookmarksInDescOrder,
      totalBookmarks,
      onClickDeleteBookmark,
    };
  },
};
</script>
