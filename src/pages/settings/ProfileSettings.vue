<template>
  <base-layout page-title="Profile">
    <ion-grid>
      <ion-row>
        <ion-col class="center-align-col reduced-height">
          <ion-thumbnail v-if="!!image" class="rounded-thumbnail">
            <ion-img v-if="image.image" :src="image.image" />
            <ion-img v-else :src="image.dataUrl" />
          </ion-thumbnail>

          <ion-icon v-else :icon="personCircleOutline" class="large-icon"></ion-icon>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="center-align-col">
          <photo-component @image-loaded="updateProfilePhoto">
            <ion-button fill="outline" shape="round">
              <ion-icon slot="start" :icon="createOutline"></ion-icon>
              Edit photo</ion-button
            >
          </photo-component>
        </ion-col>
      </ion-row>

      <!-- first name -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[firstNameError ? 'invalid' : '']"
          >
            First Name * {{ firstNameError }}
          </ion-label>
          <ion-item>
            <ion-label v-if="firstNameError" position="floating"> </ion-label>

            <ion-input v-model="firstName" type="text"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- last name -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[lastNameError ? 'invalid' : '']"
          >
            Last Name * {{ lastNameError }}
          </ion-label>
          <ion-item>
            <ion-input v-model="lastName" type="text"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- city -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[cityError ? 'invalid' : '']"
          >
            City * {{ cityError }}
          </ion-label>
          <ion-item>
            <ion-input v-model="city" type="text"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- country -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[countryError ? 'invalid' : '']"
          >
            Country * {{ countryError }}
          </ion-label>
          <ion-item>
            <ion-input v-model="country" type="text"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- date of birth -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[dateOfBirthError ? 'invalid' : '']"
          >
            Date of Birth * {{ dateOfBirthError }}
          </ion-label>

          <datepicker-dropdown
            v-model="dateOfBirth"
            label="Date of Birth"
            min="1900-01-01T00:00:00"
            max="2022-01-01T00:00:00"
            @date-selected="dateSelected"
          ></datepicker-dropdown>
        </ion-col>
      </ion-row>

      <!-- profile visibility -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[profileVisibilityError ? 'invalid' : '']"
          >
            Profile Visibility * {{ profileVisibilityError }}
          </ion-label>
          <ion-item>
            <ion-label>Please Select</ion-label>
            <ion-select v-model="profileVisibility">
              <ion-select-option value="public">Public</ion-select-option>
              <ion-select-option value="private">Private</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- ocupation -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[ocupationError ? 'invalid' : '']"
          >
            ocupation {{ ocupationError }}
          </ion-label>
          <ion-item>
            <ion-input v-model="ocupation" type="text"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- gender -->
      <ion-row>
        <ion-col>
          <ion-label
            position="stacked"
            style="color: rgb(173 173 174)"
            :class="[genderError ? 'invalid' : '']"
          >
            Gneder {{ genderError }}
          </ion-label>
          <ion-item>
            <ion-label>Please Select</ion-label>
            <ion-select v-model="gender">
              <ion-select-option value="male">Male</ion-select-option>
              <ion-select-option value="female">Female</ion-select-option>
              <ion-select-option value="transgender">Transgender</ion-select-option>
              <ion-select-option value="nonbinary">Non-binary / Non-conforming</ion-select-option>
              <ion-select-option value="noresponse">Prefer not to respond</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-col>
      </ion-row>

      <!-- bio -->
      <ion-row>
        <ion-col>
          <ion-label position="stacked" style="color: rgb(173 173 174)"> Bio: </ion-label>
          <ion-item>
            <ion-label v-if="bioError" position="floating" class="invalid">
              {{ bioError }}
            </ion-label>

            <ion-textarea row="20" v-model="bio" placeholder="Bio"></ion-textarea>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row v-if="changesExist">
        <ion-col class="center-align-col">
          <ion-button shape="round" @click="saveChanges"> Save Profile</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import {
  IonThumbnail,
  IonLabel,
  IonInput,
  IonImg,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { useUser } from "../../stores/user";
import { createOutline } from "ionicons/icons";
import PhotoComponent from "../../components/utils/PhotoComponent.vue";
import DatepickerDropdown from "../../components/layout/DatepickerDropdown.vue";

export default {
  components: {
    IonThumbnail,

    IonLabel,
    IonInput,
    IonImg,
    IonTextarea,
    PhotoComponent,
    DatepickerDropdown,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const userStore = useUser();
    return { userStore, createOutline };
  },
  data() {
    return {
      image: this.userStore.profilePhoto,
      changesExist: false,

      firstName: this.userStore.firstName,
      firstNameError: "",

      lastName: this.userStore.lastName,
      lastNameError: "",

      city: this.userStore.city,
      cityError: "",

      country: this.userStore.country,
      countryError: "",

      dateOfBirth: this.userStore.dateOfBirth,
      dateOfBirthError: "",

      profileVisibility: this.userStore.profileVisibility,
      profileVisibilityError: "",

      ocupation: this.userStore.ocupation,
      ocupationError: "",

      bio: this.userStore.bio,
      bioError: "",
    };
  },
  watch: {
    firstName() {
      this.changesExist = true;
    },
    lastName() {
      this.changesExist = true;
    },
    city() {
      this.changesExist = true;
    },
    country() {
      this.changesExist = true;
    },
    dateOfBirth() {
      this.changesExist = true;
    },
    profileVisibility() {
      this.changesExist = true;
    },
    ocupation() {
      this.changesExist = true;
    },
    gender() {
      this.changesExist = true;
    },
    bio() {
      this.changesExist = true;
    },
    image() {
      this.changesExist = true;
    },
  },
  methods: {
    updateProfilePhoto(image) {
      this.image = image;
    },
    async saveChanges() {
      const response = await this.userStore.updateProfile({
        displayName: `${this.firstName} ${this.lastName}`,
        firstName: this.firstName,
        lastName: this.lastName,
        location: this.location,
        bio: this.bio,
        profilePhoto: this.image,
      });
      if (response.status === 204) {
        this.changesExist = false;
        await this.userStore.getUserProfile();
        this.$router.replace("/profile");
      } else {
        this.firstNameError = response.data.firstName ? response.data.firstName[0] : "";
        this.lastNameError = response.data.lastName ? response.data.lastName[0] : "";
        this.locationError = response.data.location ? response.data.location[0] : "";
        this.bioError = response.data.bio ? response.data.bio[0] : "";
      }
      this.changesExist = false;
    },
  },
};
</script>

<style scoped>
.center-align-col {
  text-align: center;
  display: flex;
  justify-content: center;
}
.rounded-thumbnail {
  --border-radius: 100%;
  padding: 2px;

  --size: 128px;
}
.invalid {
  color: var(--ion-color-danger) !important;
}
ion-item {
  margin-bottom: 10px;
  background: transparent;
  border: 1px solid #d1d1d6;
  border-radius: 8px;
}

ion-item.item-has-focus {
  border: 2px solid var(--ion-color-secondary) !important;
}
</style>
