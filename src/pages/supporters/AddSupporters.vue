<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="header-box">
          <ion-button class="arrow-back" fill="clear" @click="() => this.$router.replace('create-dream')">
            <ion-icon :icon="chevronBackSharp" ></ion-icon>
          </ion-button>

          <ion-title>Add Supporters</ion-title>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content class="search-result">
      <ion-searchbar placeholder="search" :debounce="1000" color="white" class="input-search" v-model="keyword" @ionChange="searchSupporter($event)"></ion-searchbar>
      <ion-row v-if="!searchResult" class="des-box">
        <ion-label class="search-des">Adding supporters helps you to engage with the right people to fulfill your dream. You can search supporters either by a person’s name or profession.</ion-label>
      </ion-row>
      <ion-row v-else>
        <ion-row class="filter-button" v-if="!allFilter">
          <ion-col>
            <ion-button class="all-filter" @click="allFiltered">All</ion-button>
            <ion-button class="added-filter" color="light" @click="addedFiltered">Added Supporters</ion-button>
          </ion-col>
          <ion-button fill="clear" class="add-supporter" @click="showInviteModal">
            <ion-icon :icon="addCircleOutline"></ion-icon>
          </ion-button>
        </ion-row>
        <ion-row class="filter-button" v-else>
          <ion-col>
            <ion-button class="all-filter"  color="light"  @click="allFiltered">All</ion-button>
            <ion-button class="added-filter" @click="addedFiltered">Added Supporters</ion-button>
          </ion-col>
          <ion-button fill="clear" class="add-supporter" @click="showInviteModal">
            <ion-icon :icon="addCircleOutline"></ion-icon>
          </ion-button>
        </ion-row>
        <ion-row v-if="!allFilter">
          <ion-item v-for="supporter in results" :key="supporter.id" class="supporter-item">
            <ion-thumbnail class="supporter-img">
              <ion-img :src="supporter.src"></ion-img>
            </ion-thumbnail>
            <ion-col>
              <ion-title class="supporter-name" >{{supporter.name}}</ion-title>
              <ion-title class="supporter-job">{{supporter.job}}</ion-title>
            </ion-col>
            <ion-button v-if="supporter.added" @click="diselectSupporter(supporter.id)" class="after-selected">Added <ion-icon :icon="checkmarkOutline"></ion-icon> </ion-button>
            <ion-button v-else fill="clear" @click="selectSupporter(supporter.id)" class="previous-selected">Add</ion-button>
          </ion-item>
        </ion-row>
        <ion-row v-else>
          <ion-item v-for="supporter in addedResult" :key="supporter.id" class="supporter-item">
            <ion-thumbnail class="supporter-img">
              <ion-img :src="supporter.src"></ion-img>
            </ion-thumbnail>
            <ion-col>
              <ion-title class="supporter-name" >{{supporter.name}}</ion-title>
              <ion-title class="supporter-job">{{supporter.job}}</ion-title>
            </ion-col>
            <ion-button color="light" @click="diselectSupporter(supporter.id)">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-row>
      </ion-row>
    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-button v-if="addedFlag" shape="round" class="add-button" id="open-invite-modal" @click="add">Add Supporters</ion-button>
      <ion-button v-else shape="round" class="add-button" disabled>Add Supporters</ion-button>
    </ion-footer>
    <ion-modal :is-open="showModal" id="example-modal" :is-close="showModal">
      <div class="wrapper">
        <h3>Invite Supporters</h3>
        <ion-row>
          <span style="width: 100%; margin-left: 20px; margin-top: 20px;">Invite by Email</span>
          <ion-row  class="invite-method">
            <ion-icon class="mail-outline" :icon="mailOutline"></ion-icon>
            <ion-input class="input-email-address" placeholder="Email address"></ion-input>
            <ion-button class="sendInviteEmail" @click="() => sendInvite">
              <ion-icon :icon="paperPlaneOutline"></ion-icon>
            </ion-button>
          </ion-row>
        </ion-row>
        <ion-row>
          <span style="width: 100%; margin-left: 20px">Copy link</span>
          <ion-row  class="invite-method">
            <ion-icon class="link-outline" :icon="linkOutline"></ion-icon>
            <ion-input class="input-email-address" placeholder="Email address"></ion-input>
            <ion-button class="sendInviteEmail">
              <ion-icon :icon="copyOutline" style="font-size: 60px"></ion-icon>
            </ion-button>
          </ion-row>
        </ion-row>
      </div>
    </ion-modal>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonSearchbar,
  IonModal
} from '@ionic/vue';

