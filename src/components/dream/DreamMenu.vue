<template>
  <ion-content>
    <ion-modal
      :is-open="open"
      :initial-breakpoint="0.4"
      class="auto-height"
      @click.self="$emit('closeModal')"
    >
      <ion-content class="menu-container">
        <ion-grid>
          <ion-row class="ion-justify-content-between">
            <ion-col :size="3.5">
              <ion-button fill="clear" class="action-btn" @click="setBookmark">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-icon
                        class="action-btn-icon"
                        :icon="bookmarkOutline"
                      />
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-text class="action-btn-text">
                        {{ isDreamBookmarked ? 'Unsave Dream' : 'Save Dream' }}
                      </ion-text>
                    </ion-col>
                  </ion-row>

                </ion-grid>
              </ion-button>
            </ion-col>
            <ion-col :size="3.5">
              <ion-button fill="clear" class="action-btn" @click="copyDreamURL">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-icon
                        class="action-btn-icon  action-btn-icon-rotated"
                        :icon="linkOutline"
                      ></ion-icon>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>

                      <ion-text class="action-btn-text">
                        Copy Link
                      </ion-text>
                    </ion-col>
                  </ion-row>

                </ion-grid>
              </ion-button>
            </ion-col>

            <ion-col v-if="!isSelf" :size="3.5" >
              <ion-button fill="clear" class="action-btn" @click="hideDream">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-icon
                        class="action-btn-icon"
                        :icon="eyeOffOutline"
                      />
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-text class="action-btn-text">
                        Hide Dream
                      </ion-text>
                    </ion-col>
                  </ion-row>

                </ion-grid>
              </ion-button>
            </ion-col>
            <ion-col v-else :size="3.5" >
              <ion-button fill="clear" class="action-btn" @click="showDeleteDreamConfirmation">
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      <ion-icon
                        class="action-btn-icon action-btn-icon-ban"
                        :icon="trashOutline"
                      />
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col>
                      <ion-text class="action-btn-text action-btn-text-ban">
                        Delete dream
                      </ion-text>
                    </ion-col>
                  </ion-row>

                </ion-grid>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list v-if="!isSelf" lines="none">
                <ion-item @click="reportDream">
                  <ion-icon
                    class="item-icon"
                    :icon="alertCircleOutline"
                  />
                  <ion-label>
                    Report Dream
                  </ion-label>
                </ion-item>
              </ion-list>

              <ion-list v-else lines="none">
                <ion-item @click="editDream">
                  <img src="../../assets/icons/edit.svg" class="item-icon" alt="">
                  <ion-label>
                    Edit Dream
                  </ion-label>
                </ion-item>
                <ion-item @click="editSupporters">
                  <img src="../../assets/icons/edit_supporters.svg" class="item-icon" alt="">
                  <ion-label>
                    Edit Supporters
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
        </ion-grid>

      </ion-content>
    </ion-modal>
    <confirmation-modal-with-text-btn
      :open="showDeleteDreamConfirmationModal"
      text-head="Are you sure?"
      text-main="Removing this dream cannot be undone!"
      okay-text="Delete"
      cancel-text="Cancel"
      :danger-action="true"
      @onOkay="deleteDream"
      @onClose="toggleDeleteDreamConfirmation"
    />
    <notice-modal
      :open="showDreamSavedNotice"
      :type="`success`"
      :text="dreamSavedText"
      @closeModal="toggleDreamSavedNotice"
    />
    <notice-modal
      :open="showDreamURLCopiedModal"
      :type="`success`"
      :text="`This dream has been copy`"
      @closeModal="toggleDreamURLCopiedNotice"
    />
    <notice-modal
      :open="showDreamSharedNotice"
      :type="`success`"
      :text="`This dream has been hidden`"
      @closeModal="toggleDreamSharedNotice"
    />
  </ion-content>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonList,
  IonModal,
  IonText,
  IonLabel,
} from '@ionic/vue'
import {
  alertCircleOutline,
  bookmarkOutline,
  linkOutline,
  trashOutline,
  eyeOffOutline,
} from 'ionicons/icons'
import { Clipboard } from '@capacitor/clipboard';
import { useDreams } from '../../stores/dreams'
import ConfirmationModalWithTextBtn from "../base/ConfirmationModalWithTextBtn";
import NoticeModal from "../base/NoticeModal";

