<template>
  <base-layout page-title="Help">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-text>
            <h3><b>Report an Issue or ask a Question</b></h3>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-textarea
              rows="10"
              cols="20"
              placeholder="Enter any notes here..."
            ></ion-textarea>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-button
            expanded="full"
            class="full-width"
            color="secondary"
            @click="submitIssue"
          >
            Submit</ion-button
          >
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonText, IonTextarea, IonButton } from "@ionic/vue";
import { useUser } from "../../stores/user";
export default {
  components: { IonText, IonTextarea, IonButton },
  setup() {
    const userStore = useUser();
    return { userStore };
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async submitIssue() {
      const result = await this.userStore.submitIssue(this.text);
      if (result.status === 204) {
        alert("Issue submitted successfully. We will get back to you shortly.");
        this.text = "";
      } else {
        alert("An error ocured while submitting the issue");
      }
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
