<template>
  <ion-grid>
    <ion-row>
      <ion-col :class="isSelected('friends')" class="no-width">
        <ion-button
          shape="round"
          size="small"
          fill="clear"
          @click="setSelected('friends')"
          >Friends</ion-button
        >
      </ion-col>
      <ion-col :class="isSelected('people')" class="no-width">
        <ion-button
          shape="round"
          size="small"
          fill="clear"
          @click="setSelected('people')"
          >People</ion-button
        >
      </ion-col>
      <ion-col :class="isSelected('requests')" class="no-width">
        <ion-button
          shape="round"
          size="small"
          fill="clear"
          @click="setSelected('requests')"
          >Requests</ion-button
        >
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonCol } from "@ionic/vue";
import { defineComponent } from "vue";
import { useDreams } from "../../stores/dreams";
import { useUser } from "../../stores/user";
import { useUsers } from "../../stores/users";

export default defineComponent({
  emits: ["tabSelected"],
  components: { IonCol },
  setup() {
    const dreamStore = useDreams();
    const userStore = useUser();
    const usersStore = useUsers();
    return {
      dreamStore,
      userStore,
      usersStore,
    };
  },
  data() {
    return {
      selectedTab: "friends",
    };
  },
  methods: {
    async setSelected(name) {
      this.selectedTab = name;
      if (this.selectedTab == "friends") {
        await this.userStore.getUserFriends();
      } else if (name == "people") {
        await this.usersStore.getUsers();
      } else {
        await this.userStore.getFriendRequests();
      }
      this.$emit("tabSelected", this.selectedTab);
    },
    isSelected(name) {
      if (this.selectedTab == name) {
        return "selected";
      }
      return "";
    },
  },
  mounted() {
    this.setSelected("friends");
  },
});
</script>

<style scoped>
ion-button {
  margin-top: 2px;
}
ion-col {
  display: flex;
  justify-content: center;
  border-radius: 30px;
  height: 30px;
  padding: 0;
}
ion-col.selected {
  background-color: var(--ion-color-primary);
}
ion-col.selected ion-button {
  color: var(--ion-color-primary-contrast);
}
ion-row {
  margin-top: 10px;
  height: 30px;
  background-color: var(--ion-color-primary-contrast);
  border-radius: 30px;
}
@media only screen and (max-width: 350px) {
  .no-width {
    width: 0;
  }
}
</style>