export default {
  name: 'DreamMenu',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    dream: {
      type: Object,
      default: () => {}
    },
    isSelf: {
      type: Boolean,
      required: true
    }
  },
  emits: ['closeModal', 'shareDream', 'editDream', 'editSupporters'],
  setup () {
    const dreamStore = useDreams()
    return {
      dreamStore,
      alertCircleOutline,
      bookmarkOutline,
      linkOutline,
      trashOutline,
      eyeOffOutline,
    }
  },

  components: {
    NoticeModal,
    ConfirmationModalWithTextBtn,
    IonButton,
    IonGrid,
    IonContent,
    IonCol,
    IonLabel,
    IonList,
    IonItem,
    IonText,
    IonModal
  },
  data () {
    return {
      dreamSavedText: '',
      showDeleteDreamConfirmationModal: false,
      showDreamSavedNotice: false,
      showDreamSharedNotice: false,
      showDreamURLCopiedModal: false,
    }
  },
  computed: {
    isDreamBookmarked () {
      return this.dream.bookmark
    }
  },
  methods: {
    async copyDreamURL () {
      const route = this.$router.resolve({ name: 'dreamDetail', params: { id: this.dream.id } })
      const absoluteURL = new URL(route.href, window.location.origin).href
      this.showDreamURLCopiedModal = true;

      this.$emit('closeModal')
      await Clipboard.write({
        string: absoluteURL
      });
    },
    deleteDream () {
      this.dreamStore.deleteDream({ id: this.dream.id })
      this.toggleDeleteDreamConfirmation()
    },
    editDream () {
      this.$emit('closeModal')
      this.$emit('editDream')
    },
    editSupporters () {
      this.$emit('closeModal')
      this.$emit('editSupporters')
    },
    hideDream () {
      this.dreamStore.hideDream({ id: this.dream.id })
      this.$emit('closeModal')
      this.showDreamSharedNotice = true
    },
    gotoShareDreamModal () {
      this.$emit('closeModal')
      this.$emit('shareDream')
    },
    reportDream () {
      this.$emit('reportDream')
      this.$emit('closeModal')
    },
    async setBookmark () {
      await this.dreamStore.setBookmark({
        id: this.dream.id
      })
      this.dreamSavedText = this.dream.bookmark ? 'Dream saved successfully' : 'Dream unsaved'
      this.$emit('closeModal')
      this.toggleDreamSavedNotice()
    },
    showDeleteDreamConfirmation () {
      this.$emit('closeModal')
      this.toggleDeleteDreamConfirmation()
    },
    toggleDeleteDreamConfirmation () {
      this.showDeleteDreamConfirmationModal=!this.showDeleteDreamConfirmationModal
    },
    toggleDreamSavedNotice () {
      this.showDreamSavedNotice = !this.showDreamSavedNotice
    },
    toggleDreamSharedNotice () {
      this.showDreamSharedNotice=!this.showDreamSharedNotice
    },
    toggleDreamURLCopiedNotice () {
      this.showDreamURLCopiedModal=!this.showDreamURLCopiedModal
    }
  }
}
</script>

<style scoped>
ion-grid,ion-row,ion-col {
  padding: 0;
}
ion-content.menu-container {
  --padding-top: 45px;
  --padding-bottom: 40px;
  --padding-start: 20px;
  --padding-end: 20px;

  border-radius: 16px 16px 0 0;
}
ion-button.action-btn {
  flex-flow: column;
  height: 72px;
  background-color: #FFFFFF;
  --padding-start: 13px;
  --padding-end: 13px;
  border-radius: 8px;
  width: 100%;
}
ion-icon.action-btn-icon {
  font-size: 16px;
  color: #212325;
  margin-bottom: 10px;
}
ion-icon.action-btn-icon-rotated {
  transform: rotate(135deg);
}
ion-text.action-btn-text {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #212325;

}
ion-icon.action-btn-icon-ban {
  color: #FF6363;
}
ion-text.action-btn-text-ban {
  color: #FF6363;
}
ion-list {
  margin-top: 20px;
}
ion-icon.item-icon {
  margin-right: 12px;
}
img.item-icon {
  margin-right: 12px;
}
ion-item {
  --backgound: #FFFFFF;
  border-bottom: 1px solid #E9ECF0;
}
ion-button {
  text-transform: none;
}
</style>
