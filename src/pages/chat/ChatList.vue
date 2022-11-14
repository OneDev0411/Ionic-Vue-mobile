<template>
  <base-layout page-title="Chat">
    <chat-filter-tabs @tab-selected="setTab"></chat-filter-tabs>
    <ion-list v-if="selectedTab == 'friends'">
      <friend-item
        v-for="user in userList"
        :key="user.id"
        :user="user"
        :reject-friend-request="rejectFriendRequest"
      />
    </ion-list>
    <ion-list v-else-if="selectedTab == 'people'">
      <people-item v-for="user in userList" :key="user.id" :user="user" />
    </ion-list>
    <ion-list v-else>
      <friend-request-item
        v-for="user in userList"
        :key="user.id"
        :user="user"
        :accept-friend-request="acceptFriendRequest"
        :reject-friend-request="rejectFriendRequest"
      >
      </friend-request-item>
    </ion-list>
  </base-layout>
</template>

<script>
import ChatFilterTabs from "../../components/chat/ChatFilterTabs.vue";
import { IonList } from "@ionic/vue";
import {
  personCircleOutline,
  trashOutline,
  checkmarkCircleOutline,
} from "ionicons/icons";
import FriendRequestItem from "../../components/chat/FriendRequestItem.vue";
import FriendItem from "../../components/chat/FriendItem.vue";
import PeopleItem from "../../components/chat/PeopleItem.vue";
import { useUser } from "../../stores/user";
import { useUsers } from "../../stores/users";
export default {
  components: {
    ChatFilterTabs,
    IonList,
    FriendRequestItem,
    FriendItem,
    PeopleItem,
  },
  setup() {
    const userStore = useUser();
    const usersStore = useUsers();
    return {
      userStore,
      usersStore,
      personCircleOutline,
      trashOutline,
      checkmarkCircleOutline,
    };
  },
  data() {
    return {
      selectedTab: "",
    };
  },
  computed: {
    userList() {
      if (this.selectedTab == "friends") {
        return this.userStore.friends;
      } else if (this.selectedTab == "people") {
        return this.usersStore.users;
      } else {
        return this.userStore.friendRequests;
      }
    },
  },
  methods: {
    setTab(tabName) {
      this.selectedTab = tabName;
    },
    rejectFriendRequest(id) {
      this.userStore.rejectFriendRequest(id);
    },
    acceptFriendRequest(id) {
      this.userStore.acceptFriendRequest(id);
    },
  },
};
</script>
