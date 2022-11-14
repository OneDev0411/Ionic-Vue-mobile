export default {
  getNotifications: (state) =>
    state.notifications
      .sort((a, b) => Date.parse(a.created) - Date.parse(b.created))
      .reverse(),
};
