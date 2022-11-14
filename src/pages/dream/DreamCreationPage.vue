<template>
  <base-layout page-title="Create Dream" prev-page="landing">
    <ion-grid class="dream-description">
      <ion-row v-if="dreamPhoto.dataUrl">
        <ion-col>
          <ion-thumbnail class="dream-photo">
            <img :src="dreamPhoto.dataUrl" style="z-index: 0;" />
            <ion-button fill="clear" class="image-change-button">
              <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
              Change
            </ion-button>
          </ion-thumbnail>
        </ion-col>
      </ion-row>
      <ion-row v-else>
        <ion-col class="center-align-col">
          <photo-component @image-loaded="loadImage">
            <ion-button fill="flat" class="image-upload-button">
              <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
              Upload Photo/Video/Link
            </ion-button>
          </photo-component>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="dream-item">
          <ion-label position="stacked">Enter your dream:</ion-label>
          <ion-item>
            <ion-label v-if="titleError" position="floating" class="invalid">
              {{ titleError }}
            </ion-label>
            <ion-input v-model="title" placeholder="Dream name"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="dream-item">
          <ion-label position="stacked">Description:</ion-label>
          <ion-item style="height: 130px;">
            <ion-label v-if="descriptionError" position="floating" class="invalid">
              {{ descriptionError }}
            </ion-label>
            <ion-textarea rows="6" cols="20" placeholder="Write Description, be clear..." style="padding: 0;" v-model="description"></ion-textarea>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
    <div v-if="!milestones.length" class="set-margin">
      <h6 position="stacked">Milestones</h6>
      <ion-item>
        <span class="ion-text-left">Add Milestones</span>
        <ion-button fill="clear" @click="addMilestone">
          <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
        </ion-button>
      </ion-item>
    </div>
    <div v-else class="add-milestone">
      <h6 class="ion-text-left">Milestones</h6>
      <ion-button fill="clear" @click="addMilestone">
        <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
      </ion-button>
    </div>
    <ion-grid v-if="milestones.length">
      <div v-if="!progressflag">
        <div v-for="milestone in milestones" :key="milestone.id" class="each-milestone">
          <ion-row class="each-milestone-item">
            <ion-col>
              <ion-label position="stacked">Name:</ion-label>
              <ion-item>
                <ion-input v-model="milestone.title" placeholder="Milestone Name"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row class="each-milestone-item">
            <ion-col>
              <ion-label position="stacked">Description:</ion-label>
              <ion-item style="height: 130px;">
                <ion-textarea rows="6" cols="20" placeholder="Write Description..." v-model="milestone.description"></ion-textarea>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row class="each-milestone-item">
            <ion-col>
              <ion-label position="stacked">Goal Amount:</ion-label>
              <ion-item>
                <ion-input v-model="milestone.amount_required" placeholder="$ 0.00"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row class="each-milestone-item">
            <ion-col>
              <ion-label position="stacked">Start Date:</ion-label>
              <ion-item button="true" @click="setStarterOpen">
                <ion-label>{{ dreamStartDate }}</ion-label>
                <ion-text></ion-text>
                <ion-icon :icon="calendarOutline"></ion-icon>
                <ion-modal :is-open="isStartDateOpen" class="datetime-modal" :initial-breakpoint="0.3" handle-behavior="cycle">
                  <ion-button fill="clear" class="confirm-button" @click="confirmStartDate">Confirm</ion-button>
                  <ion-datetime
                    :value="dreamStart"
                    v-model="dreamStart"
                    ref="customStartDate"
                    presentation="date"
                    prefer-wheel="true"
                    class="datetime-picker"
                  >
                  </ion-datetime>
                </ion-modal>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-label position="stacked">End Date:</ion-label>
              <ion-item button="true" @click="setEndOpen">
                <ion-label>{{ dreamEndDate }}</ion-label>
                <ion-text></ion-text>
                <ion-icon :icon="calendarOutline"></ion-icon>
                <ion-modal :is-open="isEndDateOpen" :initial-breakpoint="0.3" handle-behavior="cycle">
                  <ion-button fill="clear" class="confirm-button" @click="confirmEndDate">Confirm</ion-button>
                  <ion-datetime
                    presentation="date"
                    :value="dreamEnd"
                    v-model="dreamEnd"
                    ref="customEndDate"
                    prefer-wheel="true"
                    class="datetime-picker"
                  >
                  </ion-datetime>
                </ion-modal>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row class="milestone-item">
            <ion-col>
              <div class="milestone-supporter">
                <ion-label class="add-filed-label">Fund Milestone</ion-label>
                <ion-button fill="clear" @click="() => this.$router.push({name: 'fund', params: {id: milestone.id}})">
                  <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
                </ion-button>
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="milestone-item">
            <ion-col>
              <div v-if="!supporterflag" class="milestone-supporter">
                <ion-label class="add-filed-label">Supporters</ion-label>
                <ion-button fill="clear" @click="() => this.$router.push({ name: 'supporters' })">
                  <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
                </ion-button>
              </div>
              <div v-else class="milestone-images">
                <ul class="supporters">
                  <ion-thumbnail  class="supporters-img" v-for="supporter in supporters" :key="supporter.id">
                    <ion-img :src="supporter.src"></ion-img>
                  </ion-thumbnail>
                </ul>
                <ion-label style="margin-left: 20px">{{supporters.length}} Supporters</ion-label>
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="milestone-item-product">
            <ion-col>
              <div v-if="!productflag" class="milestone-supporter">
                <ion-label class="add-filed-label">Products & Services</ion-label>
                <ion-button fill="clear" @click="() => this.$router.push({ name: 'product' })">
                  <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
                </ion-button>
              </div>
              <div v-else class="milestone-images">
                <ul class="supporters">
                  <ion-thumbnail  class="supporters-img" v-for="product in products" :key="product.id">
                    <ion-img :src="product.src"></ion-img>
                  </ion-thumbnail>
                </ul>
                <ion-label style="margin-left: 20px">{{products.length}} Products & Services</ion-label>
              </div>
            </ion-col>
          </ion-row>
          <ion-row v-if="!clickDone">
            <ion-col>
              <div class="disable-done-button">
                <ion-text>Done</ion-text>
              </div>
            </ion-col>
          </ion-row>
          <ion-row v-else>
            <ion-col>
              <div class="done-button" @click="confirmMilestone">
                <ion-text>Done</ion-text>
              </div>
            </ion-col>
          </ion-row>
        </div>
      </div>
      <div v-else>
        <div v-for="milestone in milestones" :key="milestone.id" class="each-milestone">
          <ion-row>
            <ion-col size="10">
              <ion-label class="milestone-title" position="stacked">{{milestone.title}}</ion-label>
            </ion-col>
            <ion-col size="2">
              <ion-button fill="clear" @click="showEditMilestone">
                <ion-icon :icon="ellipsisVertical"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div v-if="showMore">
                {{ milestone.description }} <a href="#" @click.prevent="showMore = false">Read Less</a>
              </div>
              <div v-else>
                {{ milestone.description.substring(0, 100) }}...
                <a href="#" @click.prevent="showMore = true">Read More</a>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <div v-if="!supporterflag"></div>
            <ion-item v-else class="each-milestone-item">
              <ul class="supporters">
                <ion-thumbnail  class="supporters-img" v-for="supporter in supporters" :key="supporter.id">
                  <ion-img :src="supporter.src"></ion-img>
                </ion-thumbnail>
              </ul>
              <ion-label style="margin-left: 20px"><span style="color: #59D1D4;">{{ supportersNum }}</span> Supporters</ion-label>
            </ion-item>
          </ion-row>
          <ion-row>
            <div v-if="!productflag"></div>
            <ion-item v-else class="each-milestone-item">
              <ul class="supporters">
                <ion-thumbnail  class="supporters-img" v-for="product in products" :key="product.id">
                  <ion-img :src="product.src"></ion-img>
                </ion-thumbnail>
              </ul>
              <ion-label style="margin-left: 20px">{{ productsNum }} Products & Ser...</ion-label>
            </ion-item>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label class="add-filed-label">$ {{milestone.funds}} Milestones Funded</ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="3">
              <ion-label>6 months</ion-label>
            </ion-col>
            <ion-col size="9">
              <ion-label>{{ this.dreamStartDate }} to {{ this.dreamEndDate }}</ion-label>
            </ion-col>
          </ion-row>
        </div>
        <ion-modal :is-open="isEditMilestone" :initial-breakpoint="0.25">
          <ion-row class="modal-item-edit">
            <div class="each-item">
              <ion-icon :icon="createOutline"></ion-icon>
              Edit Milestone
            </div>
          </ion-row>
          <ion-row class="modal-item-delete">
            <div class="each-item">
              <ion-icon :icon="trashOutline"></ion-icon>
              Delete Milestone
            </div>
          </ion-row>
        </ion-modal>
      </div>
    </ion-grid>
    <div class="set-margin">
      <h6 position="stacked">Dream Wallet</h6>
      <ion-label position="stacked">Add a method to recieve your funds</ion-label>
      <ion-item>
        <span class="ion-text-left">Add Wallet</span>
        <ion-button fill="clear" @click="() => this.$router.replace('wallet')">
          <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
        </ion-button>
      </ion-item>
    </div>
    <div class="set-margin">
      <h6 position="stacked">Visibility</h6>
      <ion-label position="stacked">Choose how others see your dream</ion-label>
      <ion-button fill="clear" class="rounded-box" @click="openPopover($event)">
        <span class="ion-text-left">{{this.visibility}}</span>
        <ion-icon :icon="chevronDownOutline" class="plus-icon" style="font-size: 24px; margin-right: 12px;"></ion-icon>
      </ion-button>
      <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen = false" class="select-visible">
        <ion-content class="ion-padding" @click="setVisible('Public')">Public</ion-content>
        <ion-content class="ion-padding" @click="setVisible('Private')">Private</ion-content>
      </ion-popover>
    </div>
    <div class="set-margin">
      <ion-row>
        <h6 style="width: 100%">Hashtags:</h6>
        <ion-label style="width: 100%; margin-bottom: 12px;" >Connect with people having similar dreams</ion-label>
        <ion-item>
          <ion-input color="tertiary" placeholder="#" v-model="tagName">
          </ion-input>
          <ion-button fill="clear" @click="addTag">
            <ion-icon :icon="addCircleOutline" class="plus-icon"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-row>
            <ion-col>
              <div class="hashtag" @click="removeTag(tag)" v-for="tag in tags" :key="tag">
                #{{ tag }}
                <ion-icon :icon="close" class="close-icon"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
      <ion-row></ion-row>
    </div>
    <ion-row v-if="!allRequired">
      <ion-col>
        <div class="disable-publish-button">
          <ion-text>Done</ion-text>
        </div>
      </ion-col>
    </ion-row>
    <ion-row v-else>
      <ion-col>
        <div class="publish-button" @click="saveDream">
          <ion-text>Done</ion-text>
        </div>
      </ion-col>
    </ion-row>
  </base-layout>