import { chevronBackSharp, checkmarkOutline, closeOutline, mailOutline, paperPlaneOutline, copyOutline, addCircleOutline, linkOutline } from 'ionicons/icons'
import { defineComponent, ref} from 'vue'
import { useDreams } from '../../stores/dreams';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonIcon,
    IonFooter,
    IonToolbar,
    IonSearchbar,
    IonModal,
  },
  setup() {
    const supporters = [{
      'id': 'Item1',
      'name': 'Chalres',
      'job': 'freelancer',
      'src': '../assets/supporters/Charles.png',
      'added': false
    }, {
      'id': 'Item2',
      'name': 'Gerald',
      'job': 'freelancer',
      'src': '../assets/supporters/Gerald.png',
      'added': false
    }, {
      'id': 'Item3',
      'name': 'jonas',
      'job': 'freelancer',
      'src': '../assets/supporters/jonas.png',
      'added': false
    }, {
      'id': 'Item4',
      'name': 'Phillip',
      'job': 'freelancer',
      'src': '../assets/supporters/Phillip.png',
      'added': false
    }, {
      'id': 'Item5',
      'name': 'Wesley',
      'job': 'freelancer',
      'src': '../assets/supporters/Wesley.png',
      'added': false
    }, {
      'id': 'Item6',
      'name': 'Willard',
      'job': 'freelancer',
      'src': '../assets/supporters/Willard.png',
      'added': false
    }, {
      'id': 'Item7',
      'name': 'Willie',
      'job': 'freelancer',
      'src': '../assets/supporters/Willie.png',
      'added': false
    }, {
      'id': 'Item8',
      'name': 'Charlesy',
      'job': 'freelancer',
      'src': '../assets/supporters/Charles.png',
      'added': false
    }, {
      'id': 'Item9',
      'name': 'Chalre',
      'job': 'freelancer',
      'src': '../assets/supporters/Charles.png',
      'added': false
    }];
    const results = ref(supporters);
    const dreamStore = useDreams()
    return {
      chevronBackSharp,
      checkmarkOutline,
      closeOutline,
      mailOutline,
      paperPlaneOutline,
      copyOutline,
      supporters,
      addCircleOutline,
      results,
      dreamStore,
      linkOutline
    }
  },
  created() {
    this.allFiltered();
  },
  watch: {
    results (value) {
      for(let i = 0; i < value.length; i++) {
        if(value[i].added == true) {
          this.addedFlag = true
        } else {
          this.addedFlag = false
        }
      }
    }
  },
  data() {
    return{
      searchResult: false,
      allFilter: false,
      keyword: '',
      addedFlag: false,
      addedResult: [],
      showModal: false
    }
  },
  methods: {
    addedFiltered() {
      this.allFilter = true
    },
    allFiltered() {
      this.allFilter = false
    },
    searchSupporter(event) {
      this.searchResult = true;
      const query = event.target.value.toLowerCase();
      this.results = this.supporters.filter(supporter => supporter.name.toLowerCase().indexOf(query) > -1 || supporter.job.toLowerCase().indexOf(query) > -1);
    },
    selectSupporter(id) {
      this.addedFlag = true
      const selected = this.results.find(item => item.id == id);
      const selectedIndex = this.results.indexOf(selected);
      this.results[selectedIndex].added = true
      this.addedResult.push(selected)

    },
    diselectSupporter(id) {
      const diselected = this.results.find(item => item.id == id);
      const diselectedIndex = this.results.indexOf(diselected);
      this.results[diselectedIndex].added = false
      this.addedResult = this.addedResult.filter(item => item.added == true)

      if (this.addedResult.length == 0) {
        this.addedFlag = false
      }
    },
    showInviteModal() {
      this.showModal = !this.showModal;
    },
    add() {
      console.log('this.addedResult', this.addedResult)
      this.dreamStore.addSupporter(this.addedResult)
      this.$router.push({ name: 'dreamCreation'})
    }
  }
});
</script>

