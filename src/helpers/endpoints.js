const host = "system-idreamers.com"; //  "192.168.0.104:8000"; //  "test-idreamer.com"; "192.168.1.19:8000"; //"192.168.85.148:8000"; //
const baseUrl = `https://${host}/`;

export default {
  host: host,
  baseUrl: baseUrl,

  // auth
  login: `${baseUrl}user/login/`,
  logout: `${baseUrl}user/logout/`,
  register: `${baseUrl}user/register/`,
  changePassword: `${baseUrl}user/change-password/`,
  csrfToken: `${baseUrl}user/set-csrf-token/`,
  checkAuth: `${baseUrl}user/check-auth/`,
  validateEmail: `${baseUrl}user/user-list/validate-email/`,
  deleteUser: `${baseUrl}user/user-list/delete-user/`,

  // users
  userList: `${baseUrl}user/user-list/`,
  storyImages: `${baseUrl}user/story-photos/`,
  specificUserStory: `${baseUrl}user/story-photos/user-profile/`,
  userProfile: `${baseUrl}user/user-list/current-profile/`,
  userProfileUpdate: (id) => `${baseUrl}user/user-list/${id}/update-profile/`,
  userDataUpdate: `${baseUrl}user/update-userdata/`,
  userProfileStory: `${baseUrl}user/story-photos/current-profile/`,
  currentUserDreams: `${baseUrl}dreams/dream-list/current-profile/`,
  userDreams: `${baseUrl}dreaams/dream-list/specific-user/`,

  // dreams
  dreamList: `${baseUrl}dreams/dream-list/`,
  dreamListBookmarked: `${baseUrl}dreams/dream-list/bookmarked/`,
  dreamSetBookmark: (id) => `${baseUrl}dreams/dream-list/${id}/bookmark/`,
  dreamSetProgress: (id) => `${baseUrl}dreams/dream-list/${id}/progress/`,
  dreamSetLike: (id) => `${baseUrl}dreams/dream-list/${id}/like/`,

  // milestones
  milestoneList: `${baseUrl}dreams/milestone-list/`,
  milestoneSetStatus: (id) =>
    `${baseUrl}dreams/milestone-list/${id}/set-status/`,

  // comments
  commentList: `${baseUrl}dreams/comment-list/`,
  dreamComments: (id) => `${baseUrl}dreams/comment-list/dream-comment/${id}/`,

  // friends
  userFriends: `${baseUrl}user/friends/current-profile/`,
  friendRequest: `${baseUrl}user/friends/create-request/`,
  friendRequestAction: `${baseUrl}user/friends/request-action/`,
  removeFriend: `${baseUrl}user/friends/remove-friend/`,
  checkFriendship: `${baseUrl}user/friends/check-friend/`,
  friendRequests: `${baseUrl}user/friends/friend-requests/`,

  chatRoom: `${baseUrl}chat/chat-list/specific-user/`,
  issues: `${baseUrl}user/issues/create-request/`,
  notifications: `${baseUrl}actions/activity-list/notifications/`,
  wallets: `${baseUrl}wallets/wallet-list/`,
  myWallets: `${baseUrl}wallets/wallet-list/current-profile/`,
  payment: `${baseUrl}wallets/wallet-list/pay/`,
};