</template>

<script>
import {
  IonLabel,
  IonThumbnail,
  IonInput,
  IonTextarea,
  IonText,
  IonPopover,
  IonContent,
  IonDatetime,
  IonModal,
  IonGrid,
  IonCol,
  IonRow
} from '@ionic/vue'

import {
  cloudUploadOutline,
  close,
  addOutline,
  cameraOutline,
  calendarOutline,
  chevronDownOutline,
  addCircleOutline,
  ellipsisVertical,
  trashOutline,
  createOutline
} from 'ionicons/icons'

import PhotoComponent from '../../components/utils/PhotoComponent.vue'
import { useDreams } from '../../stores/dreams'
import { useWallets } from '../../stores/wallets'
import { intervalToDate } from '../../helpers/time'
import { format, parseISO } from 'date-fns'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    IonThumbnail,
    IonLabel,
    IonInput,
    IonTextarea,
    PhotoComponent,
    IonText,
    IonPopover,
    IonContent,
    IonDatetime,
    IonModal,
    IonCol,
    IonGrid,
    IonRow
  },
  setup () {
    const dreamStore = useDreams()
    const walletStore = useWallets()
    const editIcon = '../assets/icons/edit_icon.png'
    return {
      cloudUploadOutline,
      close,
      addCircleOutline,
      dreamStore,
      walletStore,
      cameraOutline,
      calendarOutline,
      chevronDownOutline,
      addOutline,
      ellipsisVertical,
      trashOutline,
      editIcon,
      createOutline
    }
  },
  watch: {
    dreamStartDate (value) {
      this.validateForm()
      this.validMilestone()
      return value
    },
    dreamEndDate (value) {
      this.validateForm()
      this.validMilestone()
      return value
    },
    supporters (value) {
      if (value.length > 0) {
        this.supporterflag = true
      } else {
        this.supporterflag = false
      }
    },
    products (value) {
      if (value.length > 0) {
        this.productflag = true
      } else {
        this.productflag = false
      }
    },
    supportersNum (value) {
      return value
    },
    title () {
      this.validateForm()
    },
    description () {
      this.validateForm()
    },
    dreamPhoto () {
      this.validateForm()
    },
    milestones () {
      this.validMilestone()
    }
  },
  data () {
    return {
      isOpen: false,
      tagName: '',

      dreamPhoto: { dataUrl: '', blob: null, raw: '' },
      title: '',
      titleError: '',
      description: '',
      descriptionError: '',
      dreamStart: '',
      dreamEnd: '',
      tags: [],
      milestones: [],
      wallet: null,
      wallets: [],
      popoverOpen: false,
      event: null,
      visibility: 'Public',
      clickDone: false,
      allRequired: false,
      supportersNum: 0,
      productsNum: 0,
      isAddedSupporters: false,
      isAddedProduct: false,
      progressflag: false,
      showMore: false,
      supporters: [],
      products: [],
      supporterflag: false,
      productflag: false,
      isStartDateOpen: false,
      isEndDateOpen: false,
      isEditMilestone: false,
      dreamStartDate: 'mm/dd/yy',
      dreamEndDate: 'mm/dd/yy',
      selectedDate: null,
      min: '2020-01-01T00:00:00',
      max: '2050-12-31T23:59:59'
    }
  },
  methods: {
    openPopover (e) {
      this.event = e
      this.popoverOpen = true
    },
    setVisible (value) {
      this.visibility = value
      this.popoverOpen = false
    },
    setWallet (value) {
      this.wallet = value
    },
    intervalSelect (value) {
      this.dreamStart = new Date()
      this.dreamEnd = intervalToDate(value)
    },
    setStartDate (date) {
      this.dreamStart = date
    },
    setEndDate (date) {
      this.dreamEnd = date
    },
    loadImage (image) {
      this.dreamPhoto = image
      this.dreamStore.setImageUrl(this.dreamPhoto)
    },
    removeTag (tagName) {
      const index = this.tags.indexOf(tagName)
      this.tags.splice(index, 1)
    },
    addTag () {
      if (this.tags.length < 5) {
        if (this.tagName.replace(' ', '').length > 0) {
          if (this.tags.includes(this.tagName)) {
            alert('Tag already exists!')
            this.tagName = ''
          } else {
            this.tags.push(this.tagName.replace(' ', ''))
            this.tagName = ''
          }
        } else {
          alert('Please enter a tag!')
        }
      } else {
        alert('You can only add up to 5 tags!')
      }
    },
    async saveDream () {
      let dream = {}
      dream.title = this.title
      dream.description = this.description
      dream.image = this.dreamPhoto.raw
      dream.milestones = this.milestones
      dream.tags = this.tags
      dream.dreamStart = this.dreamStart
      dream.dreamEnd = this.dreamEnd
      dream.wallet = this.wallet

      dream.progress = 0
      const result = await this.dreamStore.addDream(dream)

      if (result.status === 201) {
        dream = result.data
        this.dreamPhoto = ''
        this.title = ''
        this.dreamLocation = ''
        this.description = ''
        this.dreamStart = null
        this.dreamEnd = null
        this.tags = []
        this.milestones = []
        this.dreamStore.addSupporter([])
        this.dreamStore.addProduct([])
        this.$router.push({ name: 'dreamLoading', params: { id: dream.id } })
      } else {
        alert('Error saving dream!')
        this.titleError = result.data.title ? result.data.title[0] : ''
        this.descriptionError = result.data.description ? result.data.description[0] : ''
        this.imageError = result.data.image ? result.data.image[0] : ''
        this.milestonesError = result.data.milestones ? result.data.milestones[0] : ''
        this.tagsError = result.data.tags ? result.data.tags[0] : ''
      }
    },
    addMilestone () {
      this.milestones.push({
        id: this.milestones.length + 1,
        title: '',
        date: new Date(),
        description: '',
        completed: false
      })
    },
    confirmMilestone () {
      this.progressflag = true
    },
    getSupporters () {
      const storeSupporters = this.dreamStore.getSupporters
      return storeSupporters
    },
    setStarterOpen () {
      this.isStartDateOpen = !this.isStartDateOpen
    },
    setEndOpen () {
      this.isEndDateOpen = !this.isEndDateOpen
    },
    confirmEndDate () {
      this.isEndDateOpen = false
      this.dreamEndDate = format(parseISO(this.dreamEnd), 'MMM d, yyyy')
    },
    confirmStartDate () {
      this.isStartDateOpen = false
      this.dreamStartDate = format(parseISO(this.dreamStart), 'MMM d, yyyy')
    },
    showEditMilestone () {
      this.isEditMilestone = !this.isEditMilestone
    },
    validateForm () {
      if (this.title && this.description && this.dreamPhoto.dataUrl && this.dreamStart && this.dreamEnd) {
        this.allRequired = true
      } else {
        this.allRequired = false
      }
    },
    validMilestone () {
      if (this.milestones[0].title && this.milestones[0].description && this.dreamStart && this.dreamEnd) {
        this.clickDone = true
      } else {
        this.clickDone = false
      }
    }
  },
  computed: {
    tagLimit () {
      return this.tags.length >= 5
    },
    showMilestoneButton () {
      return !this.milestones.legnth
    }
  },
  mounted () {
    this.$nextTick(async () => {
      await this.walletStore.loadWallets()
      this.wallets = this.walletStore.wallets
      this.dreamStore.addSupporter([])
      this.dreamStore.addProduct([])
      this.supportersNum = 0
      this.supporters = []
      this.productsNum = 0
      this.products = []
    })
  },
  updated () {
    const supporters = this.dreamStore.$state.supporters
    if (supporters.length > 5) {
      this.supportersNum = this.dreamStore.$state.supporters.length
      this.supporters = supporters.slice(0, 5)
    } else {
      this.supportersNum = supporters.length
      this.supporters = supporters
    }
    const products = this.dreamStore.$state.product
    if (products.length > 5) {
      this.productsNum = this.dreamStore.$state.product.length
      this.products = products.slice(0, 5)
    } else {
      this.productsNum = products.legnth
      this.products = products
    }
    this.dreamPhoto = this.dreamStore.$state.Image
  }
})
</script>

