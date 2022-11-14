<template>
  <base-layout page-title="Profile">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">User Profile</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <ion-grid>
        <ion-row>
          <ion-col class="reduced-height">
            <ion-thumbnail v-if="!!image" class="rounded-thumbnail">
              <ion-img class="avatar2" v-if="image.image" :src="image.image" />
              <ion-img class="avatar1" v-else :src="image.dataUrl" />
            </ion-thumbnail>

            <ion-icon
              v-else
              :icon="personCircleOutline"
              class="large-icon"
            ></ion-icon>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="camera_div">
            <photo-component @image-loaded="updateProfilePhoto">
              <ion-icon name="camera-outline" class="camera_icon"></ion-icon>
            </photo-component>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="container">
        <!-- first name -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[firstNameError ? 'invalid-text' : 'desc-text']"
          >
            First Name *
          </ion-label>
          <ion-item class="input-div">
            <ion-input
              v-model="firstName"
              type="text"
              placeholder="First Name"
            ></ion-input>
          </ion-item>
        </div>

        <!-- last name -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[lastNameError ? 'invalid-text' : 'desc-text']"
          >
            Last Name *
          </ion-label>
          <ion-item class="input-div">
            <ion-input
              v-model="lastName"
              type="text"
              placeholder="Last Name"
            ></ion-input>
          </ion-item>
        </div>

        <!-- country -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[countryError ? 'invalid-text' : 'desc-text']"
          >
            Country *
          </ion-label>
          <StyledSelect
            :items="countrySelectData"
            :placeholder="'Select Country'"
            :id="'country'"
            @country-selected="setCountry"
          ></StyledSelect>
        </div>

        <!-- city -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[cityError ? 'invalid-text' : 'desc-text']"
          >
            City *
          </ion-label>
          <StyledSelect
            :items="citySelectData"
            :placeholder="'Select City'"
            :id="'city'"
            @city-selected="setCity"
          ></StyledSelect>
        </div>

        <!-- date of birth -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[dateOfBirthError ? 'invalid-text' : 'desc-text']"
          >
            Date of Birth *
          </ion-label>

          <ion-button class="select_btn" id="open-modal">
            <div class="select_container">
              <ion-label :class="[dateOfBirth ? dateOfBirth : placeholder]">
                {{ dateOfBirth ? dateOfBirth.slice(0, 9) : placeholder }}
              </ion-label>
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
          </ion-button>
        </div>

        <!-- calendar modal -->
        <ion-modal trigger="open-modal" :breakpoints="[0, 0.25, 0.5, 0.75]">
          <ion-datetime
            size="cover"
            presentation="date"
            :prefer-wheel="true"
            v-model="dateOfBirth"
          ></ion-datetime>
        </ion-modal>

        <!-- profile visibility -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[profileVisibilityError ? 'invalid-text' : 'desc-text']"
          >
            Profile Visibility *
          </ion-label>
          <StyledSelect
            :items="['Public', 'Private']"
            :placeholder="'Public'"
            :id="'public'"
            @public-selected="setPublic"
          ></StyledSelect>
        </div>

        <!-- ocupation -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[ocupationError ? 'invalid-text' : 'desc-text']"
          >
            Occupation
          </ion-label>
          <ion-item class="input-div">
            <ion-input
              v-model="ocupation"
              type="text"
              placeholder="Professional Type"
            ></ion-input>
          </ion-item>
        </div>

        <!-- gender -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[genderError ? 'invalid-text' : 'desc-text']"
          >
            Gender
          </ion-label>
          <StyledSelect
            :items="[
              'Male',
              'Female',
              'Transgender',
              'Non-binary/Non-conforming',
              'Prefer not to respond',
            ]"
            :placeholder="'Select'"
            :id="'gender'"
            @gender-selected="setGender"
          ></StyledSelect>
        </div>

        <!-- bio -->
        <div class="item">
          <ion-label
            position="stacked"
            :class="[bioError ? 'invalid-text' : 'desc-text']"
          >
            Bio
          </ion-label>
          <ion-item class="textarea">
            <ion-textarea
              row="20"
              v-model="bio"
              class="textarea_height"
              placeholder="A little something about you..."
            ></ion-textarea>
          </ion-item>
        </div>

        <div class="item">
          <ion-label
            :class="[
              !firstName | !lastName | !city | !country
                ? 'invalid-text'
                : 'desc-text',
            ]"
          >
            *Please fill out required fields
          </ion-label>
        </div>

        <div class="item">
          <button
            :class="[
              !firstName | !lastName | !city | !country
                ? 'save-disable-btn'
                : 'save-active-btn',
            ]"
            @click="saveChanges"
          >
            Save Profile
          </button>
        </div>
      </div>
      <ion-modal class="save_modal" :is-open="isOpenSaveModal">
        <div class="save_modal_container">
          <img src="/assets/avatars/userprofile/confirm.png" class="img1" />
          <ion-label class="text1">Profile Created!</ion-label>
        </div>
      </ion-modal>
    </template>
  </base-layout>
