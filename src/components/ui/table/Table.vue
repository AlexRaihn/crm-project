<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div data-slot="table-container" class="relative w-full overflow-x-auto">
    <table
      data-slot="table"
      :class="
        cn(
          'w-full caption-bottom text-sm overflow-y-hidden border-separate border-spacing-2',
          props.class
        )
      "
    >
      <slot name="default"> </slot>
    </table>
  </div>
</template>