<style scoped>
.center-align-col {
  text-align: center;
  display: flex;
  justify-content: center;
  margin: 15px;
  width: 350px;
  height: 190px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23866EE1FF' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 16px;
}
.dream-photo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 325px;
  height: 190px;
  --border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 15px;
}
.dream-description {
  margin: 20px;
  border-radius: 15px;
  border: 0.5px solid #b28de4;
}
.dream-item {
  margin: 10px;
}
.image-upload-button {
  height: 30px;
  margin-top: 70px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  text-transform: none;
}

.image-change-button {
  position: absolute;
  height: 28px;
  margin-top: 130px;
  margin-left: -120px;
  border-radius: 10px;
  background: #FFFFFF;
  font-size: 10px;
  z-index: 10;
  justify-content: space-between;
  align-items: center;
  padding: -5px;
  color: #212325;
}

.publish-button {
  width: auto;
  height: 50px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #866EE1;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  color: white;
}
.done-button {
  width: auto;
  height: 50px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #866EE1;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  color: white;
}

.tag-container {
  border: 1px solid var(--ion-color-primary);
}

.tag {
  display: inline-block;
  border-radius: 10%;
}

.invalid {
  --color: var(--ion-color-danger);
  overflow-y: scroll;
}

ion-item {
  width: 100%;
  height: 50px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: none;
  margin-bottom: 10px;
  background: transparent;
  border: 1px solid #d1d1d6;
  border-radius: 10px;
}