</template>

<script>
import {
  IonThumbnail,
  IonLabel,
  IonInput,
  IonImg,
  IonTextarea,
  IonDatetime,
  IonButton,
  IonModal,
} from '@ionic/vue'
import { useUser } from '../../stores/user'
import { createOutline } from 'ionicons/icons'
import PhotoComponent from '../../components/utils/PhotoComponent.vue'
import StyledSelect from '../../components/userprofile/StyledSelect.vue'
import { COUNTRY } from '../../helpers/country'
// import DatepickerDropdown from '../../components/layout/DatepickerDropdown.vue'

export default {
  components: {
    IonThumbnail,
    IonLabel,
    IonInput,
    IonImg,
    IonTextarea,
    PhotoComponent,
    // DatepickerDropdown,
    IonDatetime,
    IonButton,
    StyledSelect,
    IonModal,
  },
  setup() {
    const userStore = useUser()
    return { userStore, createOutline }
  },
  data() {
    return {
      image: this.userStore.profilePhoto,
      changesExist: false,

      firstName: this.userStore.firstName,
      firstNameError: '',

      lastName: this.userStore.lastName,
      lastNameError: '',

      city: this.userStore.city,
      cityError: '',

      country: this.userStore.country,
      countryError: '',

      dateOfBirth: this.userStore.dateOfBirth,
      dateOfBirthError: '',

      profileVisibility: this.userStore.profileVisibility,
      profileVisibilityError: '',

      ocupation: this.userStore.ocupation,
      ocupationError: '',

      gender: this.userStore.gender,
      genderError: '',

      bio: this.userStore.bio,
      bioError: '',

      countrySelectData: '',
      citySelectData: '',

      isOpenSaveModal: false,
    }
  },
  watch: {
    firstName() {
      this.changesExist = true
    },
    lastName() {
      this.changesExist = true
    },
    city() {
      this.changesExist = true
    },
    country() {
      this.changesExist = true
    },
    dateOfBirth() {
      this.changesExist = true
    },
    profileVisibility() {
      this.changesExist = true
    },
    ocupation() {
      this.changesExist = true
    },
    gender() {
      this.changesExist = true
    },
    bio() {
      this.changesExist = true
    },
    image() {
      this.changesExist = true
    },
  },
  methods: {
    updateProfilePhoto(image) {
      this.image = image
    },
    async saveChanges() {
      const response = await this.userStore.updateProfile({
        firstName: this.firstName,
        lastName: this.lastName,
        displayName: `${this.firstName} ${this.lastName}`,
        location: `${this.city},${this.country}`,
        dateOfBirth: this.dateOfBirth,
        bio: this.bio,
        profile_photo: this.image,
      })
      console.log('userprofile response----->', response)
      if (response.status === 204) {
        this.changesExist = false
        this.isOpenSaveModal = true
        await this.userStore.getUserProfile()
        this.$router.replace('/profile')
      } else {
        this.firstNameError = response.data.firstName
          ? response.data.firstName[0]
          : ''
        this.lastNameError = response.data.lastName
          ? response.data.lastName[0]
          : ''
        this.locationError = response.data.location
          ? response.data.location[0]
          : ''
        this.bioError = response.data.bio ? response.data.bio[0] : ''
      }
      this.changesExist = false
    },
    setCountry(data) {
      this.country = data
      this.citySelectData = COUNTRY.find(
        (items) => items.name === data,
      ).states.map(function (item) {
        return item.name
      })
    },
    setCity(data) {
      this.city = data
    },
    setPublic(data) {
      this.profileVisibility = data
    },
    setGender(data) {
      this.gender = data
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.countrySelectData = COUNTRY.map(function (data) {
        return data.name
      })
    })
  },
}
</script>

