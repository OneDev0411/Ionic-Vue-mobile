<template>
  <ion-button class="select_btn" :id="id">
    <div class="select_container">
      <ion-label :class="[selectedData ? 'text' : 'placeholder']">
        {{ selectedData ? selectedData : placeholder }}
      </ion-label>
      <ion-icon name="chevron-down-outline"></ion-icon>
    </div>
  </ion-button>
  <ion-popover :showBackdrop="false" :trigger="id" size="cover">
    <ion-content class="modal_container">
      <ion-button
        class="option_btn"
        v-for="item in items"
        :key="item"
        @click="handleClick(item)"
      >
        <ion-label class="text">{{ item }}</ion-label>
      </ion-button>
    </ion-content>
  </ion-popover>
</template>

<script>
import { IonButton, IonPopover } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: [
    'countrySelected',
    'citySelected',
    'publicSelected',
    'genderSelected'
  ],
  components: { IonButton, IonPopover },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    items: {
      type: Array[String],
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selectedCountry: '',
      selectedCity: '',
      selectedData: '',
      selectedPublic: '',
      selectedGender: ''
    }
  },
  methods: {
    async handleClick (item) {
      if (this.id === 'country') {
        this.selectedCountry = item
        this.selectedData = item
        console.log('this is select comp------->', item)
        this.$emit('countrySelected', this.selectedCountry)
      } else if (this.id === 'city') {
        this.selectedCity = item
        this.selectedData = item
        this.$emit('citySelected', this.selectedCity)
      } else if (this.id === 'public') {
        this.selectedPublic = item
        this.selectedData = item
        this.$emit('publicSelected', this.selectedPublic)
      } else {
        this.selectedGender = item
        this.selectedData = item
        this.$emit('genderSelected', this.selectedGender)
      }
    }
  }
})
</script>

<style>
.modal_container {
  border-radius: 8px;
  margin-top: 10px;
  height: 300px;
  overflow-y: auto;
}
.select_btn {
  --background: #fff !important;
  color: #212325;
  width: 100%;
  border-radius: 8px !important;
  overflow: hidden;
  --box-shadow: none;
  border: 1px solid #d1d1d6;
  height: 48px;
}
.select_btn.active,
.select_btn.actived {
  border: 2px solid var(--ion-color-secondary) !important;
}
.option_btn {
  margin: 0px;
  width: 100%;
  --border-radius: none;
  --background: #f9f8ff;
  text-align: left;
  border-bottom: 1px solid #b6a8ed;
}
.option_btn:hover {
  --background: #cfc5f3;
}
.option_btn:last-child {
  border-bottom: none;
}
.text {
  width: 100%;
  color: #212325;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-transform: capitalize;
}
.select_container {
  width: 100%;
  justify-content: space-between;
  text-align: left;
  text-transform: capitalize;
  display: flex;
  align-items: center;
}
.placeholder {
  color: #d1d1d6 !important;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}
ion-popover::part(content) {
  border-radius: 8px;
  border: 1px solid #b6a8ed;
  margin-top: 7px;
}
</style>