ion-item.item-has-focus {
  border: 2px solid var(--ion-color-secondary) !important;
}

.each-milestone {
  margin: 15px;
  border-radius: 15px;
  border: 0.5px solid #b28de4;
}
.each-milestone-item {
  margin: 15px;
}

ion-label {
  color: rgb(173 173 174);
  font-size: 14px;
}

.ion-page {
  --ion-background-color: #fff;
}

ion-item.rouded {
  border-radius: 20px;
  background: var(--ion-color-primary);
  color: var(--ion-color-primary);
  border: 0.5px solid #b28de4;
}

.rounded {
  font-size: 14px;
}

div.set-margin {
  margin: 20px;
}

span.ion-text-left {
  margin-right: auto;
}

.rounded-box {
  width: 100%;
  height: 50px;
  color: #212325;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: none;
  margin-bottom: 10px;
  background: transparent;
  border: 1px solid #d1d1d6;
  border-radius: 10px;
}

.plus-icon {
  font-size: 24px;
  margin: 0px;
  color: #212325;
}

.camera-icon {
  font-size: 12px;
  margin-right: 8px;
  color: #212325;
}

.wallet-select {
  margin-right: auto;
}

.add-filed-label {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #212325;
  margin-left: 20px;
}

.select-visible {
  --width: 92%;
  border-radius: 16px;
}

