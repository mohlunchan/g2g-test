import axios from "axios";
import { ref } from "vue";

const useBrands = () => {
  const isLoadingBrands = ref(false);
  const isFailedToGetBrands = ref(false);
  const brands = ref([]);

  const getBrands = async () => {
    try {
      isLoadingBrands.value = true;
      const response = await axios.get(
        "https://assets.g2g.com/offer/keyword.json"
      );
      //convert list of objects to array format so we can perform filterings easier
      brands.value = Object.entries(response.data).map(([key, value]) => {
        return {
          // we will use default name for our example here
          name: value.default_name,
          //we will use the object key as the uuid in this case
          uuid: key,
        };
      });
    } catch (error) {
      console.error(error);
      isFailedToGetBrands.value = true;
    } finally {
      isLoadingBrands.value = false;
    }
  };

  return {
    brands,
    getBrands,
  };
};

export default useBrands;
