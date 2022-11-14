export default {
  getAllDreams: (state) => state.dreams,
  getDreamById: (state) => (id) =>
    state.dreams.filter((dream) => dream.id === parseInt(id))[0],
  getBookmarkedDreams: (state) =>
    state.dreams.filter((dream) => dream.bookmark),
  getUserDreams: (state) => (userId) =>
    state.dreams.filter((dream) => dream.user.id === parseInt(userId)),
  getDreamComments: (state) => (dreamId) => state.comments.filter(
      (comment) => comment.dream === parseInt(dreamId)
    ),
  getPoplarDreams: (state) => state.dreams,
  getRecentDreams: (state) => state.dreams.sort((a, b) =>
    new Date(b.date_added) - new Date(a.date_added)
  ),
  getMilestoneProducts: (state) => state.products,
  getMilestoneSupporters: (state) => state.supporters

}
