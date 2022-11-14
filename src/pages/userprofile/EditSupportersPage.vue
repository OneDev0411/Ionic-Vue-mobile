<template>
  <base-layout page-title="ProfilePage">
    <template v-slot:header>
      <ion-header>
        <ion-toolbar>
          <div class="toolbar">
            <ion-buttons>
              <ion-back-button></ion-back-button>
            </ion-buttons>

            <ion-title class="title">Edit Supporters</ion-title>
          </div>
        </ion-toolbar>
      </ion-header>
    </template>
    <template v-slot:default>
      <div class="root">
        <div>
          <div class="search_div">
            <ion-searchbar
              class="search_bar"
              v-model="searchText"
              placeholder="Search"
            />
          </div>
          <div class="div5">
            <button
              :class="
                tab === 'all'
                  ? 'active_btn margin_right'
                  : 'inactive_btn margin_right'
              "
              @click="setTab('all')"
            >
              All
            </button>
            <button
              :class="tab !== 'all' ? 'active_btn' : 'inactive_btn'"
              @click="setTab('added')"
            >
              Added Supporters
            </button>
          </div>
          <div class="scroll_div">
            <div
              class="item item_boder"
              v-for="supporter in supporters"
              :key="supporter.id"
            >
              <div class="item">
                <img class="avatar" :src="supporter.avatar" />
                <div>
                  <ion-label class="name">{{ supporter.name }}</ion-label>
                  <ion-label class="role">{{ supporter.role }}</ion-label>
                </div>
              </div>
              <button v-if="supporter.add" class="added_btn">
                Added
                <ion-icon class="white" name="checkmark-outline"></ion-icon>
              </button>
              <button v-else class="no_added_btn">Add</button>
            </div>
          </div>
        </div>
        <button class="save_btn">
          Save
        </button>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { IonToolbar, IonBackButton, IonSearchbar } from '@ionic/vue'
import { SUPPORTER_DATA } from './mockup.tsx'

export default {
  setup() {},
  components: {
    IonToolbar,
    IonBackButton,
    IonSearchbar,
  },
  data() {
    return {
      supporters: [],
      tab: 'all',
    }
  },
  methods: {
    async handleSupport() {
      this.$router.replace('/settings/profile')
    },
    setTab(data) {
      this.tab = data
      if (data === 'all') {
        this.supporters = SUPPORTER_DATA
      } else {
        this.supporters = SUPPORTER_DATA.filter(function (data) {
          return data.add === true
        })
      }
    },
  },
  mounted() {
    this.$nextTick(async () => {
      this.supporters = SUPPORTER_DATA
    })
  },
}
</script>

<style scoped>
.toolbar {
  display: flex;
}
.root {
  padding: 20px;
  display: grid;
}
.title {
  text-align: center;
  margin-right: 40px;
}
.avatar {
  width: 49px;
  height: 49px;
  border-radius: 50%;
  margin-right: 12px;
}
.name {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #212325;
}
.role {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #787c80;
}
.search_div {
  margin-bottom: 23px;
}
.item {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between;
}
.item_boder {
  border-bottom: 1px solid #e9ecf0;
}
.no_added_btn {
  height: 26px;
  border: 1px solid #31265a;
  border-radius: 8px;
  background: #ffffff;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #31265a;
}
.added_btn {
  align-items: center;
  padding: 4px 12px;
  gap: 6px;
  height: 26px;
  background: #31265a;
  border: 1px solid #31265a;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #ffffff;
}
.active_btn {
  padding: 5px 25px;
  height: 31px;
  background: #866ee1;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #ffffff;
}
.inactive_btn {
  padding: 5px 25px;
  height: 31px;
  background: #f3f1fc;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #4e5256;
}
.search_bar {
  --border-radius: 8px !important;
}
.white {
  color: #fff;
  margin-left: 8px;
}
.div5 {
  display: flex;
  gap: 20px;
}
.margin_right {
  margin-right: 20px;
}
.save_btn {
  padding: 11px 30px;
  height: 50px;
  background: #866ee1;
  border-radius: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 176.52%;
  color: #ffffff;
  width: 100%;
}

.scroll_div {
  height: 500px;
  overflow-y: auto;
}
</style>
