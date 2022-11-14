<template>
  <ion-modal
    :is-open="open"
    class="auto-height"
    @click.self="$emit('closeModal')"
  >
      <ion-content class="inner-content">
        <div class="inner-div">

        <ion-grid>
        <ion-row>
          <ion-col>
            <div class="main-img-container">
              <ion-img
                :src="dreamPhoto.dataUrl"
                class="main-img"
              />
              <photo-component @image-loaded="loadImage">
                <ion-button class="base-btn-outline change-dream-img-btn ">
                  <ion-icon
                    :icon="cameraOutline"
                    class="camera-icon"
                  />
                  <ion-text>Change</ion-text>
                </ion-button>
              </photo-component>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-label v-if="titleError" class="input-label input-label-invalid"  position="stacked">
              {{ titleError }}
            </ion-label>
            <ion-label v-else class="input-label" position="stacked">
              Enter your dream
            </ion-label>
            <ion-item>
              <ion-input v-model="title" placeholder="Dream name"></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row class="textarea-row">
          <ion-col class="dream-item">
            <ion-label v-if="descriptionError" position="stacked" class="input-label input-label-invalid">
              {{ descriptionError }}
            </ion-label>
            <ion-label v-else position="stacked" class="input-label">Description:</ion-label>
            <ion-item style="height: 130px;">
              <ion-textarea
                v-model="description"
                rows="6"
                placeholder="Write Description, be clear..."
              />
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button
              class="base-btn"
              @click="saveDream"
            >
              Save
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
        </div>

      </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonCol,
  IonGrid,
  IonModal,
  IonRow,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonTextarea,
  IonText,
  IonButton,
  IonItem
} from '@ionic/vue'
import {
  cameraOutline
} from "ionicons/icons";
import PhotoComponent from "../utils/PhotoComponent";
import {useDreams} from "../../stores/dreams";

export default {
  name: "EditDreamModal",
  props: {
    open: {
      type: Boolean,
      default: false
    },
    dream: {
      type: Object,
      required: true
    }
  },
  emits: ['closeModal'],
  components: {
    PhotoComponent,
    IonCol,
    IonGrid,
    IonModal,
    IonRow,
    IonIcon,
    IonImg,
    IonInput,
    IonLabel,
    IonTextarea,
    IonText,
    IonButton,
    IonItem
  },
  setup () {
    const dreamStore = useDreams()

    return {
      cameraOutline,
      dreamStore
    }
  },
  mounted () {
    this.$nextTick(async () => {
      this.title = this.dream.title
      this.description = this.dream.description
      this.dreamPhoto.dataUrl = this.dream.image
    })
  },
  data () {
    return {
      description: '',
      descriptionError: '',
      dreamPhoto: { dataUrl: '', blob: null, raw: '' },
      title: '',
      titleError: '',
    }
  },
  methods: {
    loadImage (image) {
      this.dreamPhoto = image
      this.dreamStore.setImageUrl(this.dreamPhoto)
    },
    saveDream () {
      const newDream = {
        ...this.dream,
        title: this.title,
        description: this.description,
        image: this.dreamPhoto.raw ? this.dreamPhoto.raw : this.dreamPhoto.url,
      }
      this.dreamStore.editDream({ id: this.dream.id, dream: newDream})
      this.$emit('closeModal')

    }
  }

}
</script>

<style scoped>
ion-grid,ion-row, ion-col{
  padding: 0;
}
ion-modal {
  --height: fit-content;
  --width: 90%;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  background: #1A181E66;

}
ion-modal::part(backdrop) {
  background: #1A181E66;
}
.inner-content {
  background: #F9F8FF;
  max-height: 90vh;
  --height: 580px;
  height: 580px;
}
.inner-div {
  padding: 20px;
}
ion-img.main-img::part(image) {
  width: 100%;
  max-width: 500px;
  --border-radius: 16px;
  border-radius: 16px;
  height: 204px;
  object-fit: fill;
}
.main-img-container {
  position: relative;
  margin-bottom: 20px;
}
ion-icon.camera-icon {
  margin-right: 5px;
}
.change-dream-img-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #212325;
  box-shadow: none;
  border-radius: 8px;
  text-transform: capitalize;
}
.textarea-row {
  padding: 20px 0;
}
ion-label.input-label {
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #787C80;
  margin-bottom: 8px;
}
ion-item {
  background: #FFFFFF;
  color: #212325;
  border-radius: 8px;
  border: 1px solid #83DCDF;
}
ion-input, ion-textarea {
  --color: #212325;
}
.invalid {
  --color: var(--ion-color-danger);
  overflow-y: scroll;
}
</style>
