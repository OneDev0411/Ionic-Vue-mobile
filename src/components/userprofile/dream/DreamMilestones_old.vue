<template>
  <ion-list>
    <ion-item-sliding v-for="milestone in milestones" :key="milestone.id">
      <ion-item>
        <ion-label class="ion-text-wrap">
          <ion-text color="primary">
            <h2 class="bold">
              <b>{{ milestone.title }}</b>
            </h2>
          </ion-text>
          <p>{{ milestone.description }}</p>
        </ion-label>
        <ion-icon
          v-if="milestone.completed"
          :icon="checkmarkCircleSharp"
          size="large"
          color="success"
        ></ion-icon>
      </ion-item>
      <ion-item-options side="end" v-if="isSelf">
        <ion-item-option @click="setStatus(milestone.id)">
          <ion-icon
            v-if="!milestone.completed"
            :icon="ellipseOutline"
            size="large"
          ></ion-icon>
          <ion-icon
            v-else
            :icon="checkmarkCircleOutline"
            size="large"
          ></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script>
import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonText
} from '@ionic/vue'
import {
  trashOutline,
  personCircleOutline,
  checkmarkCircleSharp,
  checkmarkCircleOutline,
  ellipseOutline
} from 'ionicons/icons'
import { useDreams } from '../../../stores/dreams'
import { useUser } from '../../../stores/user'

export default {
  props: ['id', 'isSelf'],
  components: {
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,

    IonText
  },
  setup () {
    const dreamStore = useDreams()
    const userStore = useUser()
    return {
      trashOutline,
      personCircleOutline,
      checkmarkCircleSharp,
      checkmarkCircleOutline,
      ellipseOutline,
      dreamStore,
      userStore
    }
  },
  data () {
    return {
      milestones: []
    }
  },
  methods: {
    async setStatus (id) {
      await this.dreamStore.setMilestoneStatus({
        id: this.id,
        milestoneId: id
      })
    },
    getMilestones () {
      const dream = this.dreamStore.getDreamById(this.id)
      if (dream) {
        return dream.milestones
      } else {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.milestones = this.getMilestones()
    })
  }
}
</script>

<style scoped></style>
