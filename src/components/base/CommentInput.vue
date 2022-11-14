<template>
  <ion-grid>
    <ion-row class="ion-justify-content-start ion-align-items-start comment-row" >
      <UserIcon :user="{}" />
      <ion-col >
        <ion-textarea
          auto-grow
          placeholder="Type your message"
          spellcheck
          v-model="commentText"
        >
        </ion-textarea>
      </ion-col>
    </ion-row>
    <ion-row class="ion-justify-content-between ion-align-items-center">
      <ion-col size="auto">
        <ion-buttons>
          <ion-button fill="clear">
            <ion-icon
              :icon="attachOutline"
            />
          </ion-button>
          <ion-button fill="clear">
            <ion-icon
              :icon="cameraOutline"
            />
          </ion-button>
          <ion-button fill="clear">
            <img src="../../assets/icons/emoji-blue.svg" alt="">
          </ion-button>
        </ion-buttons>
      </ion-col>
      <ion-col size="auto">
        <ion-button fill="clear" @click="submitComment">
          <img src="../../assets/icons/send-primary.svg" alt="">
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import UserIcon from './UserIcon'
import {
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonTextarea
} from '@ionic/vue'
import {
  attachOutline,
  cameraOutline
} from 'ionicons/icons'
import { useDreams } from '../../stores/dreams'
export default {
  name: 'CommentInput',
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    dream: {
      type: Object,
      required: true
    }
  },
  components: {
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonTextarea,
    UserIcon
  },
  setup () {
    const dreamStore = useDreams()
    return {
      dreamStore,
      attachOutline,
      cameraOutline
    }
  },
  data () {
    return {
      commentText: ''
    }
  },
  methods: {
    async submitComment () {
      await this.dreamStore.addComment({
        dreamId: this.dream.id,
        comment: this.comment
      })
      this.commentText = ''
    }
  }
}
</script>

<style scoped>
ion-row, ion-col {
  padding: 0;
}
ion-textarea {
  margin: 0;
}
ion-grid {
  padding: 20px;
  background: #FFFFFF;
  border: 1px solid #E9ECF0;
}
ion-row {
  padding: 0 0 0 25px;
}
ion-row.comment-row {
  padding: 20px;
}
</style>
