import endpoints from "../../helpers/endpoints";
import { requestManager } from "../../helpers/requestManager";
// import axios from "../../helpers/axiosConfig";

export default {
  async addComment({ dreamId, comment }) {
    console.log(dreamId, comment);
    var postComment = {
      comment: comment,
      dream: dreamId,
    };
    const response = await requestManager.post(
      endpoints.commentList,
      postComment
    );
    if (response.status === 201) {
      this.comments.unshift(response.data);
      return comment;
    }
  },
  async addDream (newDream) {
    const formData = {
      title: newDream.title,
      image: newDream.image,
      progress: 0,
      description: newDream.description,
      milestone_str: JSON.stringify(newDream.milestones),
      tags: JSON.stringify(newDream.tags),
      start_date: newDream.dreamStart,
      end_date: newDream.dreamEnd,
      wallet: newDream.wallet
    }
    const response = await requestManager.post(endpoints.dreamList, formData)
    if (response.status === 201) {
      const dream = response.data;
      this.dreams.unshift(dream);
    }
    return response;
  },
  addProduct (product) {
    this.product = product
  },
  addSupporter (supporters) {
    this.supporters = supporters
  },
  async deleteComment (commentID) {
    this.comment = this.comments.filter(comment => comment.id != commentID)
  },
  async deleteDream ({ id }) {
    console.log('the dreams na ', this.dreams)
    this.dreams = this.dreams.filter((dream) => dream.id != id)[0];
  },
  async deleteMilestone (id) {
    console.log('delete milestone ', id)
    // this.milestones
  },
  async editDream ({id, dream}) {
    let editedDream = this.dreams.find(dream => dream.id == id)
    editedDream = {
      ...editedDream,
      ...dream
    }
    this.dreams = this.dreams.filter(a => a.id != id)
    this.dreams.push(editedDream)
  },
  async editMilestone ( { id, milestone }) {
    let relevantMilestone = this.milestones.filter(milestone => milestone.id == id)[0]
    relevantMilestone = {
      ...relevantMilestone,
      ...milestone
    }

    this.milestones = this.milestones.filter(milestone => milestone.id != id)
    this.milestones.push(relevantMilestone)
  },
  async hideComment (id) {
    console.log('we are hiding comment with id ', id)
  },
  async hideDream (id) {
    console.log('we are hiding dream with id ', id)
  },
  async setBookmark({ id }) {
    const relevantDream = this.dreams.filter((dream) => dream.id == id)[0];
    const response = await requestManager.patch(endpoints.dreamSetBookmark(id));
    if (response.status === 204) {
      relevantDream.bookmark = !relevantDream.bookmark;
    }
  },
  async setLike({ id }) {
    const relevantDream = this.dreams.filter((dream) => dream.id == id)[0];
    const response = await requestManager.patch(endpoints.dreamSetLike(id));
    if (response.status === 204) {
      relevantDream.like = !relevantDream.like;
      if (relevantDream.like) {
        relevantDream.total_likes++;
      } else {
        relevantDream.total_likes--;
      }
    }
  },
  async setMilestoneStatus({ id, milestoneId }) {
    const relevantDream = this.dreams.filter((dream) => dream.id == id)[0];
    const relevantMilestone = relevantDream.milestones.filter(
      (milestone) => milestone.id == milestoneId
    )[0];
    const response = await requestManager.patch(
      endpoints.milestoneSetStatus(milestoneId)
    );
    if (response.status === 204) {
      relevantMilestone.completed = !relevantMilestone.completed;
    }
  },
  async setProgress({ id, value }) {
    const relevantDream = this.dreams.filter((dream) => dream.id == id)[0];
    relevantDream.progress = value;
    const response = await requestManager.post(endpoints.dreamSetProgress(id), {
      progress: value,
    });
    if (response.status === 204) {
      relevantDream.progress = value;
    }
  },
  async removeDreamComment(commentId) {
    const response = await requestManager.get(
      endpoints.commentList + `delete/${commentId}/`
    );
    if (response.status === 204) {
      this.comments = this.comments.filter(
        (comment) => comment.id != commentId
      );
    }
  },
  async loadUserDreams(userId) {
    // if no user id is provided get current user dreams
    var response = null;
    if (userId) {
      response = await requestManager.get(`${endpoints.userDreams}/${userId}`);
    } else {
      response = await requestManager.get(endpoints.currentUserDreams);
    }
    if (response.status === 200) {
      this.dreams = response.data;
      return true;
    } else {
      console.log("Error: ", response.data.detail);
      return false;
    }
  },

  async loadAllDreams({ bookmarkedOnly = false } = {}) {
    const url = bookmarkedOnly
      ? endpoints.dreamListBookmarked
      : endpoints.dreamList;
    const response = await requestManager.get(url);
    if (response.status === 200) {
      this.dreams = response.data;
      return true;
    } else {
      console.log("Error: ", response.data.detail);
      return false;
    }
  },
  async loadDreamComments(dreamId) {
    const response = await requestManager.get(endpoints.dreamComments(dreamId));
    if (response.status === 200) {
      this.comments = response.data;
      return true;
    } else {
      return false;
    }
  },
  async reportComment ({id, reason}) {
    console.log('comment reported from store ', {id, reason});
  },
  async reportDream ({id, reason}) {
    console.log('Dream reported from store ', {id, reason});
  },
  async reportMilestone ({id, reason}) {
    console.log('milestone reported from store ', {id, reason});
  },
  setImageUrl (url) {
    this.Image = url
  }
}
