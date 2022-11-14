<template>
  <div class="root">
    <img class="avatar" :src="data.avatar" />
    <div class="fullwidth">
      <div class="space_between">
        <ion-label class="name">
          {{ data.name }}
          <img src="/assets/avatars/userprofile/credit.png" />
        </ion-label>
        <ion-label class="date">{{ data.date }}</ion-label>
      </div>
      <div class="space_between">
        <ion-label class="desc">{{ data.desc }}</ion-label>
        <ion-label class="price">+${{ data.price }}</ion-label>
      </div>
      <div class="space_between margintop2">
        <ion-label class="transid">Trans ID{{ data.transid }}</ion-label>
        <ion-label class="funded">Funded Received</ion-label>
      </div>
    </div>
  </div>
</template>

<script>
import { IonLabel } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    IonLabel
  }
})
</script>

<style scoped>
.root {
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(14, 12, 18, 0.06);
  border-radius: 16px;
  padding: 10px 10px 7px 10px;
  display: flex;
}
.avatar {
  width: 44px;
  height: 44px;
  margin-right: 10px;
}
.name {
  font-weight: 700;
  font-size: 16px;
  line-height: 140%;
  color: #212325;
}
.date {
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #787c80;
}
.desc {
  font-weight: 500;
  font-size: 14px;
  width: 195px;
  line-height: 130%;
  color: #4e5256;
}
.price {
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #866ee1;
}
.transid {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #b8b8b8;
}
.funded {
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  color: #0dab30;
}
.space_between {
  justify-content: space-between;
  display: flex;
}
.fullwidth {
  width: 100%;
}
.margintop2 {
  margin-top: 20px;
}
</style>