<style scoped>
.container {
  margin: 20px;
  margin-top: 0px;
}
.toolbar {
  display: flex;
}
.title {
  text-align: center;
  margin-right: 40px;
}
.center-align-col {
  text-align: center;
  display: flex;
  justify-content: center;
}
.rounded-thumbnail {
  --border-radius: 100%;
  padding: 2px;
  --size: 96px;
}
.invalid {
  color: var(--ion-color-danger) !important;
}
.item {
  margin-bottom: 23px;
  background: transparent;
}
.save_modal::part(content) {
  border-radius: 16px 16px 16px 16px;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
  background-color: #f9f8ff;
  width: 310px;
  height: fit-content;
}
.save_modal_container {
  padding: 20px;
  display: grid;
  text-align: center;
}
.text1 {
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: #212325;
}
.img1 {
  width: 36px;
  height: 36px;
  margin-bottom: 20px;
  justify-self: center;
}
/* ion-item.item-has-focus {
  border: 2px solid var(--ion-color-secondary) !important;
} */
ion-input {
  background: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  color: #212325;
  --placeholder-color: #d1d1d6 !important;
}
ion-item {
  background: #fff;
  border: 1px solid #d1d1d6;
  border-radius: 8px;
}
ion-item.item-has-focus {
  border: 2px solid var(--ion-color-secondary) !important;
}
.textarea_height {
  height: 150px;
}
.desc-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #787c80;
  margin-bottom: 8px;
}
.invalid-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: #ff6363;
  margin-bottom: 8px;
}
.save-active-btn {
  background: #866ee1;
  border-radius: 16px;
  height: 50px;
  padding: 11px 30px;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
}
.save-disable-btn {
  background: #e7e2f9;
  border-radius: 16px;
  height: 50px;
  padding: 11px 30px;
  color: #b6a8ed;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
}
.select {
  width: 100%;
  background: #fff;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #d1d1d6;
}
.option-btn {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #b6a8ed;
}
.option-btn:hover {
  background: #cfc5f3;
}
.option-container {
  border: 1px solid #b6a8ed;
  border-radius: 8px;
  background: #f9f8ff;
  margin: 0px;
}
.select-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.select_btn {
  --background: #fff !important;
  color: #000;
  width: 100%;
  --border-radius: 8px !important;
  height: 48px;
}
.text {
  width: 100%;
  color: #212325;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  text-transform: capitalize;
}
.textarea {
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  background: #fff;
  height: 150px;
}
.placeholder {
  color: #d1d1d6;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
}
ion-popover::part(content) {
  height: fit-content;
  border: 16px 16px 0px 0px;
  background: #ffffff;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
}
ion-modal::part(content) {
  height: fit-content;
  position: absolute;
  bottom: 0px;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 4px 45px rgba(0, 0, 0, 0.25);
  background-color: white;
}
.camera_div {
  margin-left: 63px;
  margin-top: -38px;
}
.avatar1 {
  background: #e9ecf0;
  border: 1px dashed #866ee1;
}
.avatar2 {
  width: 96px;
  height: 96px;
  background: red;
}
.input-div {
  --placeholder-color: #d1d1d6 !important;
}
.textarea {
  --placeholder-color: #d1d1d6 !important;
}
.camera_icon {
  background: #fff;
  padding: 5px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
