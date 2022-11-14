<template>
  <div class="avatar-container">
    <div
      v-for="(eachUser, index) in users"
      :key="eachUser.id"
      :class="`circle-avatar step-right${index}`"
    >
      <div v-if="index < 5">
        <UserIcon
          :user="eachUser"
          :size="46"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserIcon from "../base/UserIcon";
export default {
  name: "SupporterImages",
  props: {
    users: {
      type: Array,
      default: ()=>[]
    }
  },
  components: {
    UserIcon
  }
}
</script>

<style scoped>
.avatar-container {
  position: relative;
  width: auto;
  height: 50px;
}

.circle-avatar {
  /*border-radius: 50%;*/
  /*border: 2px solid #ffff;*/
  position: absolute;
  top: 5px;
  margin: auto;
}

.step-right0 {
  left: 0px;
  z-index: 1;
}
.step-right1 {
  left: 20px;
  z-index: 2;
}
.step-right2 {
  left: 40px;
  z-index: 3;
}
.step-right3 {
  left: 60px;
  z-index: 4;
}
.step-right4 {
  left: 80px;
  z-index: 5;
}
</style>
