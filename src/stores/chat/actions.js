import endpoints from "../../helpers/endpoints";
import { requestManager } from "../../helpers/requestManager";
export default {
  async getChatRoom(userId) {
    const response = await requestManager.get(`${endpoints.chatRoom}${userId}`);
    if (response.status === 200) {
      console.log("Success: ");
      return response.data;
    } else {
      console.log("Error: ", response.data.detail);
      return null;
    }
  },
};
