<template>
  <div class="item">
    <ion-item class="input-div">
      <ion-input
        v-model="firstName"
        type="text"
        placeholder="First Name"
        @input="handleChange"
      ></ion-input>
    </ion-item>
  </div>
</template>
<script>
import { IonInput } from "@ionic/vue";
import { useUser } from "../../stores/user";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    IonInput,
  },
  setup() {
    const userStore = useUser();
    return { userStore };
  },
  methods: {
    handleChange() {
      console.log(this.firstName);
    },
  },
  data() {
    return {
      firstName: this.userStore.firstName,
      firstNameError: "",
    };
  },
});
</script>
