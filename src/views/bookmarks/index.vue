<template>
  <q-page padding>
    <div class="row col-gutter-md items-center justify-between">
      <h5>Bookmarks</h5>
    </div>

    <template v-if="bookmarks.length <= 0">No records found</template>
    <template v-else>
      <div class="row q-col-gutter-md q-mb-lg">
        <div
          v-for="bookmark in bookmarks"
          :key="bookmark.uuid"
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12"
        >
          <q-card>
            <q-card-section>
              <div class="row items-center justify-between">
                <span>{{ bookmark.name }}</span>
                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  @click="onClickDeleteBookmark(bookmark.uuid)"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script>
import useBookmarks from "@/composables/useBookmarks";
export default {
  setup() {
    //composables
    const { list: bookmarks, deleteBookmark } = useBookmarks();

    //methods
    const onClickDeleteBookmark = (value) => deleteBookmark(value);

    return {
      bookmarks,
      onClickDeleteBookmark,
    };
  },
};
</script>

<style></style>