ion-content:hover {
  --background-color: #CFC5F3;
}

.add-milestone {
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ion-button {
  text-transform: none;
  --border-radius: 16px;
}

.supporters {
  list-style-type: none;
  margin: 20px;
  padding: 0;
}
.supporters-img {
  width: 46px;
  height: 46px;
  --border-radius: 50%;
  border: 2px solid white;
  display: inline-block;
  position: relative;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
  -webkit-transition: .2s ease;
  transition: .2s ease;
}
.supporters-img:nth-child(n+2){
  margin-left: -30px;
}
.modal-item-edit {
  color: black;
  margin-top: 25px;
  margin-left: 20px;
  margin-right: 20px;
}
.modal-item-delete {
  color: black;
  margin-top: 5px;
  margin-left: 20px;
  margin-right: 20px;
}
.plus-button {
  border: 1px solid #212325;
  border-radius: 5px;
  width: 21.5px;
  height: 21.5px;
  padding: 0px;
  font-size: 18px;
}
.milestone-title {
  width: 90%;
  margin-left: 20px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
}
.each-item {
  width: 100%;
  height: 50px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
  text-transform: none;
  margin-left: 10px;
  background: transparent;
}
.hashtag {
  width: 81px;
  height: 32px;
  background-color: #59D1D4;
  border-radius: 8px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
}
.close-icon {
  width: 16px;
  height: 16px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #30C5C9;
  border-radius: 50%;
  margin-left: 8px;
}
.milestone-item {
  border-top: 0.5px solid #B6A8ED;
}
.milestone-item-product{
  border-top: 0.5px solid #B6A8ED;
  border-bottom: 0.5px solid #B6A8ED;
}
.milestone-supporter {
  width: 100%;
  height: 50px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: none;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.milestone-images {
  width: 100%;
  height: 50px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-transform: none;
  background: transparent;
  display: flex;
  align-items: center;
}
.disable-done-button {
  width: auto;
  height: 50px;
  border-radius: 16px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #B6A8ED;
  background-color: #E7E2F9;
}
.disable-publish-button {
  width: auto;
  height: 50px;
  border-radius: 16px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #B6A8ED;
  background-color: #E7E2F9;
}
.datetime-modal {
  justify-content: center;
  align-items: center;
}
.datetime-picker {
  width: 100%;
  margin-left: 20px;
}
.confirm-button {
  margin-right: 0px;
}
</style>
