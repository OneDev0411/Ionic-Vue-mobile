<template>
  <ion-row v-for="milestone in milestones" :key="milestone.id">
    <ion-col>
      <ion-grid class="local-backgroud">
        <ion-row>
          <ion-col size="10">
            <h5>
              <b>{{ milestone.title.substring(0, 35) }}</b>
            </h5>
          </ion-col>
          <ion-col>
            <ion-button
              size="small"
              class="ion-float-right milestone-extras-button"
              fill="flat"
            >
              <ion-icon :icon="ellipsisVertical"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <truncated-text
              :text="milestone.description"
              :limit="50"
            ></truncated-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="avatar-container">
              <div class="circle-avatar step-right0">
                <ion-icon
                  :icon="personCircleOutline"
                  class="red supporter"
                ></ion-icon>
              </div>
              <div class="circle-avatar step-right1">
                <ion-icon
                  :icon="personCircleOutline"
                  class="green supporter"
                ></ion-icon>
              </div>
              <div class="circle-avatar step-right2">
                <ion-icon
                  :icon="personCircleOutline"
                  class="blue supporter"
                ></ion-icon>
              </div>
              <div class="circle-avatar step-right3">
                <ion-icon
                  :icon="personCircleOutline"
                  class="yellow supporter"
                ></ion-icon>
              </div>
              <div class="circle-avatar step-right4">
                <ion-icon
                  :icon="personCircleOutline"
                  class="purple supporter"
                ></ion-icon>
              </div>
            </div>
          </ion-col>
          <ion-col style="margin: auto;">
            <ion-text color="secondary" class="supporter-text">1</ion-text>
            <ion-text class="supporter-text">Suporters</ion-text>
          </ion-col>
        </ion-row>
        <!-- <ion-row><ion-col></ion-col><ion-col> 0 Products & Ser...</ion-col></ion-row> -->

        <ion-row>
          <ion-col>
            <ion-progress-bar
              color="secondary"
              :value="progress(milestone)"
            ></ion-progress-bar>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <ion-label>
              {{ (progress(milestone) * 100).toFixed() }}% completed
            </ion-label>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <h5>
              <b>${{ milestone.amount_funded }}</b>
              Milestone Funded
            </h5>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <h5>from date to date</h5>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-col>
  </ion-row>
</template>

<script>
import { IonProgressBar, IonLabel, IonText } from '@ionic/vue'
import {
  trashOutline,
  personCircleOutline,
  checkmarkCircleSharp,
  checkmarkCircleOutline,
  ellipseOutline,
  ellipsisVertical
} from 'ionicons/icons'
import { useDreams } from '../../../stores/dreams'
import { useUser } from '../../../stores/user'

import TruncatedText from '../../../components/utils/TruncatedText.vue'

export default {
  props: ['id', 'isSelf'],
  components: { TruncatedText, IonProgressBar, IonLabel, IonText },
  setup () {
    const dreamStore = useDreams()
    const userStore = useUser()
    return {
      trashOutline,
      personCircleOutline,
      checkmarkCircleSharp,
      checkmarkCircleOutline,
      ellipseOutline,
      ellipsisVertical,
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
    },
    progress (milestone) {
      if (milestone.amount_required) {
        return milestone.amount_funded / milestone.amount_required
      } else {
        return 1
      }
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(() => {
      this.milestones = this.getMilestones()
    })
  }
}
</script>

<style scoped>
ion-grid {
  border: 0.5px solid #b6a8ed;
  border-radius: 20px;
}
ion-progress-bar {
  height: 7px;
}
.milestone-extras-button {
  height: 100%;
  --padding-end: 0;
}
.avatar-container {
  position: relative;
  width: auto;
  height: 50px;
}
ion-icon.supporter {
  font-size: 52px;
  margin: -5px;
}
.supporter-text {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
}
/* .local-backgroud {
  background: #F9F8FF
} */
.red {
  color: #ff0000;
}
.green {
  color: #00ff00;
}
.blue {
  color: #0000ff;
}
.yellow {
  color: #ffff00;
}
.purple {
  color: #800080;
}
.circle-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid #ffff;
  position: absolute;
  top: 5px;
  margin: auto;
}

.step-right0 {
  left: 0px;
  z-index: 1;
}
.step-right1 {
  left: 20px;
  z-index: 2;
}
.step-right2 {
  left: 40px;
  z-index: 3;
}
.step-right3 {
  left: 60px;
  z-index: 4;
}
.step-right4 {
  left: 80px;
  z-index: 5;
}
</style>
