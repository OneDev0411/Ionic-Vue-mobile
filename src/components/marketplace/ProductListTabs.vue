<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="item in selectable" :key="item" :class="isSelected(item)">
        <ion-button
          class="ion-no-padding"
          size="small"
          fill="clear"
          lines="none"
          @click="setSelected(item)"
          >{{ item }}</ion-button
        >
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import { useDreams } from "../../stores/dreams";

export default defineComponent({
  emits: ["tabSelected"],
  props: {
    selectable: {
      type: Array[String],
      default: ["Explore"],
    },
  },
  components: { IonCol },
  setup() {
    const dreamStore = useDreams();
    return {
      dreamStore,
    };
  },
  data() {
    return {
      selectedTab: "Best Match",
    };
  },
  methods: {
    async setSelected(name) {
      this.selectedTab = name;
      this.$emit("tabSelected", this.selectedTab);
    },
    isSelected(name) {
      if (this.selectedTab == name) {
        return "selected";
      }
      return "";
    },
  },
  computed: {
    size() {
      return parseInt(12 / this.selectable.length);
    },
  },
});
</script>

<style scoped>
ion-grid {
  padding: 0 20px;
  display: flex;
  justify-content: center;
}
ion-button {
  text-transform: capitalize;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  height: 21px;
  color: #b8b8b8;
}

ion-row {
  margin: 0 !important;
  height: 37px;
  display: grid;
  grid-template-columns: 0fr 0fr 0fr 0fr;
  gap: 17px;
  border-bottom: 1px solid #e9ecf0;
  padding-bottom: 2px;
}

ion-col {
  display: flex;
  justify-content: center;
  box-shadow: 0;
  height: 35px;
  padding: 0;
  background-color: var(--ion-color-background);
  display: flex;
}

ion-grid {
  /* border-bottom: 1px solid #e9ecf0; */
}
ion-col.selected {
  /* background-color: var(--ion-color-primary); */
  padding-bottom: 10px;
  box-shadow: 0 3px var(--ion-color-primary);
}
ion-col.selected ion-button {
  font-weight: 700;
  color: var(--ion-color-primary);
}

@media only screen and (max-width: 350px) {
  .no-width {
    width: 0;
  }
}
</style>
