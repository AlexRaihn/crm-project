<script setup lang="ts">
import { AlertOctagonIcon } from "lucide-vue-next";

type Props = {
  message?: string;
};

const props = withDefaults(defineProps<Props>(), {
  message: "Нет данных для отображения",
});
</script>

<template>
  <div class="h-full w-full gap-4 flex flex-col items-center justify-center">
    <div>
      <slot name="icon">
        <AlertOctagonIcon class="w-16 h-16 text-gray-400" />
      </slot>
    </div>
    <div class="font-bold" v-text="props.message" />
  </div>
</template>
