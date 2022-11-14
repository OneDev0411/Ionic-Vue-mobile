<template>
  <ion-item button="true" @click="setOpen(true)">
    <ion-label color="tertiary">{{ label }}:</ion-label>
    <ion-text slot="end" color="tertiary">{{ displayDate }}</ion-text>
    <ion-popover
      show-backdrop="false"
      :is-open="isOpen"
      @did-dismiss="setOpen(false)"
      class="verticalOffset"
    >
      <ion-datetime
        :min="min"
        :max="max"
        :value="defaultValue"
        presentation="date"
        ref="customDatetime"
        color="tertiary"
      >
        <ion-buttons slot="buttons">
          <ion-button @click="setOpen(false)">Cancel</ion-button>
          <ion-button @click="setDate">Ok</ion-button>
        </ion-buttons>
      </ion-datetime>
    </ion-popover>
  </ion-item>
</template>

<script>
import {
  IonButtons,
  IonPopover,
  IonDatetime,
  IonText,
  IonLabel,
} from "@ionic/vue";
import { format, parseISO } from "date-fns";
export default {
  emits: ["dateSelected"],
  props: {
    label: {
      type: String,
      default: "Date of Birth",
    },
    defaultValue: {
      type: String,
      default: "",
    },
    min: {
      type: String,
      default: "2022-01-01T00:00:00",
    },
    max: {
      type: String,
      default: "2100-12-31T23:59:59",
    },
  },
  components: {
    IonButtons,
    IonPopover,
    IonDatetime,
    IonText,
    IonLabel,
  },
  data() {
    return {
      selectedDate: null,
      isOpen: false,
    };
  },
  methods: {
    async setDate() {
      // this.$refs["customDatetime"].$el.confirm();
      const datepicker = this.$refs.customDatetime.$el;
      await datepicker.confirm(true);
      this.isOpen = false;
      this.selectedDate = datepicker.value;
      this.$emit("dateSelected", this.selectedDate);
    },
    async closePopup() {
      await this.$refs.customDatetime.$el.cancel(true);
    },

    setOpen(value) {
      if (!value) {
        this.closePopup();
      }
      this.isOpen = value;
    },
  },
  computed: {
    displayDate() {
      if (this.selectedDate) {
        return format(parseISO(this.selectedDate), "MMM dd yyyy");
      }
      return "";
    },
  },
};
</script>

<style scoped>
ion-popover.verticalOffset {
  --offset-y: -100px !important;
}
</style>
