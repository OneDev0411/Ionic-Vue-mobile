<template>
  <ion-label> {{ label }} * </ion-label>
  <component :is="renderComponent"></component>
</template>

<script>
import { defineComponent } from "vue";
import TextInput from "./TextInput";

export default defineComponent({
  components: {
    TextInput,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    renderComponent() {
      return {
        template: `<TextInput></TextInput>`,
      };
    },
  },
});
</script>
