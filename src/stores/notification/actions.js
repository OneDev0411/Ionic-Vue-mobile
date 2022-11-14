import endpoints from "../../helpers/endpoints";
import { requestManager } from "../../helpers/requestManager";

export default {
  async loadNotifications() {
    const response = await requestManager.get(endpoints.notifications);
    if (response.status === 200) {
      this.notifications = response.data;
    }
  },
  removeNotification(id) {
    const relevantNotificationIndex = this.notifications.findIndex(
      (n) => n.id == id
    );
    this.notifications.splice(relevantNotificationIndex, 1);
  },
};
