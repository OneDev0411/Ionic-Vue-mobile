<template>
  <ion-modal
    :is-open="open"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
    <div class="inner-content">
        <ion-grid>
          <ion-row>
            <ion-col>
              <div class="text-head">
                Support Dream
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="main-text-col">
              <div class="text-main">
                Choose how you wish to support {{ dream.user.display_name }} Dream
              </div>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ion-button class="base-btn" @click="fundMilestone">
                Fund Milestone
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button class="base-btns-outline" @click="supportByProduct">
                Support by Product or Service
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button class="base-btns-outline"  @click="moralSupport">
                Moral Support
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button class="base-btns-outline" @click="communicate">
                Communicate
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
    </div>
  </ion-modal>
</template>

<script>
import { IonCol, IonGrid, IonModal } from '@ionic/vue'

export default {
  name: 'DreamSupportModal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    dream: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['closeModal', 'likeDream'],
  components: {
    IonGrid,
    IonCol,
    IonModal
  },
  methods: {
    communicate () {
      this.$router.push(`/chat/${this.dream.user.id}`)
      this.$emit('closeModal')
    },
    fundMilestone () {
      this.$router.push(`/fund/${this.dream.id}`)
      this.$emit('closeModal')
    },
    moralSupport () {
      this.$emit('likeDream')
      this.$emit('closeModal')
    },
    supportByProduct () {
      console.log('Thank youu!!')
    }
  }
}
</script>

<style scoped>
ion-row, ion-col{
  padding: 0;
}
ion-modal {
  --height: auto;
  --width: 90%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background: #1A181E66;

}
ion-modal::part(backdrop) {
  background: #1A181E66;
}
.inner-content {
  padding: 20px;
}
ion-col.main-text-col {
  /*padding-bottom: 46px;*/
  padding: 0 16px 46px;
}
ion-text {
  font-size: 18px;
  line-height: 21px;
}
.text-head {
  text-align: center;
  font-size: 18px;
  line-height: 21px;
  font-weight: 700;
  color: #212325;
  padding-bottom: 16px;
}
.text-main {
  --padding-bottom: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 130%;
  font-weight: 400;
  color: #787C80;
}
ion-modal.auto-height {
  --height: auto;
}
ion-modal.auto-height .ion-page {
  position: relative;
  display: block;
  contain: content;
}
ion-modal.auto-height .ion-page .inner-content {
  max-height: 80vh;
  overflow: auto;
  --border-radius: 16px;
}
ion-button.base-btns-outline {
  --border-radius: 16px;
  --color: #31265A;
  --background-focused: none;
  --background-hover: none;
  --border-color: #31265A;
  border-radius: 16px;
  height: 50px;
  --background: #FFFFFF;
  box-shadow: none;
  border: 1px solid #31265A;
  width: 100%;
  margin-top: 20px;
  text-transform: none;
  font-size: 16px;
  line-height: 28px;
  font-weight: 700;
}
</style>
