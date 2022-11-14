<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label class="input-label" position="stacked">
              Name
            </ion-label>
            <ion-item>
              <ion-select v-model="frequency" placeholder="Select fruit">
                <ion-select-option value="apples">Daily</ion-select-option>
                <ion-select-option value="oranges">Weekly</ion-select-option>
                <ion-select-option value="bananas">Monthly</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-buttons>

            </ion-buttons>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  name: "FundMilestone"
}
</script>

<style scoped>

</style>
