<template>
  <ion-grid>
    <ion-row>
      <ion-col
        :size="4"
        v-for="item in selectable"
        :key="item"
        :class="isSelected(item)"
        class="no-width"
      >
        <ion-button
          shape="round"
          size="small"
          fill="clear"
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
      default: ['My Dreams']
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
      selectedTab: 'My Dreams'
    }
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
ion-grid {
  padding-left: 20px;
  padding-right: 20px;
}
ion-button {
  margin-top: 2px;
  text-transform: capitalize;
  color: #787c80;
}
ion-col {
  display: flex;
  justify-content: center;
  /* border-radius: 30px; */
  box-shadow: 0;
  height: 30px;
  padding: 0;
}
ion-col.selected {
  /* background-color: var(--ion-color-primary); */
  /* box-shadow: 0 3px var(--ion-color-primary); */
  border-bottom: 3px solid var(--ion-color-primary);
}
ion-col.selected ion-button {
  color: var(--ion-color-primary);
}
ion-row {
  margin-top: 10px;
  height: 30px;
  background-color: var(--ion-color-background);
  border-bottom: 1px solid #e9ecf0;
  /* background-color: var(--ion-color-primary-contrast); */
  border-radius: 30px;
}
@media only screen and (max-width: 350px) {
  .no-width {
    width: 0;
  }
}
</style>
