<template>
  <ion-content>
    <ion-modal
      :is-open="open"
      class="auto-height"
      @click.self="$emit('closeModal')"
    >
      <div class="inner-content">
        <ion-grid>
          <ion-row>
            <ion-col>
              <div class="share-header ion-text-center">
                Share this link via
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-between ion-align-items-center social-row">
            <ion-col size="3.5">
              <ion-button fill="clear" class="action-btn">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <img width="32" height="32" src="../../assets/images/facebook.png" alt="" />
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>

                      <ion-text class="action-btn-text">
                        Facebook
                      </ion-text>
                    </ion-col>
                  </ion-row>

                </ion-grid>
              </ion-button>
            </ion-col>
            <ion-col size="3.5">
              <ion-button fill="clear" class="action-btn">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <img width="32" height="32" src="../../assets/images/instagram.png" alt="" />
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>

                      <ion-text class="action-btn-text">
                        Instagram
                      </ion-text>
                    </ion-col>
                  </ion-row>

                </ion-grid>
              </ion-button>
            </ion-col>
            <ion-col size="3.5">
              <ion-button fill="clear" class="action-btn">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <img width="32" height="32" src="../../assets/images/twitter.png" alt="" />
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>

                      <ion-text class="action-btn-text">
                        Twitter
                      </ion-text>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button fill="none" class="link-btn">
                <ion-icon :icon="linkOutline" />
              </ion-button>
              <ion-input
                :value="dreamURL"
                disabled
                class="share-input"
              />
              <ion-button class="copy-btn" @click="copyDreamURL">
                <ion-icon :icon="copyOutline" />
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-modal>

    <notice-modal
      :open="showDreamURLCopiedModal"
      :type="`success`"
      :text="`This dream has been copied`"
      @closeModal="showDreamURLCopiedModal = !showDreamURLCopiedModal"
    />
  </ion-content>
</template>

<script>
import {
  IonCol,
  IonGrid,
  IonModal,
  IonText,
  IonInput,
  IonContent
} from '@ionic/vue'
import {
  copyOutline,
  linkOutline
} from 'ionicons/icons'
import { Clipboard } from '@capacitor/clipboard';
import NoticeModal from "../base/NoticeModal";

export default {
  name: 'DreamShareModal',
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
  emits: ['closeModal'],
  components: {
    IonGrid,
    IonCol,
    IonText,
    IonModal,
    IonInput,
    IonContent,
    NoticeModal
  },
  setup () {
    return {
      copyOutline,
      linkOutline
    }
  },
  data () {
    return {
      showDreamURLCopiedModal: false
    }
  },
  computed: {
    dreamURL () {
      const route = this.$router.resolve({ name: 'dreamDetail', params: { id: this.dream.id } })
      const absoluteURL = new URL(route.href, window.location.origin).href
      return absoluteURL
    }
  },
  methods: {
    async copyDreamURL () {
      this.$emit('closeModal')
      await Clipboard.write({
        string: this.dreamURL
      });

      this.showDreamURLCopiedModal = true;
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
.share-header {
  text-align: center;
  font-size: 18px;
  line-height: 25px;
  color: #323538;
  font-weight: 700;
}
ion-button.action-btn {
  flex-flow: column;
  height: 72px;
}
ion-icon.action-btn-icon {
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
}
ion-text.action-btn-text {
  font-size: 14px;
  line-height: 140%;
  font-weight: 400;
  color: #787C80;

}
ion-button {
  text-transform: none;
 }
ion-input.share-input {
  width: 100%;
  border: 1px solid #D1D1D6;
  border-radius: 8px;
  --padding-start: 35px;
  --padding-end: 40px;
  position: relative;
}
ion-button.link-btn {
  position: absolute;
  top: 0;
  left: -7.5px;
  transform: rotate(135deg);
}
ion-button.copy-btn {
  position: absolute;
  top: -1.5px;
  right: 0;
  z-index: 10;
}
ion-row.social-row {
  padding: 20px 0 40px;
  --padding-top: 20px;
  --padding-bottom: 40px;
}
</style>