<style scoped>
.header-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-search {
  padding: 12px 16px;
  width: 100%;
  height: 48px;
  --border-radius: 8px;
  margin-top: 10px;
  --background-color: white;
}
.des-box {
  border-radius: 8px;
  padding: 5px;
  background-color: #F3F1FC;
  margin: 20px;
}
.search-box {
  width: 100%;
  height: 100%;
}
.search-des {
  margin: 16px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
}
.ion-no-border {
  width: 100%;
  height: 120px;
  border-radius: 16px 16px 0px 0px;
  background-color: #F9F8FF;
  border: 1px solid #D1D1D6;
  backdrop-filter: blur(10px);
}
.add-button {
  background-color: #E7E2F9;
  --border-radius: 16px;
  width: 80%;
  height: 50px;
  margin-left: 10%;
  margin-top: 30px;
}
.arrow-back {
  font-size: 16px;
  --color: black;
  text-align: center;
}
.search-filter {
  margin-top: 20px;
  margin-left: 20px;
}
.search-filter {
  --border-radius: 8px;
  text-transform: none;
  margin-right: 10px;
}
.filter-button {
  display: flex;
  width: 100%;
  --justify-content: space-between;
  --align-items: center;
  margin-left: 20px;
  margin-top: 20px;
}
.all-filter {
  --width: 70px;
  --height: 35px;
  --border-radius: 8px;
  --background-color: #866EE1;
  text-transform: none;
  --justify-content: space-between;
  --align-items: center;
}
.added-filter {
  --width: 187px;
  --height: 35px;
  --border-radius: 8px;
  --background-color: #F3F1FC;
  text-transform: none;
  margin-left: 10px;
  --justify-content: space-between;
  --align-items: center;
}
.add-supporter {
  --width: 15px;
  --height: 15px;
  font-size: 18px;
  --color: #866EE1;
  --background-color: #31265A;
}
.supporter-img {
  width: 49px;
  height: 49px;
  --border-radius: 50%;
}
.supporter-result {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
.supporter-item {
  width: 100%;
  --display: flex;
  --align-items: center;
  --justify-content: space-between;
}
.supporter-name {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
}
.supporter-job {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
}

.search-result {
  --width: 100%;
}
ion-button {
  text-transform: none;
}

ion-modal#example-modal {
  --width: fit-content;
  --min-width: 200px;
  --height: fit-content;
  --border-radius: 16px;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal#example-modal h3 {
  margin: 20px 20px 10px 20px;
}

ion-modal#example-modal {
  margin-bottom: 10px;
}
.wrapper {
  margin-bottom: 10px;
}
.input-email-address {
  margin-left: 10px;
}
.mail-outline {
  width: 22px;
  height: 20px;
  margin-left: 17px;
}
.link-outline {
  width: 22px;
  height: 20px;
  margin-left: 17px;
  transform: rotate(-45deg);
}
.sendInviteEmail {
  height: 48px;
  width: 48px;
  border-radius: 16px;
}
.invite-method {
  padding: 0;
  width: 100%;
  margin: 20px;
  border: 1px solid #D1D1D6;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.after-selected {
  --background: #31265A;
  color: #FFFFFF;
  --border-radius: 8px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}
.previous-selected {
  width: 52px;
  height: 26px;
  border: 1px solid #31265A;
  color: #31265A;
  border-radius: 8px;
  padding: 4px 12px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
}

</style>
