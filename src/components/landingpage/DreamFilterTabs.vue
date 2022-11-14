<template>
  <ion-grid>
    <ion-row>
      <ion-col
        :size="3"
        v-for="item in selectable"
        :key="item"
        :class="isSelected(item)"
        class="no-width"
      >
        <ion-button
          shape="round"
          size="small"
          fill="clear"
          class="tab-btn"
          @click="setSelected(item)"
        >
          {{ item }}
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonCol } from '@ionic/vue'
import { defineComponent } from 'vue'
import { useDreams } from '../../stores/dreams'

export default defineComponent({
  emits: ['tabSelected'],
  props: {
    selectable: {
      type: Array[String],
      default: ['Explore']
    }
  },
  components: { IonCol },
  setup () {
    const dreamStore = useDreams()
    return {
      dreamStore
    }
  },
  data () {
    return {
      selectedTab: 'Explore'
    }
  },
  beforeMount () {
    this.setSelected('All')
  },
  methods: {
    async setSelected (name) {
      this.selectedTab = name
      this.$emit('tabSelected', this.selectedTab)
    },
    isSelected (name) {
      if (this.selectedTab === name) {
        return 'selected'
      }
      return ''
    }
  },
  computed: {
    size () {
      return parseInt(12 / this.selectable.length)
    }
  }
})
</script>

<style scoped>
ion-button {
  margin-top: 2px;
}
ion-col {
  display: flex;
  justify-content: center;
  box-shadow: none;
  height: 50px;
  padding: 0;

}
ion-col.selected {
  color: #866EE1;
  border-bottom: 3px solid #866EE1;
}
ion-button.tab-btn {
  text-transform: capitalize;
  color: #787C80;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  /*--padding-top: 16px;*/
  --padding-bottom: 16px;
  /*height: 50px;*/
}
ion-col.selected ion-button {
  color: var(--ion-color-primary);
  border-bottom: 3px solid #866EE1;
}

ion-row {
  margin-top: 10px;
  height: 30px;
  background-color: var(--ion-color-background);

  /* background-color: var(--ion-color-primary-contrast); */
  border-radius: 30px;
}
@media only screen and (max-width: 350px) {
  .no-width {
    width: 0;
  }
}
</style>
