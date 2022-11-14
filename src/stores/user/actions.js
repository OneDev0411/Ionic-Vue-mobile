import endpoints from "../../helpers/endpoints";
import { requestManager } from "../../helpers/requestManager";
import { mapUser } from "../../helpers/mappers";

export default {
  updatePhoto(photo) {
    this.profilePhoto = photo;
  },
  async requestEmailValdiation() {
    const response = await requestManager.get(endpoints.validateEmail);
    return response;
  },
  async validateEmail(code) {
    const response = await requestManager.post(endpoints.validateEmail, {
      validation_code: code,
    });
    if (response.status === 201) {
      this.emailValid = true;
    }
    return response;
  },

  updateBackgroundPhoto(photo) {
    this.backgroundPhoto = photo;
  },
  async addStoryPhoto(photo) {
    const response = await requestManager.post(endpoints.storyImages, {
      image: photo.raw,
    });
    if (response.status === 200 || response.status === 201) {
      this.storyImages.push(photo.dataUrl);
    } else {
      console.log("error uloading photo");
    }
  },
  removeStoryPhoto(photo) {
    const index = this.storyImages.indexOf(photo);
    if (index > -1) {
      this.storyImages.splice(index, 1); // 2nd parameter means remove one item only
    }
  },
  async register({
    username,
    password,
    password2,
    email,
    first_name,
    last_name,
  }) {
    const request = await requestManager.post(endpoints.register, {
      username,
      password,
      password2,
      email,
      first_name,
      last_name,
    });
    if (request.status === 201) {
      console.log("register success");
    }
    return request;
  },
  async login(username, password) {
    const response = await requestManager.post(endpoints.login, {
      username,
      password,
    });

    if (response.status === 200) {
      this.user = response.data;
      this.isAuthenticated = true;
      this.username = username;
      console.log("User logged in:", this.user);
      return true;
    } else {
      this.error = response.data.detail;
      alert(this.error);
      return false;
    }
  },
  async logout() {
    const response = await requestManager.post(endpoints.logout);
    if (response.status === 200) {
      this.user = null;
      this.username = null;
      this.password = null;

      this.isAuthenticated = false;
      await requestManager.clearCookies();
      await this.setCSRFToken();
      console.log("User logged out");
      return true;
    } else {
      this.error = response.data.detail;
      console.log("Error: ", this.error);
      return false;
    }
  },
  async changePassword(oldPassword, newPassword1, newPassword2) {
    const response = await requestManager.put(
      endpoints.changePassword + `${this.id}/`,
      {
        old_password: oldPassword,
        password: newPassword1,
        password2: newPassword2,
      }
    );
    if (response.status === 200) {
      console.log("Password changed");
      return response;
    } else {
      this.error = response.data.detail;
      console.log("Error: ", this.error);
      return response;
    }
  },
  async deleteUser(password) {
    const response = await requestManager.post(endpoints.deleteUser, {
      password: password,
    });
    if (response.status === 200) {
      console.log("User deleted");
      return response;
    } else {
      this.error = response.data.detail;
      console.log("Error: ", this.error);
      return response;
    }
  },
  async checkAuth() {
    const response = await requestManager.get(endpoints.checkAuth);
    if (response.status === 200) {
      this.isAuthenticated = true;
      console.log("User logged in");
      return true;
    } else {
      this.isAuthenticated = false;
      this.error = response.data.detail;
      console.log("User not logged in or error: ", this.error);
      return false;
    }
  },
  async setCSRFToken() {
    await requestManager.clearCSRFToken();
    const response = await requestManager.setCSRFToken();
    if (response.status === 200) {
      console.log("CSRF token set");
      return true;
    } else {
      this.error = response.data.detail;
      console.log("Error: ", this.error);
      return false;
    }
  },
  async getUserProfile() {
    const response = await requestManager.get(endpoints.userProfile);

    if (response.status === 200) {
      console.log("User profile loaded", response.data);
      const userData = response.data[0];

      // map user data to store
      mapUser(this, userData);

      this.isLoaded = true;
      return true;
    } else {
      this.error = response.data.detail;
      console.log("Error:", this.error);
      return false;
    }
  },
  async updateProfile({
    displayName,
    firstName,
    lastName,
    location,
    bio,
    profilePhoto,
    backgroundPhoto,
  }) {
    var data = {
      display_name: displayName,
      first_name: firstName,
      last_name: lastName,
      location: location,
      bio: bio,
    };

    if (profilePhoto) {
      data.profile_photo = profilePhoto.raw;
    }
    if (backgroundPhoto) {
      data.background_photo = backgroundPhoto.raw;
    }

    const response = await requestManager.post(
      endpoints.userProfileUpdate(this.id),
      data
    );
    if (response.status === 204) {
      console.log("User profile updated");
    } else {
      this.error = response.data.detail;
      console.log("Error:", this.error);
    }
    return response;
  },

  async getStoryImages() {
    if (this.storyImages.length == 0) {
      const response = await requestManager.get(endpoints.userProfileStory);
      if (response.status === 200) {
        console.log("User story images loaded", response.data);
        this.storyImages = response.data.map((image) => image.image);
      } else {
        this.error = response.data.detail;
        console.log("Error:", this.error);
      }
    }
    return this.storyImages;
  },
  async getUserFriends() {
    const response = await requestManager.get(endpoints.userFriends);
    if (response.status === 200) {
      console.log("User friends loaded", response.data);
      this.friends = response.data.map((user) => {
        const friend = {};
        mapUser(friend, user);
        return friend;
      });
    } else {
      this.error = response.data.detail;
      console.log("Error:", this.error);
    }
  },
  async getFriendRequests() {
    const response = await requestManager.get(endpoints.friendRequests);
    if (response.status === 200) {
      console.log("User friend requests loaded", response.data);
      const friendRequests = response.data.map((user) => {
        const friendRequest = {};
        mapUser(friendRequest, user);
        return friendRequest;
      });
      this.friendRequests = friendRequests;
    } else {
      this.error = response.data.detail;
      console.log("Error:", this.error);
    }
  },
  async acceptFriendRequest(userId) {
    const response = await requestManager.post(
      `${endpoints.friendRequestAction}`,
      {
        action: "accept",
        id: userId,
      }
    );
    if (response.status === 204) {
      console.log("Success: ");
      this.friendRequests = this.friendRequests.filter(
        (user) => user.id != userId
      );
      return "Friend request accepted";
    } else {
      console.log("Error: ", response.data.detail);
      return `Failed to accept friend request ${response.data.detail}`;
    }
  },
  async rejectFriendRequest(userId) {
    const response = await requestManager.post(endpoints.friendRequestAction, {
      action: "reject",
      id: userId,
    });
    if (response.status === 204) {
      console.log("Success: ");
      this.friendRequests = this.friendRequests.filter(
        (user) => user.id != userId
      );
      return "Friend request rejected";
    } else {
      return `Failed to reject friend request ${response.data.detail}`;
    }
  },
  async submitIssue(text) {
    const response = await requestManager.post(endpoints.issues, {
      text: text,
    });
    if (response.status === 204) {
      console.log("Success: ");
    } else {
      console.log(`Failed to submit issue ${response.data.detail}`);
    }
    return response;
  },
};
