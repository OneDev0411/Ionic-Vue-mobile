import endpoints from "../../helpers/endpoints";
import { requestManager } from "../../helpers/requestManager";
import { mapUser } from "../../helpers/mappers";

export default {
  async getStoryImages(userId) {
    console.log(userId);
    const relevantUser = this.users.find((user) => user.id == userId);
    console.log(relevantUser);
    if (relevantUser && !relevantUser.storyImages) {
      const response = await requestManager.get(
        `${endpoints.specificUserStory}${userId}`
      );
      if (response.status === 200) {
        console.log("Success: ");
        return response.data.map((image) => image.image);
      } else {
        console.log("Error: ", response.data.detail);
        return [];
      }
    }
    return [];
  },
  async getUserById(userId) {
    const relevantUser = this.users.find((user) => user.id == userId);
    if (relevantUser) {
      return relevantUser;
    }
    const response = await requestManager.get(`${endpoints.userList}${userId}`);
    if (response.status === 200) {
      // map user data to store
      const user = {};
      mapUser(user, response.data);

      this.users.unshift(user);
      return user;
    } else {
      console.log("Error: ", response.data.detail);
      return null;
    }
  },
  async sendFriendRequest(userId) {
    const response = await requestManager.post(`${endpoints.friendRequest}`, {
      id: userId,
    });
    if (response.status === 204) {
      console.log("Success: ");
      return "Friend request sent";
    } else {
      console.log("Error: ", response.data.detail);
      return `Failed to send friend request ${response.data.detail}`;
    }
  },

  async removeFriend(userId) {
    const response = await requestManager.post(`${endpoints.removeFriend}`, {
      id: userId,
    });
    if (response.status === 204) {
      console.log("Success: ");
      return "Friend removed";
    } else {
      console.log("Error: ", response.data.detail);
      return `Failed to remove friend ${response.data.detail}`;
    }
  },
  async checkFriendship(userId) {
    const response = await requestManager.get(
      `${endpoints.checkFriendship}${userId}`
    );
    if (response.status === 200) {
      console.log("Success: ");
      return response.data.is_friend;
    } else {
      console.log("Error: ", response.data.detail);
      return false;
    }
  },
  async getUsers() {
    const response = await requestManager.get(endpoints.userList);
    if (response.status === 200) {
      console.log("User list loaded", response.data);
      this.users = [];
      response.data.forEach((element) => {
        const user = {};
        mapUser(user, element);
        this.users.unshift(user);
      });
    }
  },
};
