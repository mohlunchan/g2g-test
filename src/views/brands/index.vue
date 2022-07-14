<template>
  <q-page padding>
    <div class="row col-gutter-md items-center justify-between">
      <h5>Brands</h5>

      <q-form class="row q-col-gutter-md">
        <q-input
          outlined
          v-model="keyword"
          label="Search by keyword"
          debounce="500"
        />
        <q-select
          outlined
          v-model="selectedSort"
          :options="sortOptions"
          label="Sort By"
          emit-value
          map-options
        />
      </q-form>
    </div>

    <template v-if="isLoading">
      <div class="row q-col-gutter-md q-mb-lg">
        <div
          v-for="index in defaultDisplaySize"
          :key="`skeleton-${index}`"
          class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12"
        >
          <q-card>
            <q-card-section>
              <div class="row items-center justify-between">
                <q-skeleton class="col-grow q-mr-md" height="21" type="text" />
                <q-skeleton width="24" height="24" type="QAvatar" />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="filteredAndSortedBrands.length <= 0">
        No records found</template
      >
      <template v-else>
        <div class="row q-col-gutter-md q-mb-lg">
          <div
            v-for="brand in filteredAndSortedBrands.slice(0, displaySize)"
            :key="brand.uuid"
            class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12"
          >
            <q-card class="fit">
              <q-card-section>
                <div class="row items-center justify-between no-wrap">
                  <span class="q-mr-md">{{ brand.name }}</span>
                  <q-btn
                    flat
                    dense
                    round
                    :color="isBookmarked(brand.uuid) && 'positive'"
                    :icon="`star${!isBookmarked(brand.uuid) && '_border'}`"
                    @click.prevent="onClickBookmark(brand)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="text-center">
          <q-btn
            v-if="!isDisplayedAllAvailableBrands"
            @click="onClickViewMoreBrands"
            >View More</q-btn
          >
          <div v-else>End of result</div>
        </div>
      </template>
    </template>
  </q-page>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import useBrands from "@/composables/useBrands";
import { useRoute, useRouter } from "vue-router";
import useBookmarks from "@/composables/useBookmarks";
//enums
const SORT = {
  NAME_ASCENDING: "name_ascending",
  NAME_DESCENDING: "name_descending",
};

//constants
const defaultDisplaySize = 20;
const displaySizeIncrement = 20;
const sortOptions = [
  {
    label: "Name Ascending",
    value: SORT.NAME_ASCENDING,
  },
  {
    label: "Name Descending",
    value: SORT.NAME_DESCENDING,
  },
];

export default {
  setup() {
    //composables
    const { getBrands, brands } = useBrands();
    const { toggleBookmark, isBookmarked } = useBookmarks();
    const route = useRoute();
    const router = useRouter();

    //reactive properties
    const displaySize = ref(
      Number(route.query.display_size) || defaultDisplaySize
    );
    const selectedSort = ref(route.query.sort || SORT.NAME_ASCENDING);
    const keyword = ref(route.query.keyword || null);
    const isLoading = ref(false);

    //computed properties
    const filteredAndSortedBrands = computed(() => {
      const sortCallback = (a, b) => {
        switch (selectedSort.value) {
          case SORT.NAME_ASCENDING:
            return a.name.localeCompare(b.name);
          case SORT.NAME_DESCENDING:
            return b.name.localeCompare(a.name);
          default:
            return a.name.localeCompare(b.name);
        }
      };

      return [...brands.value]
        .filter((item) => {
          if (!keyword.value) return true;

          //regex technique followed in order start of string, positive lookbehind
          const trimmedKeyword = keyword.value.trim();
          return new RegExp(
            `(^\\${trimmedKeyword})|((?<=\s)\\${trimmedKeyword})`,
            "gi"
          ).test(item.name);
        })
        .sort(sortCallback);
    });
    const isDisplayedAllAvailableBrands = computed(
      () => displaySize.value >= filteredAndSortedBrands.value.length
    );

    //watches
    watch(selectedSort, (value) => {
      router.replace({
        query: {
          ...route.query,
          sort: value,
        },
      });
    });
    watch(keyword, (value) => {
      router.replace({
        query: {
          ...route.query,
          keyword: value,
        },
      });
    });

    //methods
    const onClickViewMoreBrands = () => {
      displaySize.value += displaySizeIncrement;
      router.replace({
        query: {
          ...route.query,
          display_size: displaySize.value,
        },
      });
    };
    const onClickBookmark = (payload) => {
      toggleBookmark(payload);
    };

    //lifecycle hooks
    onMounted(async () => {
      try {
        isLoading.value = true;
        await getBrands();
      } finally {
        isLoading.value = false;
      }
    });

    return {
      defaultDisplaySize,
      brands,
      displaySize,
      isDisplayedAllAvailableBrands,
      isBookmarked,
      selectedSort,
      sortOptions,
      keyword,
      filteredAndSortedBrands,
      isLoading,
      onClickViewMoreBrands,
      onClickBookmark,
    };
  },
};
</script>

<style></style>
